import { Injectable } from '@angular/core';
import { IMeisterschaftenliste, IMeisterschaftstyp } from '../core/interfaces/imeisterschaftenliste';

// const Liste:IMeisterschaftenliste[] = [
//   {
//     ID: 1,
//     Bezeichnung: 'Testmeisterschaft 1',
//     Beginn: new Date(2023, 0, 1),
//     Ende: new Date(2023, 11, 31),
//     MeisterschaftstypID: 1,
//     Meisterschaftstyp: 'Meisterschaft',
//     Aktiv: 0
//   },
//   {
//     ID: 2,
//     Bezeichnung: 'Jahreswechseltunier',
//     Beginn: new Date(2024, 0, 3),
//     Ende: new Date(2024, 0, 3),
//     MeisterschaftstypID: 2,
//     Meisterschaftstyp: 'Blitztunier',
//     Aktiv: 0
//   },
//   {
//     ID: 4,
//     Bezeichnung: 'Testmeisterschaft 2',
//     Beginn: new Date(2024, 0, 1),
//     Ende: new Date(2024, 11, 31),
//     MeisterschaftstypID: 3,
//     Meisterschaftstyp: 'Kombimeisterschaft',
//     Aktiv: 1
//   }
// ]

@Injectable({
  providedIn: 'root'
})
export class MeisterschaftService {
  lstMeisterschaften:IMeisterschaftenliste[] = [
  {
    ID: 1,
    Bezeichnung: 'Testmeisterschaft 1',
    Beginn: new Date(2023, 0, 1),
    Ende: new Date(2023, 11, 31),
    MeisterschaftstypID: 1,
    Meisterschaftstyp: 'Meisterschaft',
    Aktiv: 0
  },
  {
    ID: 2,
    Bezeichnung: 'Jahreswechseltunier',
    Beginn: new Date(2024, 0, 3),
    Ende: new Date(2024, 0, 3),
    MeisterschaftstypID: 2,
    Meisterschaftstyp: 'Blitztunier',
    Aktiv: 0
  },
  {
    ID: 3,
    Bezeichnung: 'Testmeisterschaft 2',
    Beginn: new Date(2024, 0, 1),
    Ende: new Date(2024, 11, 31),
    MeisterschaftstypID: 3,
    Meisterschaftstyp: 'Kombimeisterschaft',
    Aktiv: 1
  }];

  lstTypen:IMeisterschaftstyp[] = [
    {
      ID: 1,
      Meisterschaftstyp: 'Meisterschaft'
    },
    {
      ID: 2,
      Meisterschaftstyp: 'Blitztunier'
    },
    {
      ID: 3,
      Meisterschaftstyp: 'Kombimeisterschaft'
    }
  ];

  constructor() { }

  public GetMeisterschaftsliste():IMeisterschaftenliste[]{
    return this.lstMeisterschaften;
  }

  public GetMeisterschaftstypen():IMeisterschaftstyp[]{
    return this.lstTypen;
  }
}
