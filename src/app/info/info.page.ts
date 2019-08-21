import { Component, OnInit } from "@angular/core";
import { AppComponent } from "../app.component";
import { Events } from "@ionic/angular";

@Component({
  selector: "app-info",
  templateUrl: "./info.page.html",
  styleUrls: ["./info.page.scss"]
})
export class InfoPage implements OnInit {
  isLatvian: boolean = false;

  constructor(private appComponent: AppComponent, public events: Events) {
    events.subscribe("changeLanguage", () => {
      this.isLatvian = !this.isLatvian;
      console.log("is latish: " + this.isLatvian);
    });
  }

  ionViewWillEnter() {
    this.isLatvian = this.appComponent.checkIfLatvian();
  }

  ionViewWillLeave() {
    if (this.events.subscribe) {
      this.events.unsubscribe;
      console.log('InfoPage unsubscribed');
    }
  }

  ngOnInit() {}
}
