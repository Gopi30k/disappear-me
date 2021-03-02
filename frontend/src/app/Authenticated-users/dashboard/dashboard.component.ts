import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DisappearMeService } from "src/app/services/disappear-me.service";
import { InputContent, UserContent } from "../../models";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { NavBarService } from "src/app/services/nav-bar.service";
import { AuthService } from "src/app/services/auth.service";
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
  animations: [
    trigger("detailExpand", [
      state("collapsed", style({ height: "0px", minHeight: "0" })),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      ),
    ]),
  ],
})
export class DashboardComponent implements OnInit {
  userContent: UserContent[];
  selctedRow;
  url: string = location.origin;
  columnsToDisplay = [
    "icon",
    "type",
    "ttl",
    "date_done",
    "status",
    "url_path",
    "retry",
    "delete",
  ];
  expandedElement: UserContent | null;
  statusCodes: Object = {
    SUCCESS: "EXPIRED",
    PROGRESS: "ACTIVE",
    FAILURE: "FAILED",
  };

  time = {
    "1 minute": 60,
    "5 minutes": 300,
    "15 minutes": 900,
    "30 minutes": 1800,
    "1 Hour": 3600,
  };
  constructor(
    private route: ActivatedRoute,
    private disappearService: DisappearMeService,
    private router: Router,
    private nav: NavBarService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.nav.show();
    // this.nav.hideSignIn();
    this.authService.isHome = false;
    this.route.paramMap.subscribe((params) => {
      const user_id = params.get("user_id");
      this.authService.homeNavUrl = `/user/${user_id}`;
      this.disappearService.getUserContent(user_id).subscribe(
        (response) => {
          this.userContent = response;
          // console.log(this.userContent);
        },

        (err) => {
          console.log(err);
        }
      );
    });
  }

  onClick(event) {
    // console.log(event);
    // console.log(this.expandedElement);
    // this.selctedRow=event;
    this.expandedElement = this.expandedElement === event ? null : event;
  }

  authenticatedUserGenerate() {
    this.router.navigate(["create"], { relativeTo: this.route });
  }

  retryTask(content) {
    console.log(content);

    let data = {
      input: {
        content: content.result.content,
        ttl: {
          time: content.result.time,
          ttl_seconds: this.time[content.result.time],
        },
        type: content.result.type,
        user: content.user,
      },
      task_id: content.task_id,
    };
    this.disappearService.retryTask(data).subscribe((d) => {
      // this.disappearService.getUserContent(content.user);
      location.reload();
    });
  }

  deleteTask(content) {
    this.disappearService.deleteTask(content.task_id).subscribe((d) => {
      console.log(d);
      location.reload();
    });
  }
}
