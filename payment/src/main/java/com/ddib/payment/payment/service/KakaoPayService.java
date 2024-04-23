package com.ddib.payment.payment.service;

import com.ddib.payment.payment.domain.Payment;
import com.ddib.payment.payment.dto.request.KakaoReadyRequestDto;
import com.ddib.payment.payment.dto.response.KakaoApproveResponseDto;
import com.ddib.payment.payment.dto.response.KakaoReadyResponseDto;
import com.ddib.payment.payment.repository.PaymentRepository;
import com.ddib.payment.user.repository.UserRepository;
import com.netflix.discovery.converters.Auto;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
//@Transactional
public class KakaoPayService {

    @Value("${pay.kakao.cid}")
    private String cid;
    @Value("${pay.kakao.secret-key}")
    private String secretKey;

    private final PaymentRepository paymentRepository;
    private final UserRepository userRepository;

    private KakaoReadyResponseDto kakaoReadyResponseDto;
    private String partnerOrderId; // 주문번호(8자리) : 회원번호 + 상품번호

    /**
     * 1. Ready (결제 준비)
     * 서버에서 카카오페이 서버로 결제 정보 전달
     * Secret Key를 헤더에 담아 파라미터 값들과 함께 POST로 요청
     * 결제 고유번호(TID)와 redirect URL을 응답받음
     */
    public KakaoReadyResponseDto kakaoPayReady(KakaoReadyRequestDto kakaoReadyRequestDto) {

        // 주문번호 생성
        String userId = String.format("%04d", kakaoReadyRequestDto.getUserId());
        String productId = String.format("%04d", kakaoReadyRequestDto.getProductId());
        partnerOrderId = userId + productId;
        log.info("partnerOrderId: {}", partnerOrderId);

        // 카카오페이 요청 양식
        Map<String, Object> params = new HashMap<>();
        params.put("cid", cid); // 가맹점 코드
        params.put("partner_order_id", partnerOrderId); // 가맹점 주문번호
        params.put("partner_user_id", "DDIB"); // 가맹점 회원 ID
        params.put("item_name", kakaoReadyRequestDto.getItemName()); // 상품명
        params.put("quantity", kakaoReadyRequestDto.getQuantity()); // 상품 수량
        params.put("total_amount", kakaoReadyRequestDto.getTotalAmount()); // 상품 총액
        params.put("tax_free_amount", kakaoReadyRequestDto.getTaxFreeAmount()); // 상품 비과세 금액
        params.put("approval_url", "http://localhost:8083/payment/success"); // 결제 성공 시 redirect url
        params.put("cancel_url", "http://localhost:8083/payment/cancel"); // 결제 취소 시 redirect url
        params.put("fail_url", "http://localhost:8083/payment/fail"); // 결제 실패 시 redirect url

        // 파라미터, 헤더 담기
        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(params, this.getHeaders());
        log.info("requestEntity: {}", requestEntity);

        // 외부 API 호출 및 Server to Server 통신을 위해 사용
        RestTemplate restTemplate = new RestTemplate();

        // 결제정보를 담아 카카오페이 서버에 post 요청 보내기
        // 결제 고유번호(TID), URL 응답받음
        log.info("===== 카카오페이 서버로 post 요청 전송 =====");
        kakaoReadyResponseDto = restTemplate.postForObject(
                "https://open-api.kakaopay.com/online/v1/payment/ready",
                requestEntity,
                KakaoReadyResponseDto.class
        );
        log.info("kakaoReadyResponseDto: {}", kakaoReadyResponseDto);

        // 주문 테이블에 Data Insert


        return kakaoReadyResponseDto;
    }

    /**
     * 2. Approve (결제 승인)
     * 사용자가 결제 수단을 선택하고 비밀번호를 입력해 결제 인증을 완료한 뒤, 최종적으로 결제 완료 처리를 하는 단계
     * 인증 완료시(테스트의 경우 비밀번호 입력 안하므로 결제하기 버튼 클릭시) 응답받은 pg_token과 tid로 최종 승인 요청함
     * 결제 승인 API를 호출하면 결제 준비 단계에서 시작된 결제건이 승인으로 완료 처리됨
     */
    public KakaoApproveResponseDto kakaoPayApprove(String pgToken, Principal principal) {

        // 카카오페이 요청 양식
        Map<String, String> params = new HashMap<>();
        params.put("cid", cid);
        params.put("tid", kakaoReadyResponseDto.getTid());
        params.put("partner_order_id", partnerOrderId);
        params.put("partner_user_id", "DDIB");
        params.put("pg_token", pgToken);

        // 파라미터, 헤더 담기
        HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(params, this.getHeaders());

        // 외부에 보낼 url
        RestTemplate restTemplate = new RestTemplate();

        KakaoApproveResponseDto kakaoApproveResponseDto = restTemplate.postForObject(
                "https://open-api.kakaopay.com/online/v1/payment/approve",
                requestEntity,
                KakaoApproveResponseDto.class);

        // 결제 테이블에 Data Insert
        Payment payment = Payment.builder()
                .tid(kakaoReadyResponseDto.getTid())
                .totalAmount(kakaoApproveResponseDto.getAmount().getTotal())
                .paymentMethodType(kakaoApproveResponseDto.getPaymentMethodType())
                .paymentDate(kakaoApproveResponseDto.getApprovedAt())
                .user(userRepository.findByEmail(principal.getName()))
                .build();
        paymentRepository.save(payment);

        return kakaoApproveResponseDto;
    }

    /**
     * http 헤더에 카카오 요구 헤더값인 secret key 담기
     */
    private HttpHeaders getHeaders() {
        HttpHeaders httpHeaders = new HttpHeaders();

        String authorization = "SECRET_KEY " + secretKey;

        httpHeaders.set("Authorization", authorization);
        httpHeaders.set("Content-Type", "application/json");

        return httpHeaders;
    }

}
