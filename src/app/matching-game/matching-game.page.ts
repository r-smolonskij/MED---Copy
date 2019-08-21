import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../services/database.service";
import { Word } from "../word.module";
import { Router } from "@angular/router";

@Component({
  selector: "app-matching-game",
  templateUrl: "./matching-game.page.html",
  styleUrls: ["./matching-game.page.scss"]
})
export class MatchingGamePage {
  wordType;
  words: Word[];
  word1 = new Word(99999, 's', '', 1);
  word2 = new Word(99999, 's', '', 1);
  word3 = new Word(99999, 's', '', 1);
  word4 = new Word(99999, 's', '', 1);
  found;
  correctWord;

  public displayWords: Word[] = [];

  constructor(private db: DatabaseService, private router: Router) {
  }

  ngOnInit() {
    this.wordType = Math.floor(Math.random() * 3) + 1;
    this.db.getDatabaseState().subscribe(ready => {
      if (ready) {
        this.db.loadWordsByTypeID(this.wordType).subscribe(words => {
          this.words = [];
          this.words = words;
          let random = Math.floor(Math.random() * (this.words.length - 1)) + 0;
          this.correctWord = this.words[random];
          this.words.splice(random, 1);
          random = Math.floor(Math.random() * (this.words.length - 1)) + 0;
          this.word1 = this.words[random];
          this.words.splice(random, 1);
          random = Math.floor(Math.random() * (this.words.length - 1)) + 0;
          this.word2 = this.words[random];
          this.words.splice(random, 1);
          random = Math.floor(Math.random() * (this.words.length - 1)) + 0;
          this.word3 = this.words[random];
          this.displayWords = [];
          this.displayWords[0] = new Word(this.correctWord.id, this.correctWord.wordLV, this.correctWord.wordENG, this.correctWord.typeID);
          this.displayWords[1] = new Word(this.word1.id, this.word1.wordLV, this.word1.wordENG, this.word1.typeID);
          this.displayWords[2] = new Word(this.word2.id, this.word2.wordLV, this.word2.wordENG, this.word2.typeID);
          this.displayWords[3] = new Word(this.word3.id, this.word3.wordLV, this.word3.wordENG, this.word3.typeID);
          this.shuffle(this.displayWords);
          alert(this.correctWord.wordLV);
        });
      }
    });
  }
  ngAfterViewInit(){
    alert('loaded');
  }

  ionViewWillEnter() {
    this.wordType = Math.floor(Math.random() * 3) + 1;
    this.db.getDatabaseState().subscribe(ready => {
      if (ready) {
        this.db.loadWordsByTypeID(this.wordType).subscribe(words => {
          this.words = [];
          this.words = words;
          let random = Math.floor(Math.random() * (this.words.length - 1)) + 0;
          this.correctWord = this.words[random];
          this.words.splice(random, 1);
          random = Math.floor(Math.random() * (this.words.length - 1)) + 0;
          this.word1 = this.words[random];
          this.words.splice(random, 1);
          random = Math.floor(Math.random() * (this.words.length - 1)) + 0;
          this.word2 = this.words[random];
          this.words.splice(random, 1);
          random = Math.floor(Math.random() * (this.words.length - 1)) + 0;
          this.word3 = this.words[random];
          this.displayWords = [];
          this.displayWords[0] = new Word(this.correctWord.id, this.correctWord.wordLV, this.correctWord.wordENG, this.correctWord.typeID);
          this.displayWords[1] = new Word(this.word1.id, this.word1.wordLV, this.word1.wordENG, this.word1.typeID);
          this.displayWords[2] = new Word(this.word2.id, this.word2.wordLV, this.word2.wordENG, this.word2.typeID);
          this.displayWords[3] = new Word(this.word3.id, this.word3.wordLV, this.word3.wordENG, this.word3.typeID);
          this.shuffle(this.displayWords);
        });
      }
    });
  }
  ionViewDidLoad() {}

  loadWords(){
    this.wordType = Math.floor(Math.random() * 3) + 1;
    this.db.getDatabaseState().subscribe(ready => {
      if (ready) {
        this.db.loadWordsByTypeID(this.wordType).subscribe(words => {
          this.words = [];
          this.words = words;
        });
      }
    });
  }

  public myFunc(id) {
    window.alert("word id: "+id);
  }

  shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }

  onAnswering() {
    alert("hello");
  }

  displayWord(word: Word, language: string) {
    if (language == "LV") {
      return word.wordLV;
    } else {
      return word.wordENG;
    }
  }
}
