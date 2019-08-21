import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public items: any = [];

  constructor() { 
    this.items = [
      { titleLV: "viens", titleENG: 'one' },
      { titleLV: "divi", titleENG: 'two' },
      { titleLV: "trīs", titleENG: 'three' },
    ];
  }

  filterItems(items: any[],searchTerm, isLatvian) {
    return items.filter(item => {
      if(isLatvian){
        return item.titleLV.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
      }
      else{
        return item.titleENG.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
      } 
    });
  }


}
