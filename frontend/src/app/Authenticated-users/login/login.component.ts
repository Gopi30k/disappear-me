import { Component, OnInit } from "@angular/core";
import { NavBarService } from "src/app/services/nav-bar.service";
import { MessageService } from "primeng/api";
import {
  Validators,
  FormGroup,
  FormBuilder,
  FormControl,
} from "@angular/forms";
import { Router } from "@angular/router";
import { DisappearMeService } from "src/app/services/disappear-me.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean = false;
  constructor(
    public nav: NavBarService,
    private disappearService: DisappearMeService,
    private router: Router,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.nav.hide();
    this.loginForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  loginUser() {
    const loginFormValue = this.loginForm.value;
    this.disappearService.loginUser(loginFormValue).subscribe(
      (response) => {
        if (response.ok) {
          console.log(response.body);
          let responseObj = response.body;
          localStorage.setItem("disappearMeUserToken", responseObj["token"]);
          this.router.navigate(["user", responseObj["user"]]);
        } else {
          console.log(response);
        }
      },

      (err) => {
        this.showError(err["msg"]);
      }
    );
  }

  showError(message: string) {
    this.messageService.add({
      severity: "error",
      summary: "Error",
      detail: message,
    });
  }
}
