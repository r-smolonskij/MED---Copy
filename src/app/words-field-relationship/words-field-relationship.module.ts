import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class WordsFieldRelationshipModule { 
  constructor(
    public id: number,
    public wordID: string,
    public fieldID: string,
   ) {}
}
