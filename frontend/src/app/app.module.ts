import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PrimengModule } from "./style-libraries/primeng/primeng/primeng.module";
import { AngularMaterialModule } from "./style-libraries/material/angular-material/angular-material.module";
import { DisappearMeComponent } from "./disappear-me/disappear-me.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ShowURLComponent } from "./show-url/show-url.component";
import { ClipboardModule } from "ngx-clipboard";
import { ContentViewPageComponent } from "./content-view-page/content-view-page.component";
import { NgxSpinnerModule } from "ngx-spinner";
import { LoaderInterceptor } from "./http-interceptor/loader-interceptor";
@NgModule({
  declarations: [
    AppComponent,
    DisappearMeComponent,
    NavbarComponent,
    ShowURLComponent,
    ContentViewPageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularMaterialModule,
    PrimengModule,
    ClipboardModule,
    NgxSpinnerModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  entryComponents: [ShowURLComponent],
})
export class AppModule {}
