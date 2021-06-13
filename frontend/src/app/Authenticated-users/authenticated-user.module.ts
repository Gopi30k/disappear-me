import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthenticatedUserRoutingModule } from "./authenticated-user-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AngularMaterialModule } from "../style-libraries/material/angular-material/angular-material.module";
import { PrimengModule } from "../style-libraries/primeng/primeng/primeng.module";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { SignupComponent } from "./signup/signup.component";
import { LoginComponent } from "./login/login.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [SignupComponent, LoginComponent, DashboardComponent],
  imports: [
    CommonModule,
    PrimengModule,
    AngularMaterialModule,
    AuthenticatedUserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class AuthenticatedUserModule {}
