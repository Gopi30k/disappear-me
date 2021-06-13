import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { CustomFormValidationService } from "src/app/services/custom-form-validation.service";
import { DisappearMeService } from "src/app/services/disappear-me.service";
import { NavBarService } from "src/app/services/nav-bar.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
  providers: [MessageService],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  submitted: boolean = false;
  constructor(
    public nav: NavBarService,
    private disappearService: DisappearMeService,
    private router: Router,
    private messageService: MessageService,
    private fb: FormBuilder,
    private customValidator: CustomFormValidationService
  ) {}

  ngOnInit() {
    this.nav.hide();
    this.signupForm = this.fb.group(
      {
        firstName: ["", Validators.required],
        lastName: ["", Validators.required],
        email: ["", [Validators.required, Validators.email]],
        password: [
          "",
          Validators.compose([
            Validators.required,
            this.customValidator.passwordPatternValidator(),
          ]),
        ],
        confirmPassword: ["", [Validators.required]],
      },
      {
        validator: this.customValidator.passwordMatchValidator(
          "password",
          "confirmPassword"
        ),
      }
    );
  }

  get signupFormControl() {
    return this.signupForm.controls;
  }

  signupUser() {
    this.submitted = true;
    if (this.signupForm.valid) {
      const formValue = this.signupForm.value;
      delete formValue.confirmPassword;
      console.table(formValue);

      this.disappearService.signupUser(formValue).subscribe(
        (response) => {
          if (response.ok) {
            this.router.navigate(["/user/login"]);
          }
        },
        (err) => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: err.error,
          });
        }
      );
    }
  }
}
