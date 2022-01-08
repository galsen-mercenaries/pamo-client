import { SwiperConfigInterface } from "ngx-swiper-wrapper";
import {
  AppointmentModel,
  APPOINTMENT_STATUS,
} from "./models/appointment.model";

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

export const REGEX_PASSWORD: RegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

export enum LOCAL_STORAGE_KEYS {
  ACCESS_TOKEN = "access-token",
  USER = "user",
}

export const MAP_MONTHS_EN_TO_FR: Map<string, string> = new Map([
  ["Jan", "Jan"],
  ["Feb", "Fev"],
  ["Mar", "Mar"],
  ["Apr", "Avr"],
  ["May", "Mai"],
  ["Jun", "Juin"],
  ["Jul", "Juil"],
  ["Aug", "Août"],
  ["Sep", "Sep"],
  ["Oct", "Oct"],
  ["Nov", "Nov"],
  ["Dec", "Dec"],
]);

export const MAP_DAYS_EN_TO_FR: Map<string, string> = new Map([
  ["Mon", "Lun"],
  ["Tue", "Mar"],
  ["Wed", "Mer"],
  ["Thu", "Jeu"],
  ["Fri", "Ven"],
  ["Sat", "Sam"],
  ["Sun", "Dim"],
]);

export function isEqualDate(date1, date2) {
  date1.setHours(0, 0, 0, 0);
  date2.setHours(0, 0, 0, 0);
  return date1.getTime() === date2.getTime();
}

export function getAppointmentClass(appointment: AppointmentModel) {
  switch (appointment.status) {
    case APPOINTMENT_STATUS.CANCELED:
      return "event-canceled";
    case APPOINTMENT_STATUS.CONFIRMED:
      return "event-confirmed";
    case APPOINTMENT_STATUS.PERFORMED:
      return "event-performed";
    case APPOINTMENT_STATUS.EXPIRED:
      return "event-expired";
    case APPOINTMENT_STATUS.NOT_ANSWERED:
      return "event-ignored";
    case APPOINTMENT_STATUS.POSTPONED:
      return "event-scheduled";
    case APPOINTMENT_STATUS.PENDING:
      return "event-pending";
    default:
      return "event-pending";
  }
}

export enum APPOINTMENTS_TEXTS {
  PATIENT = "Votre rendez-vous a bien été enregistré. Vous recevrez bientôt une confirmation de la part de votre médecin.<br>Merci de votre fiélité!",
  PATIENT_CONFIRM_SUCCESS = "Le rendez-vous a été bien confirmé. Le médecin sera notifié de la confirmation.<br>Merci et à bientôt",
  PATIENT_UPDATE_SUCCESS = "Report bien effectué. Vous serez notifié en cas de confirmation du médecin.<br>Merci et à bientôt",
  MEDECIN_CONFIRM_SUCCESS = "Le rendez-vous a été bien confirmé. Le patient sera notifié de la confirmation.<br>Merci et à bientôt",
  MEDECIN_UPDATE_SUCCESS = "Merci d'avoir mis à jour la date. Votre patient en sera informé et pourra vous confirmer sa disponibilité..<br>Merci et à bientôt",
  MEDECIN_FAILED = "L'opération a échoué. Merci de réessayer!<br>Si cela persiste, merci de contacter l'admin",
}
