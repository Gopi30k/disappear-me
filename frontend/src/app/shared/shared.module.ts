import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DisappearMeComponent } from "./disappear-me/disappear-me.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PrimengModule } from "../style-libraries/primeng/primeng/primeng.module";
import { AngularMaterialModule } from "../style-libraries/material/angular-material/angular-material.module";
import { ClipboardModule } from "ngx-clipboard";

@NgModule({
  declarations: [DisappearMeComponent],
  imports: [
    CommonModule,
    PrimengModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ClipboardModule,
  ],
  exports: [DisappearMeComponent],
})
export class SharedModule {}
