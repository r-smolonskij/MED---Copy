import { Component, OnInit, ViewChild } from "@angular/core";
import { FieldService } from "src/app/field.service";
import { Field } from "src/app/field.module";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { AppComponent } from "src/app/app.component";
import { Events, IonSearchbar } from "@ionic/angular";
import { DatabaseService, Word } from "src/app/services/database.service";
import { FormControl } from "@angular/forms";
import { debounceTime } from "rxjs/operators";

@Component({
  selector: "app-field-single",
  templateUrl: "./field-single.page.html",
  styleUrls: ["./field-single.page.scss"]
})
export class FieldSinglePage implements OnInit {
  field: any = new Field(2, "Suns", "Dog");
  allWords: Word[] = [];
  foundedWords: Word[] = [];
  id: any;
  isLatvian: boolean = false;
  private subscription;

  searchTerm: string = "";
  searchControl: FormControl = new FormControl();
  items: [] = [];
  searching: any = false;
  @ViewChild("mySingleFieldSearchbar", { static: false })
  searchbar: IonSearchbar;

  constructor(
    private fieldService: FieldService,
    private route: ActivatedRoute,
    private router: Router,
    private appComponent: AppComponent,
    public events: Events,
    private db: DatabaseService
  ) {
    this.subscription = events.subscribe("changeLanguage", () => {
      this.isLatvian = !this.isLatvian;
    });
    this.searchControl = new FormControl();
  }

  ngOnInit() {
    this.isLatvian = this.appComponent.checkIfLatvian();

    this.route.paramMap.subscribe(params => {
      let id = params.get("id");
      this.id = id;
      this.db.getField(id).then(data => {
        this.field = data;
        this.db.getDatabaseState().subscribe(ready => {
          if (ready) {
            this.db.loadWordsByFieldID(id).subscribe(words => {
              this.foundedWords = words;
              this.allWords = words;
            });
          }
        });
      });
    });
    
  }
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
      if (isLatvian) {
        return word.wordLV.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
      } else {
        return (
          word.wordENG.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
        );
      }
    });
  }

  onSearchInput() {
    this.searching = true;
  }

  setFilteredItems(searchTerm) {
    this.foundedWords = this.filterItems(searchTerm, this.isLatvian);
  }

  ionViewWillEnter() {
    this.isLatvian = this.appComponent.checkIfLatvian();
  }

  ionViewWillLeave() {
    if (this.events.subscribe) {
      this.events.unsubscribe;
      console.log("SingleFieldPage unsubscribed");
      this.searchbar.value = "";
    }
  }
}
