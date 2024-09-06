import { Component, ViewChild } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {provideNativeDateAdapter, MAT_DATE_LOCALE} from '@angular/material/core';

import { WjGridModule, WjFlexGrid } from '@mescius/wijmo.angular2.grid';
import * as wjcGrid from '@mescius/wijmo.grid';
import * as wjcCore from '@mescius/wijmo';

import { IMeisterschaftenliste, IMeisterschaftstyp } from '../../../../core/interfaces/imeisterschaftenliste';
import { IMitglieder } from '../../../../core/interfaces/imitglieder';
import { ITeilnehmer } from '../../../../core/interfaces/iteilnehmer';
import { MeisterschaftService } from '../../../../services/meisterschaft.service';
import { MitgliederService } from '../../../../services/mitglieder.service';

@Component({
  selector: 'app-meisterschaftsverwaltung',
  standalone: true,
  imports: [CommonModule, DatePipe,
    FormsModule, ReactiveFormsModule,MatTableModule,MatCardModule,MatGridListModule,MatTabsModule,MatIconModule,MatButtonModule,MatFormFieldModule,
    MatInputModule,MatDatepickerModule,MatSelectModule,MatCheckboxModule,

    WjGridModule],
  templateUrl: './meisterschaftsverwaltung.component.html',
  styleUrl: './meisterschaftsverwaltung.component.scss',
  providers: [provideNativeDateAdapter(), { provide: MAT_DATE_LOCALE, useValue: 'de-DE' }]
})
export class MeisterschaftsverwaltungComponent {
  meisterschaftdetailsForm: FormGroup;
  typControl = new FormControl('', [Validators.required]);
  meisterschaftstypen: IMeisterschaftstyp[];
  fgDataMeisterschaften: IMeisterschaftenliste[];
  fgDataAktiveMitglieder: IMitglieder[];
  fgDataTeilnemer: ITeilnehmer[];
  @ViewChild('fgMeisterschaften') fgMeisterschaften!: WjFlexGrid;
  @ViewChild('fgAktiveMitglieder') fgAktiveMitglieder!: WjFlexGrid;
  @ViewChild('fgTeilnehmer') fgTeilnehmer!: WjFlexGrid;
  teilnehmerID:number;

  constructor(private meisterschaftsService: MeisterschaftService,
    private mitgliederService:MitgliederService){
    wjcCore.setLicenseKey('dd-b-ts19-2,714646719392875#B0MRZI1pjIs9WQisnOiQkIsISP3cHapVVRTJWNw2WNiZla9ZEbURVevE4RyQlRSZjQExmbXdXb0N7Ly5Eb5VWZwcEWNhkZvIFMyE7UrsEewF4Q4IEVCZXOsVjVjVlb734aDFkat3GR9plNqVFbXl5S9JkQyFVZ42kURdGapN4TVN7LhRldCV5V4YTOx2idahWcMhVeaBHZKBFaWdVMFJDRsFnNIlESRNmQPRmNlJDTuFzYw3ESZ9mYvoVNU9Ue5UHaYFEN03ma0R4Z7h5YQp5bzAzKrl4VtRUQiVnb6p6LEVEV5ZmcDRTb8RGRrEzbI96bPNlVChndsV4bJ5WYOJ6Y6AHZiRnQ7VWZJZkdE34RyxGcrBnTB36cK34TYhlUIJmMvVGcro5cOZzZykTQNt6c8lXS6YWMT5mZ7UVePhjNiVFVTNVU0dVcvt4ZxwEbOdUOycmV5I6U0N4SQpnUoZzYkVXYmZDVxh5TiJiOiMlIsICM5Q4Q9gTRiojIIJCL4EzMycjM4UjN0IicfJye#4Xfd5nIJBjMSJiOiMkIsIibvl6cuVGd8VEIgQXZlh6U8VGbGBybtpWaXJiOi8kI1xSfiUTSOFlI0IyQiwiIu3Waz9WZ4hXRgAicldXZpZFdy3GclJFIv5mapdlI0IiTisHL3JyS7gDSiojIDJCLi86bpNnblRHeFBCI73mUpRHb55EIv5mapdlI0IiTisHL3JCNGZDRiojIDJCLi86bpNnblRHeFBCIQFETPBCIv5mapdlI0IiTisHL3JyMDBjQiojIDJCLiUmcvNEIv5mapdlI0IiTisHL3JSV8cTQiojIDJCLi86bpNnblRHeFBCI4JXYoNEbhl6YuFmbpZEIv5mapdlI0IiTis7W0ICZyBlIsIyM5cDN5ADIxADOwQjMwIjI0ICdyNkIsIiMtkTMzRXLi5CZkJiOiMXbEJCLikmbhJXahREIuFmcpRkI0ISYONkIsISN7gjM9MTOxcjN4YDNxcjI0ICZJJCL355W0IyZsZmIsIiM6NjMwIjI0IiclZnIsU6csFmZII9c');
    this.fgDataMeisterschaften = meisterschaftsService.GetMeisterschaftsliste();
    this.fgDataAktiveMitglieder = mitgliederService.GetAktiveMitglieder();
    this.fgDataTeilnemer = [];
    this.meisterschaftstypen = meisterschaftsService.GetMeisterschaftstypen();

    this.meisterschaftdetailsForm = new FormGroup({
      ID: new FormControl({value: '', disabled: true}),
      Bezeichnung: new FormControl('', [Validators.required]),
      Beginn: new FormControl('', [Validators.required]),
      Ende: new FormControl(''),
      // MeisterschaftstypID: new FormControl('', [Validators.required]),
      MeisterschaftstypID: this.typControl,
      Aktiv: new FormControl()
    });

    this.meisterschaftdetailsForm.controls['ID'].disable();
    this.meisterschaftdetailsForm.controls['Bezeichnung'].disable();
    this.meisterschaftdetailsForm.controls['Beginn'].disable();
    this.meisterschaftdetailsForm.controls['Ende'].disable();
    this.meisterschaftdetailsForm.controls['MeisterschaftstypID'].disable();
    this.meisterschaftdetailsForm.controls['Aktiv'].disable();

    this.teilnehmerID = 0;

  // this.fgMeisterschaften.isReadOnly = true;
  // this.fgAktiveMitglieder.isReadOnly = true;
  // this.fgTeilnehmer.isReadOnly = true;
  }

  ngAfterViewInit(){
    this._makeDragSource(this.fgAktiveMitglieder);
    this._makeDragSource(this.fgTeilnehmer);

    this._makeDropTarget(this.fgAktiveMitglieder);
    this._makeDropTarget(this.fgTeilnehmer);
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
          e.dataTransfer.effectAllowed = 'move';
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
          e.dataTransfer.dropEffect = 'move';
          e.preventDefault();
        }
      }
    }, true);
    s?.addEventListener(s.hostElement, 'drop', (e: DragEvent) => {      
      let dragRow = e.dataTransfer?.getData('text');
      if (dragRow != null) {
        //AddTeilnehmer
        if(s === this.fgTeilnehmer){
          const rowIndex:number = parseInt(dragRow);
          const item:IMitglieder = this.fgAktiveMitglieder.rows[rowIndex].dataItem;
          //alert('thanks for dropping row ' + JSON.stringify(item) + ' here.');
          //console.log('thanks for dropping row ' + JSON.stringify(item) + ' here.');
          this._Addteilnehmer(rowIndex);
          e.preventDefault();
        }

        //DelTeilnehmer
        if(s === this.fgAktiveMitglieder){
          const rowIndex:number = parseInt(dragRow);
          const item:ITeilnehmer = this.fgTeilnehmer.rows[rowIndex].dataItem;
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

    //this.fgDataAktiveMitglieder.slice(rowIndex, 1);
    this.fgDataAktiveMitglieder = this.fgDataAktiveMitglieder.filter(itm => itm !== item);
    this.teilnehmerID++;

    let addTeilnehmer:ITeilnehmer = {
      ID: this.teilnehmerID,
      MitgliederID: item.ID,
      MeisterschaftsID: 1,
      Vorname: item.Vorname,
      Nachname: item.Nachname,
      Spitzname: item.Spitzname,
      Display: item.Display
    }

    this.fgDataTeilnemer.push(addTeilnehmer);
    this.fgAktiveMitglieder.collectionView.refresh();
    this.fgTeilnehmer.collectionView.refresh();

    // console.table(this.fgDataAktiveMitglieder);
    // console.table(this.fgDataTeilnemer);
  }

  private _DelTeilnehmer(rowIndex:number){
    // console.log('DelTeilnehmer');
    const item:ITeilnehmer = this.fgTeilnehmer.rows[rowIndex].dataItem;
    // console.log('rowIndex = ' + rowIndex);
    // console.log(item);

    //this.fgDataTeilnemer.slice(rowIndex, 1);
    this.fgDataTeilnemer = this.fgDataTeilnemer.filter(itm => itm !== item);
    let delTeilnehmer:IMitglieder = {
    ID: item.ID,
    Vorname: item.Vorname,
    Nachname: item.Nachname,
    Spitzname: item.Spitzname,
    Display: item.Display
    }

    this.fgDataAktiveMitglieder.push(delTeilnehmer);
    this.fgAktiveMitglieder.collectionView.refresh();
    this.fgTeilnehmer.collectionView.refresh();

    // console.table(this.fgDataAktiveMitglieder);
    // console.table(this.fgDataTeilnemer);
  }

  fgMeisterschaftenInit = () => {
    //console.log(this.fgMeisterschaften);
    this.fgMeisterschaften.showSort = true;
    this.fgMeisterschaften.autoSizeColumns(0, this.fgMeisterschaften.columns.length - 1);
    //this.fgMeisterschaften.columns[1].align = 'left';
  }

  fgMeisterschaftenSelectedRow = () => {
    if(this.fgMeisterschaften.selectedRows.length > 0){
      const row:IMeisterschaftenliste = this.fgMeisterschaften.selectedRows[0].dataItem;

      //console.log(row);
      this.meisterschaftdetailsForm.patchValue(row);
    }
  }

  fgAktiveMitgliederInit = () => {
    this.fgAktiveMitglieder.autoSizeColumns(0, this.fgAktiveMitglieder.columns.length - 1);
  }

  fgAktiveMitgliederSelectedRow = () => {
    if(this.fgAktiveMitglieder.selectedRows.length > 0){
      const row:IMitglieder = this.fgAktiveMitglieder.selectedRows[0].dataItem;
      //console.log(row);
    }
  }

  fgTeilnehmerInit = () => {
    this.fgTeilnehmer.autoSizeColumns(0, this.fgTeilnehmer.columns.length - 1);
  }

  fgTeilnehmerSelectedRow = () => {
    if(this.fgTeilnehmer?.selectedRows.length > 0){
    const row:ITeilnehmer = this.fgTeilnehmer?.selectedRows[0].dataItem;
    //console.log(row);
    }
  }
}
