import { Component, OnDestroy, OnInit } from "@angular/core";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";

@Component({
  selector: "app-show-url",
  templateUrl: "./show-url.component.html",
  styleUrls: ["./show-url.component.scss"],
})
export class ShowURLComponent implements OnInit, OnDestroy {
  urlPath: string;
  cpBtnText: string = "Copy";
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit() {
    if ("data" in this.config) {
      this.urlPath = this.config.data;
      console.log(this.config.data);
    }
  }

  copied(urlPath) {
    this.cpBtnText = "Copied!";
  }
  ngOnDestroy(): void {
    this.ref.close();
  }
}
