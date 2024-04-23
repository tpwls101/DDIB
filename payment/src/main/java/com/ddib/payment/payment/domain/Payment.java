package com.ddib.payment.payment.domain;

import com.ddib.payment.user.domain.User;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Payment {

    @Schema(description = "결제 번호")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String tid;

    @Schema(description = "결제 총 금액")
    private int totalAmount;

    @Schema(description = "결제 수단 (CARD or MONEY)")
    private String paymentMethodType;

    @Schema(description = "결제 시간 (결제 승인 시각)")
    private String paymentDate;

    @Schema(description = "결제자")
    @ManyToOne
    private User user;

}
