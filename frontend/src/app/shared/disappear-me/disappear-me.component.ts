import { Component, OnInit } from "@angular/core";
import { SelectItem } from "primeng/api";
import { InputContent, TTL } from "../../models";
import { MessageService } from "primeng/api";
import { DisappearMeService } from "../../services/disappear-me.service";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { ShowURLComponent } from "../../show-url/show-url.component";
import { NavBarService } from "../../services/nav-bar.service";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-disappear-me",
  templateUrl: "./disappear-me.component.html",
  styleUrls: ["./disappear-me.component.scss"],
  providers: [MessageService, DialogService],
})
export class DisappearMeComponent implements OnInit {
  contentTypeSelected: string;
  ttl_options: SelectItem[];
  selectedTTL: any = { time: "1 minute", ttl_seconds: 60 };
  content: string;
  ref: DynamicDialogRef;
  displayURLDialog: boolean = false;
  urlPath: string;
  cpBtnText: string = "Copy";
  userId: string;
  constructor(
    private messageService: MessageService,
    public dialogService: DialogService,
    private disappearService: DisappearMeService,
    public nav: NavBarService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    this.ttl_options = [
      { label: "1 minute", value: { time: "1 minute", ttl_seconds: 60 } },
      { label: "5 minutes", value: { time: "5 minutes", ttl_seconds: 300 } },
      { label: "15 minutes", value: { time: "15 minutes", ttl_seconds: 900 } },
      { label: "30 minutes", value: { time: "30 minutes", ttl_seconds: 1800 } },
      { label: "1 Hour", value: { time: "1 Hour", ttl_seconds: 3600 } },
    ];
  }

  onChange() {
    this.content = undefined;
  }

  ngOnInit() {
    this.nav.show();
    // this.nav.showSignIn();
    this.authService.isHome = true;
    this.route.paramMap.subscribe((params) => {
      const user_id = params.get("user_id");
      if (user_id) {
        // this.nav.hideSignIn();
        this.authService.isHome = false;
        this.userId = user_id;
        this.authService.homeNavUrl = `/user/${user_id}`;
      }
    });
  }

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
    this.selectedTTL = { time: "1 minute", ttl_seconds: 60 };
    this.content = undefined;
    this.contentTypeSelected = undefined;
  }

  onSubmit() {
    // console.log(
    //   this.content,
    //   this.contentTypeSelected,
    //   this.selectedTTL,
    //   this.userId
    // );

    if (this.content && this.contentTypeSelected && this.selectedTTL) {
      const disappearObj: InputContent = {
        content: this.content,
        type: this.contentTypeSelected,
        ttl: this.selectedTTL,
      };

      this.userId && (disappearObj["user"] = this.userId);
      // console.log(disappearObj);

      this.disappearService.getURLPath(disappearObj).subscribe(
        (data) => {
          // console.log(data);
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
