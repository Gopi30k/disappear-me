import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private router: Router) {}
  isHome: boolean = true;
  homeNavUrl: string = "/";
  isUserLoggedIn() {
    return !!localStorage.getItem("disappearMeUserToken");
  }

  logOutUser() {
    localStorage.removeItem("disappearMeUserToken");
    this.router.navigate(["/"]);
  }
}
