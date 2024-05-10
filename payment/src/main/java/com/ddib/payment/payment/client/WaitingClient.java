package com.ddib.payment.payment.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(name = "waitingClient", url = "http://k10c102.p.ssafy.io:9010/api/v1/queue")
public interface WaitingClient {

    /**
     * 결제가 끝났음을 알리는 메서드.
     * 대기열 빠져나감.
     */
    @GetMapping("/leave")
    public void leave();

}
