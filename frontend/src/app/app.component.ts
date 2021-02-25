import { Component, OnDestroy, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor() {}
  ngOnInit() {}

  public onRouterOutletActivate(event: any) {
    //   console.log(Object(event));
    //   console.log(typeof event);
    //   console.log(event.constructor);
    //   if (
    //     event.constructor.name === "ContentViewPageComponent" &&
    //     event.contentObj.type === "link"
    //   ) {
    //     console.log(event);
    //     this.showNavBar = false;
    //   }
    // }
  }

  ngOnDestroy() {}
}
