import { Component, Inject, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { InputContent } from "../models";
import { DisappearMeService } from "../services/disappear-me.service";
import { Subscription, interval } from "rxjs";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: "app-content-view-page",
  templateUrl: "./content-view-page.component.html",
  styleUrls: ["./content-view-page.component.scss"],
})
export class ContentViewPageComponent implements OnInit {
  contentObj: InputContent;
  private subscription: Subscription;

  private secondsInAMinute = 60;
  private secondsInAnHour = 60 * 60;
  private secondsInADay = 24 * 60 * 60;

  remainingSeconds: number;

  daysLeft: number = 0;
  hoursLeft: number = 0;
  minutesLeft: number = 0;
  secondsLeft: number = 0;

  constructor(
    private disappearService: DisappearMeService,
    private route: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.disappearService.getTaskTimeDetails(params.get("task_id")).subscribe(
        (data) => {
          this.contentObj = data;
          // console.log(this.contentObj);
          if (this.contentObj.active) {
            if (this.contentObj.type === "link") {
              this.document.location.href = this.contentObj.content;
            } else if (this.contentObj.type === "message") {
              this.remainingSeconds = data.ttl;
            }
          } else {
            this.remainingSeconds = 0;
          }
        },
        (err) => {
          // console.log(err);
        }
      );
    });

    this.subscription = interval(1000).subscribe((x) => {
      if (this.remainingSeconds > 0) {
        this.remainingSeconds = this.contentObj.ttl -= 1;
        this.getTimer(this.remainingSeconds);
      }
    });
  }

  private getTimer(seconds: number) {
    // Days
    this.daysLeft = Math.floor(seconds / this.secondsInADay);

    //Hours
    const hourSeconds = seconds % this.secondsInADay;
    this.hoursLeft = Math.floor(hourSeconds / this.secondsInAnHour);

    //Minutes
    const minuteSeconds = hourSeconds % this.secondsInAnHour;
    this.minutesLeft = Math.floor(minuteSeconds / this.secondsInAMinute);

    //Seconds
    this.secondsLeft = Math.ceil(minuteSeconds % this.secondsInAMinute);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }
}
