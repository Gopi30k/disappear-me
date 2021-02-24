import { Component, OnInit } from "@angular/core";
import { SelectItem } from "primeng/api";
import { InputContent, TTL } from "../models";
import { MessageService } from "primeng/api";
import { DisappearMeService } from "../services/disappear-me.service";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { ShowURLComponent } from "../show-url/show-url.component";

@Component({
  selector: "app-disappear-me",
  templateUrl: "./disappear-me.component.html",
  styleUrls: ["./disappear-me.component.scss"],
  providers: [MessageService, DialogService],
})
export class DisappearMeComponent implements OnInit {
  contentTypeSelected: string;
  ttl_options: SelectItem[];
  selectedTTL: number = 60;
  content: string;
  ref: DynamicDialogRef;
  displayURLDialog: boolean = false;
  urlPath: string;
  cpBtnText: string = "Copy";
  constructor(
    private messageService: MessageService,
    public dialogService: DialogService,
    private disappearService: DisappearMeService
  ) {
    this.ttl_options = [
      // { label: "Select time", value: null },
      { label: "1 minute", value: 60 },
      { label: "5 minutes", value: 300 },
      { label: "15 minutes", value: 900 },
      { label: "30 minutes", value: 1800 },
      { label: "1 Hour", value: 3600 },
    ];
  }

  onChange() {
    this.content = undefined;
  }

  ngOnInit() {}

  onPaste(event: ClipboardEvent) {
    navigator["clipboard"].readText().then((data) => {
      this.content = data;
    });
  }

  copied(urlPath) {
    this.cpBtnText = "Copied!";
  }

  showURLDialog(urlPathData) {
    this.ref = this.dialogService.open(ShowURLComponent, {
      data: urlPathData,
      width: "70%",
    });
  }

  resetFields() {
    this.selectedTTL = 60;
    this.content = undefined;
    this.contentTypeSelected = undefined;
  }

  onSubmit() {
    console.log(this.content, this.contentTypeSelected, this.selectedTTL);

    if (this.content && this.contentTypeSelected && this.selectedTTL) {
      const disappearObj: InputContent = {
        content: this.content,
        type: this.contentTypeSelected,
        ttl: this.selectedTTL,
        active: true,
      };
      // console.log(disappearObj);

      this.disappearService.getURLPath(disappearObj).subscribe(
        (data) => {
          console.log(data);
          // this.showURLDialog(data);
          this.urlPath = data;
          this.displayURLDialog = true;
          this.resetFields();
        },
        (err) => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: "Server Error, Please Try again Later  ",
          });
          this.resetFields();
        }
      );
    } else {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail:
          "Invalid data, Please enter the message/link to make it disappear ",
      });
    }
  }
}
