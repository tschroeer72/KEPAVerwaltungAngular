import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpielergebnisseService {

  constructor() { }

  GetSpieltage(meisterschaftsID:number):Date[]{
    let lstSpieltage:Date[] = [];
    console.log('ID = ' + meisterschaftsID);

    if(meisterschaftsID > -1){
      lstSpieltage.push(new Date('2024-01-03'));
      lstSpieltage.push(new Date('2024-01-17'));
      lstSpieltage.push(new Date('2024-01-31'));
      lstSpieltage.push(new Date('2024-02-05'));
      lstSpieltage.push(new Date('2024-02-14'));
      lstSpieltage.push(new Date('2024-03-09'));
    }

    return lstSpieltage;
  }
}
