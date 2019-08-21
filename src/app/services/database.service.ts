import { Platform } from "@ionic/angular";
import { Injectable, OnInit } from "@angular/core";
import { SQLitePorter } from "@ionic-native/sqlite-porter/ngx";
import { HttpClient } from "@angular/common/http";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite/ngx";
import { BehaviorSubject, Observable } from "rxjs";

export interface Field {
  id: number;
  titleLV: string;
  titleENG: string;
}

export interface Type {
  id: number;
  feature: string;
  explanation: string;
}

export interface Word {
  id: number;
  wordLV: string;
  wordENG: string;
  typeID: number;
}

export interface WordsFieldRelationship {
  id: number;
  wordID: string;
  fieldID: string;
}

@Injectable({
  providedIn: "root"
})
export class DatabaseService {
  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  fields = new BehaviorSubject([]);
  types = new BehaviorSubject([]);
  words = new BehaviorSubject([]);
  wordsByFieldID = new BehaviorSubject([]);
  wordsByTypeID = new BehaviorSubject([]);
  fieldsByWordID = new BehaviorSubject([]);
  wordsCount = new BehaviorSubject([]);
  word = new BehaviorSubject([]);

  constructor(
    private plt: Platform,
    private sqlitePorter: SQLitePorter,
    private sqlite: SQLite,
    private http: HttpClient
  ) {
    this.plt.ready().then(() => {
      this.sqlite
        .create({
          name: "medicine.db",
          location: "default"
        })
        .then((db: SQLiteObject) => {
          this.database = db;
          this.seedDatabase();
        });
    });
    console.log("working");
  }

  seedDatabase() {
    this.http
      .get("assets/seed.sql", { responseType: "text" })
      .subscribe(sql => {
        this.sqlitePorter
          .importSqlToDb(this.database, sql)
          .then(_ => {
            this.loadFields();
            this.loadTypes();
            this.loadWords();
            this.dbReady.next(true);
          })
          .catch(e => console.error(e));
      });
  }

  getDatabaseState() {
    return this.dbReady.asObservable();
  }

  getFields(): Observable<Field[]> {
    return this.fields.asObservable();
  }

  getTypes(): Observable<Type[]> {
    return this.types.asObservable();
  }
  getWords(): Observable<Word[]> {
    return this.words.asObservable();
  }

  loadFields() {
    let query = "SELECT * FROM fields";
    return this.database.executeSql(query, []).then(data => {
      let fields = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          fields.push({
            id: data.rows.item(i).id,
            titleLV: data.rows.item(i).titleLV,
            titleENG: data.rows.item(i).titleENG
          });
        }
      }
      this.fields.next(fields);
    });
  }

  getField(id): Promise<Field> {
    return this.database
      .executeSql("SELECT * FROM fields WHERE id = ?", [id])
      .then(data => {
        return {
          id: data.rows.item(0).id,
          titleLV: data.rows.item(0).titleLV,
          titleENG: data.rows.item(0).titleENG
        };
      });
  }

  loadFieldsByWordID(wordID): Observable<Word[]> {
    this.database
      .executeSql(
        "SELECT *  FROM fields INNER JOIN words_field_relationship ON words_field_relationship.fieldsID = fields.id WHERE words_field_relationship.wordsID = ?",
        [wordID]
      )
      .then(data => {
        let fields = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            fields.push({
              id: data.rows.item(i).id,
              titleLV: data.rows.item(i).titleLV,
              titleENG: data.rows.item(i).titleENG
            });
          }
        }
        this.fieldsByWordID.next(fields);
      });
    return this.fieldsByWordID.asObservable();
  }

  loadTypes() {
    let query = "SELECT * FROM types";
    return this.database.executeSql(query, []).then(data => {
      let types = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          types.push({
            id: data.rows.item(i).id,
            feature: data.rows.item(i).feature,
            explanation: data.rows.item(i).explanation
          });
        }
      }
      this.types.next(types);
    });
  }

  getType(id): Promise<Type> {
    return this.database
      .executeSql("SELECT * FROM types WHERE id = ?", [id])
      .then(data => {
        return {
          id: data.rows.item(0).id,
          feature: data.rows.item(0).feature,
          explanation: data.rows.item(0).explanation
        };
      });
  }

  loadWordsByFieldID(fieldID): Observable<Word[]> {
    this.database
      .executeSql(
        "SELECT *  FROM words INNER JOIN words_field_relationship ON words_field_relationship.wordsID = words.id WHERE words_field_relationship.fieldsID = ? ORDER BY words.typeID",
        [fieldID]
      )
      .then(data => {
        let words = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            words.push({
              id: data.rows.item(i).id,
              wordLV: data.rows.item(i).wordLV,
              wordENG: data.rows.item(i).wordENG,
              typeID: data.rows.item(i).typeID
            });
          }
        }
        this.wordsByFieldID.next(words);
      });
    return this.wordsByFieldID.asObservable();
  }

  loadWordsByTypeID(typeID){
    this.database
      .executeSql("SELECT * FROM words WHERE words.typeID = ? ", [typeID])
      .then(data => {
        let words = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            words.push({
              id: data.rows.item(i).id,
              wordLV: data.rows.item(i).wordLV,
              wordENG: data.rows.item(i).wordENG,
              typeID: data.rows.item(i).typeID
            });
          }
        }
        this.wordsByTypeID.next(words);
      });
    return this.wordsByTypeID.asObservable();
  }

  loadWords() {
    let query = "SELECT * FROM words ORDER BY words.typeID ";
    return this.database.executeSql(query, []).then(data => {
      let words = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          words.push({
            id: data.rows.item(i).id,
            wordLV: data.rows.item(i).wordLV,
            wordENG: data.rows.item(i).wordENG,
            typeID: data.rows.item(i).typeID
          });
        }
      }
      this.words.next(words);
    });
  }

  getWord(id) {
    return this.database
      .executeSql("SELECT * FROM words WHERE id = ?", [id])
      .then(data => {
        return {
          id: data.rows.item(0).id,
          wordLV: data.rows.item(0).wordLV,
          wordENG: data.rows.item(0).wordENG,
          typeID: data.rows.item(0).typeID
        };
      });
  }


  countdb() {

    this.database
      .executeSql("SELECT COUNT(id) AS result FROM words", [])
      .then(data => {
        let r;
        r = data.rows.item(0).result;
        this.wordsCount.next(r);
      }
      );
      return this.wordsCount.asObservable();
  }
  /*
  getWordsCount(){
    let count;
    count = this.database.executeSql("select count(*) from words", []);
    return count;
  }
  /*
  getWords(): Observable<Word[]> {
    return this.words.asObservable();
  }*/
}
