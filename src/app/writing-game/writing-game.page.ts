import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../services/database.service";
import { Word } from "../word.module";
import { Events } from '@ionic/angular';

@Component({
  selector: "app-writing-game",
  templateUrl: "./writing-game.page.html",
  styleUrls: ["./writing-game.page.scss"]
})
export class WritingGamePage implements OnInit {
  count;
  words;
  random;
  foundedWord = new Word(99999, '', '', 2);
  word = new Word(11, 'suns', 'dog', 2);

  constructor(private db: DatabaseService,  public events: Events) {
    
  }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(ready => {
      if (ready) {
        this.db.countdb().subscribe(result => {
          this.count = result;
          this.random = Math.floor(Math.random() * this.count);
          this.db.getWord(this.random).then(data => {
            this.foundedWord = data;
          });
        });
      }
    });
  }
  ionViewWillEnter() {
    this.db.getDatabaseState().subscribe(ready => {
      if (ready) {
          this.random = Math.floor(Math.random() * this.count);
          this.db.getWord(this.random).then(data => {
            this.foundedWord = data;
          });
      }
    });
  }
  ionViewWillLeave(){
    
  }
  onClick(){
    this.ionViewWillEnter();
  }


}
