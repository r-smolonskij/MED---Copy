import { Component, OnInit, ViewChild } from "@angular/core";
import { Field } from "../field.module";
import { FieldService } from "../field.service";
import { AppComponent } from "../app.component";
import { Events, NavController, IonSearchbar } from "@ionic/angular";
import { FormControl } from "@angular/forms";
import { debounceTime } from 'rxjs/operators';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: "app-fields",
  templateUrl: "./fields.page.html",
  styleUrls: ["./fields.page.scss"]
})
export class FieldsPage implements OnInit  {
  allFields: Field [] = [];
  foundedFields: Field[] = [];
  field = {};
  isLatvian: boolean = false;

  searchTerm: string = "";
  searchControl: FormControl = new FormControl();
  items: [] = [];
  searching: any = false;
  @ViewChild('myFieldsSearchbar',  {static: false}) searchbar : IonSearchbar;

  constructor(
    private appComponent: AppComponent,
    public events: Events,
    private fieldService: FieldService,
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
        this.db.getFields().subscribe(fields => {
          this.foundedFields = fields;
          this.allFields = fields;
        });
      }
    });
  }

  ionViewWillEnter() {
    this.isLatvian = this.appComponent.checkIfLatvian();

    this.db.getDatabaseState().subscribe(ready => {
      if (ready) {
        this.db.getFields().subscribe(fields => {
          this.foundedFields = fields;
          this.allFields = fields;
        });
      }
    });
    /*this.foundedFields = this.fieldService.getFields();*/
  }

  ionViewWillLeave() {
    if (this.events.subscribe) {
      this.events.unsubscribe;
      console.log("FieldsPage unsubscribed");
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

  onSearchInput() {
    this.searching = true;
  }

  setFilteredItems(searchTerm) {
    this.foundedFields = this.fieldService.filterFields(this.allFields,searchTerm, this.isLatvian);
  }

  getFields(){
    this.db.getDatabaseState().subscribe(ready => {
      if (ready) {
        this.db.getFields().subscribe(fields => {
          this.allFields = fields;
        })
      }
    });
  }

}
