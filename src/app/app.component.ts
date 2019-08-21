import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Platform, IonApp, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  isLatvian: boolean ;

  @Output()
  change: EventEmitter<boolean> = new EventEmitter<boolean>();

  setLanguage(language:boolean){
    console.log('language at first: '+language);
    this.change.emit(language = !language);
    console.log('language after change: '+language);
  }

  public appCtrl: IonApp;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    public events: Events
  ) {
    this.initializeApp();
  }
  onMenuClicked(){
    this.events.publish('changeLanguage');
    console.log('Change language clicked');
  }
  ngOnInit(){
    console.log(this.isLatvian);
    this.isLatvian = true;
  }

  changeLanguage(){
    this.router.navigateByUrl('/fields');
    this.router.navigateByUrl(this.router.url);
    this.isLatvian = !this.isLatvian ;
    
    //this.isLatvian = !this.isLatvian;
    //console.log(this.isLatvian);
    //console.log(this.router.url);
  }
  checkIfLatvian(){
    return this.isLatvian;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
