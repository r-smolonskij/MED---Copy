import { Component, OnInit } from "@angular/core";
import { AppComponent } from "../app.component";
import { Events, Platform } from "@ionic/angular";
import { NativeAudio } from "@ionic-native/native-audio";
import { SmartAudioService } from "../smart-audio.service";
import { ActivatedRoute, Router } from "@angular/router";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { DatabaseService } from "../services/database.service";
import { Word } from "../word.module";
@Component({
  selector: "app-word-single",
  templateUrl: "./word-single.page.html",
  styleUrls: ["./word-single.page.scss"]
})
export class WordSinglePage implements OnInit {
  isLatvian: boolean = false;
  numbers;
  isPlaying: boolean = false;
  audio = new Audio("assets/audio/sound.mp3");
  wordID;
  word: Word = new Word(111,'Suns', 'Dog',1);
  private subscription;
  wordType;

  allFields;

  constructor(
    private appComponent: AppComponent,
    public events: Events,
    private router: Router,
    public smartAudio: SmartAudioService,
    private route: ActivatedRoute,
    private db: DatabaseService
  ) {
    this.subscription = events.subscribe("changeLanguage", () => {
      this.isLatvian = !this.isLatvian;
    });
  }

  translationSound() {
    this.audio.play();
  }

  ionViewWillEnter() {
    this.isLatvian = this.appComponent.checkIfLatvian();
  }
  
  ionViewWillLeave() {
    if (this.events.subscribe) {
      this.events.unsubscribe;
      console.log("SingleWordPage unsubscribed");
    }
    this.audio.pause();
    this.audio.currentTime = 0;
  }

  ngOnInit() {
    this.isLatvian = this.appComponent.checkIfLatvian();
    
    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      this.db.getWord(id).then(data => {
        this.word = data;
        this.db.getDatabaseState().subscribe(ready => {
          if (ready) {
            this.db.loadFieldsByWordID(id).subscribe(fields => {
              this.allFields = fields;
            });
          }
        });
        if(this.word.typeID === 1){
          if(this.isLatvian){
            this.wordType ="Jautājums";
          }
          else{
            this.wordType ="Question";
          }
          
        }
        else if(this.word.typeID === 2) {
          if(this.isLatvian){
            this.wordType ="Vārds, frāze";
          }
          else{
            this.wordType ="Word, phrase";
          }
        }
        else{
          if(this.isLatvian){
            this.wordType ="Norādījums";
          }
          else{
            this.wordType ="Instruction";
          }
        }
      });
    });
  }
}
