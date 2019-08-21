import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChange,
  OnDestroy
} from "@angular/core";
import { AppComponent } from "../app.component";
import { Events } from "@ionic/angular";
import { Plugins } from '@capacitor/core';

const {SplashScreen} = Plugins;

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  componentDidLoad(){
    SplashScreen.hide();
  }
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
      console.log('HomePage unsubscribed');
    }
  }
  
}
