import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { MAT_DATE_LOCALE, provideNativeDateAdapter} from '@angular/material/core';

import { WjGridModule, WjFlexGrid } from '@mescius/wijmo.angular2.grid';
import * as wjcGrid from '@mescius/wijmo.grid';
import * as wjcCore from '@mescius/wijmo';
import { HinRueckrunde } from '../../../../core/enums/hinrueckrunde';
import { I6TageRennenAusgabe, I6TageRennenEingabe, IBlitztunierAusgabe, IBlitztunierEingabe, IKombimeisterschaftAusgabe, IKombimeisterschaftEingabe, IMeisterschaftAusgabe, IMeisterschaftEingabe, INeunerRattenAusgabe, INeunerRattenEingabe, IPokalAusgabe, IPokalEingabe, ISargkegelnAusgabe, ISargkegelnEingabe } from '../../../../core/interfaces/spieleingabe';
import { IMitglieder } from '../../../../core/interfaces/imitglieder';
import { MitgliederService } from '../../../../services/mitglieder.service';
import { SpieleingabeService } from '../../../../services/spieleingabe.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-spieleingabe',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,
    MatCardModule,MatTabsModule,MatStepperModule,MatButtonModule,MatDatepickerModule,MatFormFieldModule,MatInputModule,MatSelectModule,

    WjGridModule],
  templateUrl: './spieleingabe.component.html',
  styleUrl: './spieleingabe.component.scss',
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
    // {
    //   provide: NG_VALUE_ACCESSOR,
    //   useExisting: forwardRef(() => MyInputField),
    //   multi: true,
    // },
    provideNativeDateAdapter(),
    {provide: MAT_DATE_LOCALE, useValue: 'de-DE'},
  ],
changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpieleingabeComponent {  
  fgDataAktiveMitglieder: IMitglieder[];
  @ViewChild('fgAktiveMitglieder') fgAktiveMitglieder!: WjFlexGrid;

  fgDataEingabe:any[];
  @ViewChild('fgEingabe') fgEingabe!: WjFlexGrid;
  rowID: number;

  fgDataAusgabe9erRatten:INeunerRattenAusgabe[];
  @ViewChild('fgAusgabe9erRatten') fgAusgabe9erRatten!: WjFlexGrid;

  fgDataAusgabe6TageRennen:I6TageRennenAusgabe[];
  @ViewChild('fgAusgabe6TageRennen') fgAusgabe6TageRennen!: WjFlexGrid;

  fgDataAusgabePokal:IPokalAusgabe[];
  @ViewChild('fgAusgabePokal') fgAusgabePokal!: WjFlexGrid;

  fgDataAusgabeKombimeisterschaft:IKombimeisterschaftAusgabe[];
  @ViewChild('fgAusgabeKombimeisterschaft') fgAusgabeKombimeisterschaft!: WjFlexGrid;

  fgDataAusgabeSargkegeln:ISargkegelnAusgabe[];
  @ViewChild('fgAusgabeSargkegeln') fgAusgabeSargkegeln!: WjFlexGrid;

  fgDataAusgabeMeisterschaft:IMeisterschaftAusgabe[];
  @ViewChild('fgAusgabeMeisterschaft') fgAusgabeMeisterschaft!: WjFlexGrid;

  fgDataAusgabeBlitztunier:IBlitztunierAusgabe[];
  @ViewChild('fgAusgabeBlitztunier') fgAusgabeBlitztunier!: WjFlexGrid;

  selectedSpieltag = new FormControl('', [Validators.required]);
  // formGroupSpieltag = this._formBuilder.group({
  //   //ctlSpieltag: ['', Validators.required],
  //   ctlSpieltag: this.selectedSpieltag
  // });
  formGroupSpieltag = new FormGroup({
    ctlSpieltag: this.selectedSpieltag
  });
  selectedSpiel = new FormControl('', [Validators.required]);

  // formGroupEingabe = this._formBuilder.group({
  //   ctlSpielauswahl: this.selectedSpiel
  // });
  formGroupEingabe = new FormGroup({
    ctlSpielauswahl: this.selectedSpiel
  });

  constructor(private spieleingabeService:SpieleingabeService,
                private mitgliederService:MitgliederService
              ) {
    wjcCore.setLicenseKey('dd-b-ts19-2,714646719392875#B0MRZI1pjIs9WQisnOiQkIsISP3cHapVVRTJWNw2WNiZla9ZEbURVevE4RyQlRSZjQExmbXdXb0N7Ly5Eb5VWZwcEWNhkZvIFMyE7UrsEewF4Q4IEVCZXOsVjVjVlb734aDFkat3GR9plNqVFbXl5S9JkQyFVZ42kURdGapN4TVN7LhRldCV5V4YTOx2idahWcMhVeaBHZKBFaWdVMFJDRsFnNIlESRNmQPRmNlJDTuFzYw3ESZ9mYvoVNU9Ue5UHaYFEN03ma0R4Z7h5YQp5bzAzKrl4VtRUQiVnb6p6LEVEV5ZmcDRTb8RGRrEzbI96bPNlVChndsV4bJ5WYOJ6Y6AHZiRnQ7VWZJZkdE34RyxGcrBnTB36cK34TYhlUIJmMvVGcro5cOZzZykTQNt6c8lXS6YWMT5mZ7UVePhjNiVFVTNVU0dVcvt4ZxwEbOdUOycmV5I6U0N4SQpnUoZzYkVXYmZDVxh5TiJiOiMlIsICM5Q4Q9gTRiojIIJCL4EzMycjM4UjN0IicfJye#4Xfd5nIJBjMSJiOiMkIsIibvl6cuVGd8VEIgQXZlh6U8VGbGBybtpWaXJiOi8kI1xSfiUTSOFlI0IyQiwiIu3Waz9WZ4hXRgAicldXZpZFdy3GclJFIv5mapdlI0IiTisHL3JyS7gDSiojIDJCLi86bpNnblRHeFBCI73mUpRHb55EIv5mapdlI0IiTisHL3JCNGZDRiojIDJCLi86bpNnblRHeFBCIQFETPBCIv5mapdlI0IiTisHL3JyMDBjQiojIDJCLiUmcvNEIv5mapdlI0IiTisHL3JSV8cTQiojIDJCLi86bpNnblRHeFBCI4JXYoNEbhl6YuFmbpZEIv5mapdlI0IiTis7W0ICZyBlIsIyM5cDN5ADIxADOwQjMwIjI0ICdyNkIsIiMtkTMzRXLi5CZkJiOiMXbEJCLikmbhJXahREIuFmcpRkI0ISYONkIsISN7gjM9MTOxcjN4YDNxcjI0ICZJJCL355W0IyZsZmIsIiM6NjMwIjI0IiclZnIsU6csFmZII9c');

    this.fgDataAktiveMitglieder = mitgliederService.GetAktiveMitglieder();
    this.fgDataEingabe = [];
    this.rowID = 0;
    //this.fgAktiveMitglieder.allowAddNew = false;
    //this.fgAktiveMitglieder.allowDelete = false;
    //this.fgAktiveMitglieder.isReadOnly = true;

    this.fgDataAusgabe9erRatten = [];
    this.fgDataAusgabe6TageRennen = [];
    this.fgDataAusgabePokal = [];
    this.fgDataAusgabeKombimeisterschaft = [];
    this.fgDataAusgabeSargkegeln = [];
    this.fgDataAusgabeMeisterschaft = [];
    this.fgDataAusgabeBlitztunier = [];
  }

  ngAfterViewInit(){
    this._makeDragSource(this.fgAktiveMitglieder);
    this._makeDropTarget(this.fgAktiveMitglieder);

    this._makeDragSource(this.fgEingabe);
    this._makeDropTarget(this.fgEingabe);
  }
  
  fgEingabeInit9erRatten(){
    this.fgEingabe.columns.clear();

    var colID = new wjcGrid.Column();
    colID.binding = 'ID';
    colID.header = 'ID';
    this.fgEingabe.columns.push(colID);

    var colSpielerID = new wjcGrid.Column();
    colSpielerID.binding = 'SpielerID';
    colSpielerID.header = 'SpielerID';
    this.fgEingabe.columns.push(colSpielerID);

    var colSpieler = new wjcGrid.Column();
    colSpieler.binding = 'SpielerName';
    colSpieler.header = 'SpielerName';
    this.fgEingabe.columns.push(colSpieler);

    var col9er = new wjcGrid.Column();
    col9er.binding = 'Neuner';
    col9er.header = '9er';
    this.fgEingabe.columns.push(col9er);
    
    var colSpieler = new wjcGrid.Column();
    colSpieler.binding = 'Ratten';
    colSpieler.header = 'Ratten';
    this.fgEingabe.columns.push(colSpieler);

    this.fgDataEingabe = this.spieleingabeService.InitFgEingabe9erRatten();
    this.fgEingabe.autoSizeColumns(0, this.fgEingabe.columns.length - 1);
  }

  fgEingabeInit6TageRennen(){
    this.fgEingabe.columns.clear();

    var colID = new wjcGrid.Column();
    colID.binding = 'ID';
    colID.header = 'ID';
    this.fgEingabe.columns.push(colID);

    var colSpieler1ID = new wjcGrid.Column();
    colSpieler1ID.binding = 'Spieler1ID';
    colSpieler1ID.header = 'Spieler1ID';
    this.fgEingabe.columns.push(colSpieler1ID);

    var colSpieler1 = new wjcGrid.Column();
    colSpieler1.binding = 'SpielerName1';
    colSpieler1.header = 'Spieler 1 Name';
    this.fgEingabe.columns.push(colSpieler1);

    var colSpieler2ID = new wjcGrid.Column();
    colSpieler2ID.binding = 'Spieler2ID';
    colSpieler2ID.header = 'Spieler2ID';
    this.fgEingabe.columns.push(colSpieler2ID);

    var colSpieler2 = new wjcGrid.Column();
    colSpieler2.binding = 'SpielerName2';
    colSpieler2.header = 'Spieler 2 Name';
    this.fgEingabe.columns.push(colSpieler2);

    var colRunden = new wjcGrid.Column();
    colRunden.binding = 'Runden';
    colRunden.header = 'Runden';
    this.fgEingabe.columns.push(colRunden);
    
    var colPunkte = new wjcGrid.Column();
    colPunkte.binding = 'Punkte';
    colPunkte.header = 'Punkte';
    this.fgEingabe.columns.push(colPunkte);

    this.fgDataEingabe = this.spieleingabeService.InitFgEingabe6TageRennen();
    this.fgEingabe.autoSizeColumns(0, this.fgEingabe.columns.length - 1);
  }

  fgEingabeInitPokal(){
    this.fgEingabe.columns.clear();

    var colID = new wjcGrid.Column();
    colID.binding = 'ID';
    colID.header = 'ID';
    this.fgEingabe.columns.push(colID);

    var colSpielerID = new wjcGrid.Column();
    colSpielerID.binding = 'SpielerID';
    colSpielerID.header = 'SpielerID';
    this.fgEingabe.columns.push(colSpielerID);

    var colSpieler = new wjcGrid.Column();
    colSpieler.binding = 'SpielerName';
    colSpieler.header = 'SpielerName';
    this.fgEingabe.columns.push(colSpieler);

    var colPlatzierung = new wjcGrid.Column();
    colPlatzierung.binding = 'Platzierung';
    colPlatzierung.header = 'Platzierung';
    this.fgEingabe.columns.push(colPlatzierung);

    this.fgDataEingabe = this.spieleingabeService.InitFgEingabePokal();
    this.fgEingabe.autoSizeColumns(0, this.fgEingabe.columns.length - 1);
  }

  fgEingabeInitKombimeisterschaft(){
    this.fgEingabe.columns.clear();
    
    var colID = new wjcGrid.Column();
    colID.binding = 'ID';
    colID.header = 'ID';
    this.fgEingabe.columns.push(colID);

    var colSpieler1ID = new wjcGrid.Column();
    colSpieler1ID.binding = 'SpielerID1';
    colSpieler1ID.header = 'SpielerID1';
    this.fgEingabe.columns.push(colSpieler1ID);

    var colSpieler1 = new wjcGrid.Column();
    colSpieler1.binding = 'SpielerName1';
    colSpieler1.header = 'SpielerName1';
    this.fgEingabe.columns.push(colSpieler1);

    var colSpieler2ID = new wjcGrid.Column();
    colSpieler2ID.binding = 'SpielerID2';
    colSpieler2ID.header = 'SpielerID2';
    this.fgEingabe.columns.push(colSpieler2ID);

    var colSpieler2 = new wjcGrid.Column();
    colSpieler2.binding = 'SpielerName2';
    colSpieler2.header = 'SpielerName2';
    this.fgEingabe.columns.push(colSpieler2);

    var colSpieler1Punkte3bis8 = new wjcGrid.Column();
    colSpieler1Punkte3bis8.binding = 'Spieler1Punkte3bis8';
    colSpieler1Punkte3bis8.header = 'Spieler1Punkte3bis8';
    this.fgEingabe.columns.push(colSpieler1Punkte3bis8);
    
    var colSpieler1Punkte5Kugeln = new wjcGrid.Column();
    colSpieler1Punkte5Kugeln.binding = 'Spieler1Punkte5Kugeln';
    colSpieler1Punkte5Kugeln.header = 'Spieler1Punkte5Kugeln';
    this.fgEingabe.columns.push(colSpieler1Punkte5Kugeln);

    var colSpieler2Punkte3bis8 = new wjcGrid.Column();
    colSpieler2Punkte3bis8.binding = 'Spieler2Punkte3bis8';
    colSpieler2Punkte3bis8.header = 'Spieler2Punkte3bis8';
    this.fgEingabe.columns.push(colSpieler2Punkte3bis8);
    
    var colSpieler2Punkte5Kugeln = new wjcGrid.Column();
    colSpieler2Punkte5Kugeln.binding = 'Spieler2Punkte5Kugeln';
    colSpieler2Punkte5Kugeln.header = 'Spieler2Punkte5Kugeln';
    this.fgEingabe.columns.push(colSpieler2Punkte5Kugeln);

    var colHinRueckrunde = new wjcGrid.Column();
    colHinRueckrunde.binding = 'HinRueckrunde';
    colHinRueckrunde.header = 'HinRueckrunde';
    this.fgEingabe.columns.push(colHinRueckrunde);

    this.fgDataEingabe = this.spieleingabeService.InitFgEingabeKombimeisterschaft();
    this.fgEingabe.autoSizeColumns(0, this.fgEingabe.columns.length - 1);
  }

  fgEingabeInitSargkegeln(){
    this.fgEingabe.columns.clear();
    
    var colID = new wjcGrid.Column();
    colID.binding = 'ID';
    colID.header = 'ID';
    this.fgEingabe.columns.push(colID);

    var colSpielerID = new wjcGrid.Column();
    colSpielerID.binding = 'SpielerID';
    colSpielerID.header = 'SpielerID';
    this.fgEingabe.columns.push(colSpielerID);

    var colSpieler = new wjcGrid.Column();
    colSpieler.binding = 'SpielerName';
    colSpieler.header = 'SpielerName';
    this.fgEingabe.columns.push(colSpieler);

    var colPlatzierung = new wjcGrid.Column();
    colPlatzierung.binding = 'Platzierung';
    colPlatzierung.header = 'Platzierung';
    this.fgEingabe.columns.push(colPlatzierung);

    this.fgDataEingabe = this.spieleingabeService.InitFgEingabeSargkegeln();
    this.fgEingabe.autoSizeColumns(0, this.fgEingabe.columns.length - 1);
  }

  fgEingabeInitMeisterschaft(){
    this.fgEingabe.columns.clear();
    
    var colID = new wjcGrid.Column();
    colID.binding = 'ID';
    colID.header = 'ID';
    this.fgEingabe.columns.push(colID);

    var colSpieler1ID = new wjcGrid.Column();
    colSpieler1ID.binding = 'SpielerID1';
    colSpieler1ID.header = 'SpielerID1';
    this.fgEingabe.columns.push(colSpieler1ID);

    var colSpieler1 = new wjcGrid.Column();
    colSpieler1.binding = 'SpielerName1';
    colSpieler1.header = 'SpielerName1';
    this.fgEingabe.columns.push(colSpieler1);

    var colSpieler2ID = new wjcGrid.Column();
    colSpieler2ID.binding = 'SpielerID2';
    colSpieler2ID.header = 'SpielerID2';
    this.fgEingabe.columns.push(colSpieler2ID);

    var colSpieler2 = new wjcGrid.Column();
    colSpieler2.binding = 'SpielerName2';
    colSpieler2.header = 'SpielerName2';
    this.fgEingabe.columns.push(colSpieler2);

    var colHolzSpieler1 = new wjcGrid.Column();
    colHolzSpieler1.binding = 'HolzSpieler1';
    colHolzSpieler1.header = 'HolzSpieler1';
    this.fgEingabe.columns.push(colHolzSpieler1);
    
    var colHolzSpieler2 = new wjcGrid.Column();
    colHolzSpieler2.binding = 'HolzSpieler2';
    colHolzSpieler2.header = 'HolzSpieler2';
    this.fgEingabe.columns.push(colHolzSpieler2);

    var colHinRueckrunde = new wjcGrid.Column();
    colHinRueckrunde.binding = 'HinRueckrunde';
    colHinRueckrunde.header = 'HinRueckrunde';
    this.fgEingabe.columns.push(colHinRueckrunde);

    this.fgDataEingabe = this.spieleingabeService.InitFgEingabeMeisterschaft();
    this.fgEingabe.autoSizeColumns(0, this.fgEingabe.columns.length - 1);
  }

  fgEingabeInitBlitztunier(){
    this.fgEingabe.columns.clear();
    
    var colID = new wjcGrid.Column();
    colID.binding = 'ID';
    colID.header = 'ID';
    this.fgEingabe.columns.push(colID);

    var colSpieler1ID = new wjcGrid.Column();
    colSpieler1ID.binding = 'SpielerID1';
    colSpieler1ID.header = 'SpielerID1';
    this.fgEingabe.columns.push(colSpieler1ID);

    var colSpieler1 = new wjcGrid.Column();
    colSpieler1.binding = 'SpielerName1';
    colSpieler1.header = 'SpielerName1';
    this.fgEingabe.columns.push(colSpieler1);

    var colSpieler2ID = new wjcGrid.Column();
    colSpieler2ID.binding = 'SpielerID2';
    colSpieler2ID.header = 'SpielerID2';
    this.fgEingabe.columns.push(colSpieler2ID);

    var colSpieler2 = new wjcGrid.Column();
    colSpieler2.binding = 'SpielerName2';
    colSpieler2.header = 'SpielerName2';
    this.fgEingabe.columns.push(colSpieler2);

    var colPunkteSpieler1 = new wjcGrid.Column();
    colPunkteSpieler1.binding = 'PunkteSpieler1';
    colPunkteSpieler1.header = 'PunkteSpieler1';
    this.fgEingabe.columns.push(colPunkteSpieler1);
    
    var colPunkteSpieler2 = new wjcGrid.Column();
    colPunkteSpieler2.binding = 'PunkteSpieler2';
    colPunkteSpieler2.header = 'PunkteSpieler2';
    this.fgEingabe.columns.push(colPunkteSpieler2);

    var colHinRueckrunde = new wjcGrid.Column();
    colHinRueckrunde.binding = 'HinRueckrunde';
    colHinRueckrunde.header = 'HinRueckrunde';
    this.fgEingabe.columns.push(colHinRueckrunde);

    this.fgDataEingabe = this.spieleingabeService.InitFgEingabeBlitztunier();
    this.fgEingabe.autoSizeColumns(0, this.fgEingabe.columns.length - 1);
  }

  selectedSpielauswahl(){
    console.log(this.selectedSpiel.value);
    switch(this.selectedSpiel.value){
      case '1': {
        console.log('9er/Ratten');
        this.fgEingabeInit9erRatten();
        break;
      }
      case '2': {
        console.log('6-Tage-Rennen');
        this.fgEingabeInit6TageRennen();
        break;
      }
      case '3': {
        console.log('Pokal');
        this.fgEingabeInitPokal();
        break;
      }
      case '4': {
        console.log('Kombimeisterschaft');
        this.fgEingabeInitKombimeisterschaft();
        break;
      }
      case '5': {
        console.log('Sargkegeln');
        this.fgEingabeInitSargkegeln();
        break;
      }
      case '6': {
        console.log('Meisterschaft');
        this.fgEingabeInitMeisterschaft();
        break;
      }
      case '7': {
        console.log('Blitztunier');
        this.fgEingabeInitBlitztunier();
        break;
      }
    }
  }

  updateSelectedSpieltag(value: any){
    //console.log(value);
    this.formGroupSpieltag.get('ctlSpieltag')?.setValue(value);
  }

  private _makeDragSource(s: WjFlexGrid) {
    // make rows draggable
    s.itemFormatter = (panel: wjcGrid.GridPanel, r: number, c: number, cell: HTMLElement) => {
      if (panel.cellType == wjcGrid.CellType.RowHeader) {
          cell.textContent = (r + 1).toString();
          cell.draggable = true;
      }
    };
    // disable built-in row drag/drop
    s.addEventListener(s.hostElement, 'mousedown', (e: MouseEvent) => {
      if (s.hitTest(e).cellType == wjcGrid.CellType.RowHeader) {
          e.stopPropagation();
      };
    }, true);
    // handle drag start
    s.addEventListener(s.hostElement, 'dragstart', (e: DragEvent) => {
      let ht = s.hitTest(e);
      if (ht.cellType == wjcGrid.CellType.RowHeader) {
          s.select(new wjcGrid.CellRange(ht.row, 0, ht.row, s.columns.length - 1));
          if(e.dataTransfer != null) {
            e.dataTransfer.effectAllowed = 'copy';
            e.dataTransfer.setData('text', ht.row.toString());
          }          
      };
    }, true);
  }

  // enable drop operations on an element
  private _makeDropTarget(s: WjFlexGrid) {
    s.addEventListener(s.hostElement, 'dragover', (e: DragEvent) => {
        let dragRow = e.dataTransfer?.getData('text');
        if (dragRow != null) {
          if(e.dataTransfer != null) { 
            e.dataTransfer.dropEffect = 'copy';
            e.preventDefault();
          }
        }
    }, true);
    s?.addEventListener(s.hostElement, 'drop', (e: DragEvent) => {      
      let dragRow = e.dataTransfer?.getData('text');
      if (dragRow != null) {
        //AddTeilnehmer
        if(s === this.fgEingabe){
          const rowIndex:number = parseInt(dragRow);
          //const item:IMitglieder = this.fgAktiveMitglieder.rows[rowIndex].dataItem;
          //alert('thanks for dropping row ' + JSON.stringify(item) + ' here.');
          //console.log('thanks for dropping row ' + JSON.stringify(item) + ' here.');
          this._Addteilnehmer(rowIndex);
          e.preventDefault();
        }

        //DelTeilnehmer
        if(s === this.fgAktiveMitglieder){
          const rowIndex:number = parseInt(dragRow);
          //const item:ITeilnehmer = this.fgTeilnehmer.rows[rowIndex].dataItem;
          //alert('thanks for dropping row ' + JSON.stringify(item) + ' here.');
          //console.log('thanks for dropping row ' + JSON.stringify(item) + ' here.');
          this._DelTeilnehmer(rowIndex);
          e.preventDefault();
        }
      }
    }, true);
  }
  
  private _Addteilnehmer(rowIndex:number){
    // console.log('AddTeilnehmer');
    const item:IMitglieder = this.fgAktiveMitglieder.rows[rowIndex].dataItem;
    // console.log('rowIndex = ' + rowIndex);
    // console.log(item);

    this.rowID++;

    switch(this.selectedSpiel.value){
      //9er/Ratten
      case '1': {
        let nr:INeunerRattenEingabe = {
          ID: this.rowID,
          SpielerID: item.ID,
          SpielerName: item.Display,
          Neuner: 0,
          Ratten: 0
        }
        this.fgDataEingabe.push(nr);
        break;
      }
      //6-Tage-Rennen
      case '2': {
        if(this.fgEingabe.rows.length === 0){
          let rennen:I6TageRennenEingabe = {
            ID: this.rowID,
            Spieler1ID: item.ID,
            SpielerName1: item.Display,
            Spieler2ID: -1,
            SpielerName2: '',
            Runden: 0,
            Punkte: 0
          }
          this.fgDataEingabe.push(rennen);
        }
        else {
          let lastRow:I6TageRennenEingabe = this.fgEingabe.rows[this.fgEingabe.rows.length - 1].dataItem;
          if(lastRow.Spieler2ID === -1) {
            lastRow.Spieler2ID = item.ID;
            lastRow.SpielerName2 = item.Display;
          }
          else {
            let rennen:I6TageRennenEingabe = {
              ID: this.rowID,
              Spieler1ID: item.ID,
              SpielerName1: item.Display,
              Spieler2ID: -1,
              SpielerName2: '',
              Runden: 0,
              Punkte: 0
            }
            this.fgDataEingabe.push(rennen);
          }
        }
        break;
      }
      //Pokal
      case '3': {
        let pokal:IPokalEingabe = {
          ID: this.rowID,
          SpielerID: item.ID,
          SpielerName: item.Display,
          Platzierung: 0
        }
        this.fgDataEingabe.push(pokal);
        break;
      }
      //Kombimeisterschaft
      case '4': {
        if(this.fgEingabe.rows.length === 0){
          let kombi:IKombimeisterschaftEingabe = {
            ID: this.rowID,
            SpielerID1: item.ID,
            SpielerName1: item.Display,
            SpielerID2: -1,
            SpielerName2: '',
            Spieler1Punkte3bis8: 0,
            Spieler1Punkte5Kugeln: 0,
            Spieler2Punkte3bis8: 0,
            Spieler2Punkte5Kugeln: 0,
            HinRueckrunde: HinRueckrunde.Hinrunde
          }
          this.fgDataEingabe.push(kombi);
        }
        else {
          let lastRow:IKombimeisterschaftEingabe = this.fgEingabe.rows[this.fgEingabe.rows.length - 1].dataItem;
          if(lastRow.SpielerID2 === -1) {
            lastRow.SpielerID2 = item.ID;
            lastRow.SpielerName2 = item.Display;
          }
          else {
            let kombi:IKombimeisterschaftEingabe = {
              ID: this.rowID,
              SpielerID1: item.ID,
              SpielerName1: item.Display,
              SpielerID2: -1,
              SpielerName2: '',
              Spieler1Punkte3bis8: 0,
              Spieler1Punkte5Kugeln: 0,
              Spieler2Punkte3bis8: 0,
              Spieler2Punkte5Kugeln: 0,
              HinRueckrunde: HinRueckrunde.Hinrunde
            }
            this.fgDataEingabe.push(kombi);
          }
        }
        break;
      }
      //Sargkegeln
      case '5': {
        let sarg:ISargkegelnEingabe = {
          ID: this.rowID,
          SpielerID: item.ID,
          SpielerName: item.Display,
          Platzierung: 0
        }
        this.fgDataEingabe.push(sarg);
        break;
      }
      //Meisterschaft
      case '6': {
        if(this.fgEingabe.rows.length === 0){
          let meister:IMeisterschaftEingabe = {
            ID: this.rowID,
            SpielerID1: item.ID,
            SpielerName1: item.Display,
            SpielerID2: -1,
            SpielerName2: '',
            HolzSpieler1: 0,
            HolzSpieler2: 0,
            HinRueckrunde: HinRueckrunde.Hinrunde
          }
          this.fgDataEingabe.push(meister);
        }
        else {
          let lastRow:IMeisterschaftEingabe = this.fgEingabe.rows[this.fgEingabe.rows.length - 1].dataItem;
          if(lastRow.SpielerID2 === -1) {
            lastRow.SpielerID2 = item.ID;
            lastRow.SpielerName2 = item.Display;
          }
          else {
            let meister:IMeisterschaftEingabe = {
              ID: this.rowID,
              SpielerID1: item.ID,
              SpielerName1: item.Display,
              SpielerID2: -1,
              SpielerName2: '',
              HolzSpieler1: 0,
              HolzSpieler2: 0,
              HinRueckrunde: HinRueckrunde.Hinrunde
            }
            this.fgDataEingabe.push(meister);
          }
        }
        break;
      }
      //Blitztunier
      case '7': {
        if(this.fgEingabe.rows.length === 0){
          let blitz:IBlitztunierEingabe = {
            ID: this.rowID,
            SpielerID1: item.ID,
            SpielerName1: item.Display,
            SpielerID2: -1,
            SpielerName2: '',
            PunkteSpieler1: 0,
            PunkteSpieler2: 0,
            HinRueckrunde: HinRueckrunde.Hinrunde
          }
          this.fgDataEingabe.push(blitz);
        }
        else {
          let lastRow:IBlitztunierEingabe = this.fgEingabe.rows[this.fgEingabe.rows.length - 1].dataItem;
          if(lastRow.SpielerID2 === -1) {
            lastRow.SpielerID2 = item.ID;
            lastRow.SpielerName2 = item.Display;
          }
          else {
            let blitz:IBlitztunierEingabe = {
              ID: this.rowID,
              SpielerID1: item.ID,
              SpielerName1: item.Display,
              SpielerID2: -1,
              SpielerName2: '',
              PunkteSpieler1: 0,
              PunkteSpieler2: 0,
              HinRueckrunde: HinRueckrunde.Hinrunde
            }
            this.fgDataEingabe.push(blitz);
          }
        }
        break;
      }
    }

    this.fgEingabe.collectionView.refresh();
    this.fgEingabe.autoSizeColumns(0, this.fgEingabe.columns.length - 1);
    
    // console.table(this.fgDataAktiveMitglieder);
    //console.table(this.fgDataEingabe);
  }

  private _DelTeilnehmer(rowIndex:number){
    const item = this.fgEingabe.rows[rowIndex].dataItem;
    this.fgDataEingabe = this.fgDataEingabe.filter(itm => itm !== item);
    this.fgEingabe.collectionView.refresh();
    this.fgEingabe.autoSizeColumns(0, this.fgEingabe.columns.length - 1);
    //console.table(this.fgDataEingabe);
  }

  fgAktiveMitgliederInit = () => {
    this.fgAktiveMitglieder.showSort = true;
    this.fgAktiveMitglieder.autoSizeColumns(0, this.fgAktiveMitglieder.columns.length - 1);
  }

  // fgAktiveMitgliederSelectedRow = () => {
  //   const row:IMitglieder = this.fgAktiveMitglieder.selectedRows[0].dataItem;

  //   //console.log(row);
  // }
  
  fgAusgabe9erRattenInit = () => {
    this.fgAusgabe9erRatten.showSort = true;
    this.fgAusgabe9erRatten.autoSizeColumns(0, this.fgAusgabe9erRatten.columns.length - 1);
  }
  
  fgAusgabe6TageRennenInit = () => {
    this.fgAusgabe6TageRennen.showSort = true;
    this.fgAusgabe6TageRennen.autoSizeColumns(0, this.fgAusgabe6TageRennen.columns.length - 1);
  }
  
  fgAusgabePokalInit = () => {
    this.fgAusgabePokal.showSort = true;
    this.fgAusgabePokal.autoSizeColumns(0, this.fgAusgabePokal.columns.length - 1);
  }
  
  fgAusgabeKombimeisterschaftInit = () => {
    this.fgAusgabeKombimeisterschaft.showSort = true;
    this.fgAusgabeKombimeisterschaft.autoSizeColumns(0, this.fgAusgabeKombimeisterschaft.columns.length - 1);
  }
  
  fgAusgabeSargkegelnInit = () => {
    this.fgAusgabeSargkegeln.showSort = true;
    this.fgAusgabeSargkegeln.autoSizeColumns(0, this.fgAusgabeSargkegeln.columns.length - 1);
  }
  
  fgAusgabeMeisterschaftInit = () => {
    this.fgAusgabeMeisterschaft.showSort = true;
    this.fgAusgabeMeisterschaft.autoSizeColumns(0, this.fgAusgabeMeisterschaft.columns.length - 1);
  }
  
  fgAusgabeBlitztunierInit = () => {
    this.fgAusgabeBlitztunier.showSort = true;
    this.fgAusgabeBlitztunier.autoSizeColumns(0, this.fgAusgabeBlitztunier.columns.length - 1);
  }
}
