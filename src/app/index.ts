import { SwiperConfigInterface } from "ngx-swiper-wrapper";

export const SWIPER_CONFIGURATION: SwiperConfigInterface = {
  direction: "horizontal",
  // slidesPerView: 3,
  keyboard: false,
  mousewheel: false,
  scrollbar: false,
  navigation: false,
  pagination: false,
  autoplay: false,
  loop: true,
  speed: 500,
  centeredSlides: true,
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1.5,
      spaceBetween: 20,
    },
    480: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    640: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
    920: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
    1180: {
      slidesPerView: 5,
      spaceBetween: 40,
    },
  },
  effect: "slide",
};

export const REGEX_PASSWORD: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

export enum LOCAL_STORAGE_KEYS {
  ACCESS_TOKEN = "access-token",
  USER = "user",
}
