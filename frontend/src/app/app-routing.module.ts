import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ContentViewPageComponent } from "./content-view-page/content-view-page.component";
// import { DisappearMeComponent } from "./disappear-me/disappear-me.component";
import { DisappearMeComponent } from "./shared/disappear-me/disappear-me.component";
import { ShowURLComponent } from "./show-url/show-url.component";

const routes: Routes = [
  {
    path: "",
    component: DisappearMeComponent,
  },
  {
    path: ":task_id",
    component: ContentViewPageComponent,
  },
  {
    path: "user",
    loadChildren: () =>
      import("./Authenticated-users/authenticated-user.module").then(
        (m) => m.AuthenticatedUserModule
      ),
    // canActivate: [BmarkerAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
