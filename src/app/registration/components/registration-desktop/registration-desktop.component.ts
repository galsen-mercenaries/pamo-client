import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SwiperComponent, SwiperConfigInterface } from "ngx-swiper-wrapper";

@Component({
  selector: "app-registration-desktop",
  templateUrl: "./registration-desktop.component.html",
  styleUrls: ["./registration-desktop.component.scss"],
})
export class RegistrationDesktopComponent implements OnInit {
  swiperConfig: SwiperConfigInterface = {
    direction: "horizontal",
    slidesPerView: 1,
    keyboard: false,
    mousewheel: false,
    scrollbar: false,
    navigation: false,
    pagination: false,
    autoplay: false,
    loop: false,
    allowTouchMove: false,
    speed: 500,
    centeredSlides: true,
  };
  profileForm: FormGroup;
  usernamesForm: FormGroup;
  specialitiesForm: FormGroup;
  passwordForm: FormGroup;
  @ViewChild("swiper", { static: false }) swiperComponent: SwiperComponent;
  selectedProfile: "patient" | "medecin";
  specialities = [
    { name: "Dentiste", code: "1" },
    { name: "Ophtalmologue", code: "2" },
    { name: "Urologue", code: "3" },
    { name: "Pédiatrie", code: "4" },
    { name: "Chirurgie plastique", code: "5" },
  ];
  isPasswordVisible: boolean;
  isConfirmPasswordVisible: boolean;
  steps = [1, 2, 3, 4];
  currentSlideIndex = 0;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initProfileForm();
    this.initUsernamesForm();
    this.initSpecialitiesForm();
    this.initPasswordForm();
  }

  initProfileForm() {
    this.profileForm = this.formBuilder.group({
      profile: ["", Validators.required],
    });
  }

  initUsernamesForm() {
    this.usernamesForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      numero: [""],
    });
  }

  initSpecialitiesForm() {
    this.specialitiesForm = this.formBuilder.group({
      specialities: [[]],
    });
  }

  initPasswordForm() {
    this.passwordForm = this.formBuilder.group({
      password: ["", Validators.required],
      confirmPassword: ["", Validators.required],
    });
  }

  swapInputType() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  swapConfirmInputType() {
    this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible;
  }

  nextStep() {
    this.swiperComponent.directiveRef.nextSlide();
  }

  previousStep() {
    this.swiperComponent.directiveRef.prevSlide();
  }

  onIndexChanged(index) {
    setTimeout(() => {
      this.currentSlideIndex = index;
    }, 500);
  }
}
