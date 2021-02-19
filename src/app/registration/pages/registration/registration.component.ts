import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material";
import { SwiperComponent, SwiperConfigInterface } from "ngx-swiper-wrapper";
import { REGEX_PASSWORD } from "src/app";
import { UserModel } from "src/app/models/user.model";
import { AuthenticationService } from "src/app/services/authentication-service/authentication.service";
import { RegistrationSuccessDialogComponent } from "../../components/registration-success-dialog/registration-success-dialog.component";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.scss"],
})
export class RegistrationComponent implements OnInit {
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
  addressForm: FormGroup;
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
  registeringUser: boolean;
  registrationError: string;
  registerHasError: boolean;
  checkingEmail: boolean;
  mailErrorText: string;
  mailHasError: boolean;
  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // this.initProfileForm();
    this.initUsernamesForm();
    // this.initSpecialitiesForm();
    this.initPasswordForm();
    this.initAddressForm();
  }

  registerUser() {
    this.registeringUser = true;
    this.registerHasError = false;
    const password = this.passwordForm.value.password;
    const confirmPassword = this.passwordForm.value.confirmPassword;
    if (password !== confirmPassword) {
      this.registerHasError = true;
      this.registrationError = "Les deux mots de passe ne sont pas identiques";
      this.registeringUser = false;
      return;
    }
    const newUser: UserModel = {
      email: this.usernamesForm.value.email,
      nom: this.usernamesForm.value.lastName,
      prenom: this.usernamesForm.value.firstName,
      password,
      numero: this.usernamesForm.value.numero,
      adresse: this.addressForm.value.address,
    };
    this.authenticationService.registerUser(newUser).subscribe(
      (createdUser) => {
        this.registeringUser = false;
        this.nextStep();
        this.openSuccessDialog();
      },
      (err) => {
        this.registeringUser = false;
        this.registerHasError = true;
        this.registrationError = "Une erreur est survenue. Veuillez réessayer";
      }
    );
  }

  checkUserMail() {
    this.checkingEmail = true;
    this.mailHasError = false;
    const email = this.usernamesForm.value.email;
    this.authenticationService.checkEmail(email).subscribe(
      (isMailUsed) => {
        this.checkingEmail = false;
        if (isMailUsed) {
          this.mailHasError = true;
          this.mailErrorText = "Cet email est déjà utilisé";
        } else {
          this.nextStep();
        }
      },
      (err) => {
        this.mailHasError = true;
        this.checkingEmail = false;
        this.mailErrorText =
          err && err.error && err.error.email && err.error.email.length
            ? err.error.email[0]
            : "Une erreur est survenue. Veuillez réessayer";
      }
    );
  }

  openSuccessDialog() {
    const dialogRef = this.dialog.open(RegistrationSuccessDialogComponent, {
      panelClass: "register-success-dialog-style",
      backdropClass: "register-success-dialog-backdrop",
      disableClose: true,
      data: {
        nom: this.usernamesForm.value.lastName,
        prenom: this.usernamesForm.value.firstName,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {});
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
      password: ["", [Validators.required, Validators.pattern(REGEX_PASSWORD)]],
      confirmPassword: ["", Validators.required],
    });
  }

  initAddressForm() {
    this.addressForm = this.formBuilder.group({
      address: [""],
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
