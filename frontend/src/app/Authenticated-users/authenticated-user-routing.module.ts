import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
// import { DisappearMeComponent } from "../disappear-me/disappear-me.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { DisappearMeComponent } from "../shared/disappear-me/disappear-me.component";
import { DisappearmeAuthGuard } from "../Guards/disappearme-auth.guard";
const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
    // data: { toolbar: false },
  },
  {
    path: "signup",
    component: SignupComponent,
  },
  {
    path: ":user_id",
    component: DashboardComponent,
    canActivate: [DisappearmeAuthGuard],
    // children: [
    //   {
    //     path: "create",
    //     component: DisappearMeComponent,
    //   },
    // ],
  },
  {
    path: ":user_id/create",
    component: DisappearMeComponent,
    canActivate: [DisappearmeAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticatedUserRoutingModule {}
