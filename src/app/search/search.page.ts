import { Component, OnInit, ViewChild } from "@angular/core";
import { DataService } from "../services/data.service";
import { FormControl } from "@angular/forms";
import { debounceTime } from "rxjs/operators";
import { Events, NavController, IonSearchbar } from "@ionic/angular";
import { AppComponent } from "../app.component";
import { Subscription } from "rxjs";
import { DatabaseService } from '../services/database.service';
import { Word } from '../word.module';

@Component({
  selector: "app-search",
  templateUrl: "./search.page.html",
  styleUrls: ["./search.page.scss"]
})
export class SearchPage implements OnInit  {
  allWords: Word [] = [];
  foundedWords: Word[] = [];
  isLatvian: boolean = false;

  searchTerm: string = "";
  searchControl: FormControl = new FormControl();
  items: [] = [];
  searching: any = false;
  @ViewChild('myWordsSearchbar',  {static: false}) searchbar : IonSearchbar;

  constructor(
    private appComponent: AppComponent,
    public events: Events,
    private dataService: DataService,
    public navCtrl: NavController,
    private db: DatabaseService
  ) {
    events.subscribe("changeLanguage", () => {
      this.isLatvian = !this.isLatvian;
      console.log("is latish: " + this.isLatvian);
      this.searchbar.value ='';
    });
    this.searchControl = new FormControl();
  }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(ready => {
      if (ready) {
        this.db.getWords().subscribe(words => {
          this.foundedWords = words;
          this.allWords = words;
        })
      }
    });
  }

  ionViewWillEnter() {
    this.isLatvian = this.appComponent.checkIfLatvian();
  }

  ionViewWillLeave() {
    if (this.events.subscribe) {
      this.events.unsubscribe;
      console.log("WordsPage unsubscribed");
      this.searchbar.value ='';
    }
  }

  //SEARCHING TOOL
  ngAfterViewInit() {
    this.searchControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe(search => {
        this.searching = false;
        this.setFilteredItems(search);
      });
  }
  filterItems(searchTerm: string, isLatvian: boolean) {
    return this.allWords.filter(word => {
      if(isLatvian){
        return word.wordLV.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
      }else{
        return word.wordENG.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
      }
    });
  }
  onSearchInput() {
    this.searching = true;
  }

  setFilteredItems(searchTerm) {
    this.foundedWords = this.filterItems(searchTerm, this.isLatvian);
  }

  getWords(){
    this.db.getDatabaseState().subscribe(ready => {
      if (ready) {
        this.db.getWords().subscribe(words => {
          this.allWords = words;
        })
      }
    });
  }

}
