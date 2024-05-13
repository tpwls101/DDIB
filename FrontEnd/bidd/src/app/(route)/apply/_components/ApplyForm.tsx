"use client";

import { useRef } from "react";
import styles from "./applyform.module.scss";
import { useMutation } from "@tanstack/react-query";
import { BusinessInfo } from "@/app/_types/types";
import { putApplyBusiness, postBusinessCheck } from "@/app/_api/business";

export default function ApplyForm() {
  const businessNameRef = useRef<HTMLInputElement>(null);
  const numberRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const applyBusiness = useMutation({
    mutationFn: async (data: BusinessInfo) => {
      return putApplyBusiness(1, data);
    },
    async onSuccess(response) {
      alert("기업신청이 완료되었습니다.");
    },
    onError(error) {
      console.error(error);
    },
  });

  const sendApply = async () => {
    if (
      businessNameRef.current?.value &&
      businessNameRef.current.value.length !== 0 &&
      numberRef.current?.value &&
      numberRef.current.value.length !== 0 &&
      nameRef.current?.value &&
      nameRef.current.value.length !== 0 &&
      phoneRef.current?.value &&
      phoneRef.current.value.length !== 0 &&
      emailRef.current?.value &&
      emailRef.current.value.length !== 0
    ) {
      const result = await postBusinessCheck(numberRef.current.value);
      if (result != "계속사업자") {
        alert("사업자 번호를 확인해주세요");
      } else {
        const info = {
          companyName: businessNameRef.current.value,
          businessNumber: numberRef.current.value as unknown as number,
          ceoName: nameRef.current.value,
          ceoEmail: emailRef.current.value,
          ceoPhone: phoneRef.current.value,
        };
        applyBusiness.mutate(info);
        alert("신청이 완료되었습니다.");
        console.log("send");
      }
    } else {
      alert("비어있는 칸이 있습니다.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div>기업명</div>
        <input type="text" ref={businessNameRef} />
      </div>
      <div className={styles.item}>
        <div>사업자번호</div>
        <input type="number" ref={numberRef} />
      </div>
      <div className={styles.item}>
        <div>대표이름</div>
        <input type="text" ref={nameRef} />
      </div>
      <div className={styles.item}>
        <div>대표번호</div>
        <input type="text" ref={phoneRef} />
      </div>
      <div className={styles.item}>
        <div>대표이메일</div>
        <input type="text" ref={emailRef} />
      </div>
      <div className={styles.applyBtn} onClick={sendApply}>
        신청하기
      </div>
    </div>
  );
}