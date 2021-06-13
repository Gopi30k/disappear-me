import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { filter, map, mergeMap } from "rxjs/operators";
import { AuthService } from "../services/auth.service";
import { NavBarService } from "../services/nav-bar.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  constructor(
    public nav: NavBarService,
    private router: Router,
    public authService: AuthService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {}

  onHomeNavigate() {
    //
    console.log(this.authService.homeNavUrl);

    this.router.navigateByUrl(this.authService.homeNavUrl, {
      // relativeTo: this.route,
      replaceUrl: true,
    });
  }

  // signOut() {
  //   localStorage.removeItem("disappearMeUserToken");
  //   this.router.navigate(["user", "login"]);
  // }
}
