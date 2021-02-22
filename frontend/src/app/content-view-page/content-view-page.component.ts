import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DisappearMeService } from "../services/disappear-me.service";

@Component({
  selector: "app-content-view-page",
  templateUrl: "./content-view-page.component.html",
  styleUrls: ["./content-view-page.component.scss"],
})
export class ContentViewPageComponent implements OnInit {
  constructor(
    private disappearService: DisappearMeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.disappearService.getTaskTimeDetails(params.get("task_id")).subscribe(
        (data) => {
          console.log(data);
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }
}
