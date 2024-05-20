import { http, HttpResponse, StrictResponse } from "msw";
import { faker } from "@faker-js/faker";

export const handlers = [
  http.get("/api/order/:id", ({ request, params }) => {
    const { id } = params;
    return HttpResponse.json({
      orderId: id,
      orderDate: "2024-05-05",
      status: 0,
      companyName: "jeonseoung",
      thumbnailImage: "https://iandwe.s3.ap-northeast-2.amazonaws.com/thumbnail/egqHlHZG",
      productName: "1990년산 와인",
      quantity: 3,
      price: 10000,
      totalAmount: 27000,
      receiverName: "핑고",
      receiverPhone: "010-1111-1111",
      orderZipcode: "33333",
      orderRoadAddress: "하남산단로 9번길 2",
      orderDetailAddress: "2층 202호",
      paymentMethod: "kakaopay",
    });
  }),
  http.get("/api/order", ({ request }) => {
    return HttpResponse.json([
      {
        orderId: 0,
        orderDate: "2024-05-05",
        status: 0,
        companyName: "jeonseoung",
        thumbnailImage: "https://iandwe.s3.ap-northeast-2.amazonaws.com/thumbnail/egqHlHZG",
        productName: "1990년산 와인",
        quantity: 3,
        price: 10000,
        totalAmount: 27000,
        receiverName: "핑고",
        receiverPhone: "010-1111-1111",
        orderZipcode: "33333",
        orderRoadAddress: "하남산단로 9번길 2",
        orderDetailAddress: "2층 202호",
        paymentMethod: "kakaopay",
      },
      {
        orderId: 1,
        orderDate: "2024-05-05",
        status: 1,
        companyName: "jeonseoung",
        thumbnailImage: "https://iandwe.s3.ap-northeast-2.amazonaws.com/thumbnail/egqHlHZG",
        productName: "1990년산 와인",
        quantity: 3,
        price: 10000,
        totalAmount: 27000,
        receiverName: "핑고",
        receiverPhone: "010-1111-1111",
        orderZipcode: "33333",
        orderRoadAddress: "하남산단로 9번길 2",
        orderDetailAddress: "2층 202호",
        paymentMethod: "kakaopay",
      },
    ]);
  }),
  http.get("/api/product/like/user/:user", ({ request, params }) => {
    const { pk } = params;
    return HttpResponse.json([
      {
        productId: 1,
        name: "name3",
        totalStock: 1000,
        stock: 1000,
        eventStartDate: "2024-04-25T14:00:00",
        eventEndDate: "2024-04-25T17:00:00",
        eventStartTime: 14,
        eventEndTime: 17,
        price: 10000,
        discount: 10.0,
        thumbnailImage: "https://iandwe.s3.ap-northeast-2.amazonaws.com/thumbnail/egqHlHZG",
        category: "Fashion",
        details: [
          {
            productDetailId: 1,
            imageUrl: "https://iandwe.s3.ap-northeast-2.amazonaws.com/details/hL5SqOBk",
          },
        ],
        likeCount: 1,
        sellerId: 1,
        companyName: "joonseong",
        businessNumber: 101010101,
        companyPhone: 1043200933,
        companyEmail: "306yyy@naver.com",
        over: false,
      },
      {
        productId: 23,
        name: "name3",
        totalStock: 1000,
        stock: 1000,
        eventStartDate: "2024-05-08T19:00:00",
        eventEndDate: "2024-05-09T20:00:00",
        eventStartTime: 19,
        eventEndTime: 20,
        price: 10000,
        discount: 10.0,
        thumbnailImage: "https://iandwe.s3.ap-northeast-2.amazonaws.com/thumbnail/egqHlHZG",
        category: "Fashion",
        details: [
          {
            productDetailId: 23,
            imageUrl: "https://iandwe.s3.ap-northeast-2.amazonaws.com/details/hL5SqOBk",
          },
        ],
        likeCount: 1,
        sellerId: 1,
        companyName: "joonseong",
        businessNumber: 101010101,
        companyPhone: 1043200933,
        companyEmail: "306yyy@naver.com",
        over: false,
      },
    ]);
  }),
  http.get("/api/product/:productId/:userPk", ({ request, params }) => {
    const { produtId, userPk } = params;
    return HttpResponse.json({
      productId: 1,
      name: "name3",
      totalStock: 1000,
      stock: 1000,
      eventStartDate: "2024-04-25T14:00:00",
      eventEndDate: "2024-04-25T17:00:00",
      eventStartTime: 14,
      eventEndTime: 17,
      price: 10000,
      discount: 10.0,
      thumbnailImage: "https://iandwe.s3.ap-northeast-2.amazonaws.com/thumbnail/egqHlHZG",
      category: "Fashion",
      details: [
        {
          productDetailId: 1,
          imageUrl: "https://iandwe.s3.ap-northeast-2.amazonaws.com/details/hL5SqOBk",
        },
      ],
      likeCount: 1,
      sellerId: 1,
      companyName: "joonseong",
      businessNumber: 101010101,
      companyPhone: 1043200933,
      companyEmail: "306yyy@naver.com",
      over: false,
      liked: true,
    });
  }),
  http.get("/api/product/all", ({ request }) => {
    return HttpResponse.json([
      [
        {
          productId: 16,
          name: "name3",
          totalStock: 1000,
          stock: 1000,
          eventStartDate: "2024-05-04T13:00:00",
          eventEndDate: "2024-05-05T17:00:00",
          eventStartTime: 13,
          eventEndTime: 17,
          price: 10000,
          discount: 10.0,
          thumbnailImage: "https://iandwe.s3.ap-northeast-2.amazonaws.com/thumbnail/egqHlHZG",
          category: "Fashion",
          details: [
            {
              productDetailId: 16,
              imageUrl: "https://iandwe.s3.ap-northeast-2.amazonaws.com/details/hL5SqOBk",
            },
          ],
          likeCount: 0,
          sellerId: 1,
          companyName: "joonseong",
          businessNumber: 101010101,
          companyPhone: 1043200933,
          companyEmail: "306yyy@naver.com",
          over: false,
        },
        {
          productId: 17,
          name: "name3",
          totalStock: 1000,
          stock: 1000,
          eventStartDate: "2024-05-04T13:00:00",
          eventEndDate: "2024-05-05T17:00:00",
          eventStartTime: 13,
          eventEndTime: 17,
          price: 10000,
          discount: 10.0,
          thumbnailImage: "https://iandwe.s3.ap-northeast-2.amazonaws.com/thumbnail/egqHlHZG",
          category: "Fashion",
          details: [
            {
              productDetailId: 17,
              imageUrl: "https://iandwe.s3.ap-northeast-2.amazonaws.com/details/hL5SqOBk",
            },
          ],
          likeCount: 0,
          sellerId: 1,
          companyName: "joonseong",
          businessNumber: 101010101,
          companyPhone: 1043200933,
          companyEmail: "306yyy@naver.com",
          over: false,
        },
      ],
      [
        {
          productId: 20,
          name: "name3",
          totalStock: 1000,
          stock: 1000,
          eventStartDate: "2024-05-05T19:00:00",
          eventEndDate: "2024-05-06T20:00:00",
          eventStartTime: 19,
          eventEndTime: 20,
          price: 10000,
          discount: 10.0,
          thumbnailImage: "https://iandwe.s3.ap-northeast-2.amazonaws.com/thumbnail/egqHlHZG",
          category: "Fashion",
          details: [
            {
              productDetailId: 20,
              imageUrl: "https://iandwe.s3.ap-northeast-2.amazonaws.com/details/hL5SqOBk",
            },
          ],
          likeCount: 0,
          sellerId: 1,
          companyName: "joonseong",
          businessNumber: 101010101,
          companyPhone: 1043200933,
          companyEmail: "306yyy@naver.com",
          over: false,
        },
      ],
      [],
      [],
      [
        {
          productId: 21,
          name: "name3",
          totalStock: 1000,
          stock: 1000,
          eventStartDate: "2024-05-08T19:00:00",
          eventEndDate: "2024-05-09T20:00:00",
          eventStartTime: 19,
          eventEndTime: 20,
          price: 10000,
          discount: 10.0,
          thumbnailImage: "https://iandwe.s3.ap-northeast-2.amazonaws.com/thumbnail/egqHlHZG",
          category: "Fashion",
          details: [
            {
              productDetailId: 21,
              imageUrl: "https://iandwe.s3.ap-northeast-2.amazonaws.com/details/hL5SqOBk",
            },
          ],
          likeCount: 0,
          sellerId: 1,
          companyName: "joonseong",
          businessNumber: 101010101,
          companyPhone: 1043200933,
          companyEmail: "306yyy@naver.com",
          over: false,
        },
        {
          productId: 22,
          name: "name3",
          totalStock: 1000,
          stock: 1000,
          eventStartDate: "2024-05-08T19:00:00",
          eventEndDate: "2024-05-09T20:00:00",
          eventStartTime: 19,
          eventEndTime: 20,
          price: 10000,
          discount: 10.0,
          thumbnailImage: "https://iandwe.s3.ap-northeast-2.amazonaws.com/thumbnail/egqHlHZG",
          category: "Fashion",
          details: [
            {
              productDetailId: 22,
              imageUrl: "https://iandwe.s3.ap-northeast-2.amazonaws.com/details/hL5SqOBk",
            },
          ],
          likeCount: 0,
          sellerId: 1,
          companyName: "joonseong",
          businessNumber: 101010101,
          companyPhone: 1043200933,
          companyEmail: "306yyy@naver.com",
          over: false,
        },
        {
          productId: 23,
          name: "name3",
          totalStock: 1000,
          stock: 1000,
          eventStartDate: "2024-05-08T19:00:00",
          eventEndDate: "2024-05-09T20:00:00",
          eventStartTime: 19,
          eventEndTime: 20,
          price: 10000,
          discount: 10.0,
          thumbnailImage: "https://iandwe.s3.ap-northeast-2.amazonaws.com/thumbnail/egqHlHZG",
          category: "Fashion",
          details: [
            {
              productDetailId: 23,
              imageUrl: "https://iandwe.s3.ap-northeast-2.amazonaws.com/details/hL5SqOBk",
            },
          ],
          likeCount: 0,
          sellerId: 1,
          companyName: "joonseong",
          businessNumber: 101010101,
          companyPhone: 1043200933,
          companyEmail: "306yyy@naver.com",
          over: false,
        },
      ],
      [],
      [],
    ]);
  }),
];