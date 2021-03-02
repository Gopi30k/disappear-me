import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class NavBarService {
  visible: boolean = true;
  signInBtn: boolean = true;
  constructor() {
    // this.visible = false;
  }

  hide() {
    this.visible = false;
  }
  hideSignIn() {
    this.signInBtn = false;
  }

  show() {
    this.visible = true;
  }
  showSignIn() {
    this.signInBtn = true;
  }

  toggle() {
    this.visible = !this.visible;
  }
}
