import { Component, ViewChild } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DatePipe } from '@angular/common';

import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule, MatSelectionList} from '@angular/material/list';

import { WjGridModule } from '@mescius/wijmo.angular2.grid';
import { WjFlexGrid } from '@mescius/wijmo.angular2.grid';
import * as wjcGrid from '@mescius/wijmo.grid';
import * as wjcCore from '@mescius/wijmo';
import { MeisterschaftService } from '../../../../services/meisterschaft.service';
import { SpielergebnisseService } from '../../../../services/spielergebnisse.service';
import { IMeisterschaftenliste } from '../../../../core/interfaces/imeisterschaftenliste';
import { I6TageRennenAusgabe, IBlitztunierAusgabe, IKombimeisterschaftAusgabe, IMeisterschaftAusgabe, INeunerRattenAusgabe, IPokalAusgabe, ISargkegelnAusgabe } from '../../../../core/interfaces/spieleingabe';

@Component({
  selector: 'app-spielergebnisse',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,DatePipe,
    MatCardModule,MatTabsModule,MatButtonModule,MatInputModule,MatSelectModule,MatListModule,

    WjGridModule],
  templateUrl: './spielergebnisse.component.html',
  styleUrl: './spielergebnisse.component.scss'
})
export class SpielergebnisseComponent {
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

  @ViewChild('lstSelectedSpieltage') lstSelectedSpieltage!: MatSelectionList;

  selectedMeisterschaft = new FormControl('');
  formGroupAuswahl: FormGroup;

  lstMeisterschaften:IMeisterschaftenliste[] = [];
  meisterschaftsID:number;
  lstSpieltage:Date[] = [];

  constructor(private meisterschaftService:MeisterschaftService,
    private spielergebnisseService:SpielergebnisseService) {
    wjcCore.setLicenseKey('dd-b-ts19-2,714646719392875#B0MRZI1pjIs9WQisnOiQkIsISP3cHapVVRTJWNw2WNiZla9ZEbURVevE4RyQlRSZjQExmbXdXb0N7Ly5Eb5VWZwcEWNhkZvIFMyE7UrsEewF4Q4IEVCZXOsVjVjVlb734aDFkat3GR9plNqVFbXl5S9JkQyFVZ42kURdGapN4TVN7LhRldCV5V4YTOx2idahWcMhVeaBHZKBFaWdVMFJDRsFnNIlESRNmQPRmNlJDTuFzYw3ESZ9mYvoVNU9Ue5UHaYFEN03ma0R4Z7h5YQp5bzAzKrl4VtRUQiVnb6p6LEVEV5ZmcDRTb8RGRrEzbI96bPNlVChndsV4bJ5WYOJ6Y6AHZiRnQ7VWZJZkdE34RyxGcrBnTB36cK34TYhlUIJmMvVGcro5cOZzZykTQNt6c8lXS6YWMT5mZ7UVePhjNiVFVTNVU0dVcvt4ZxwEbOdUOycmV5I6U0N4SQpnUoZzYkVXYmZDVxh5TiJiOiMlIsICM5Q4Q9gTRiojIIJCL4EzMycjM4UjN0IicfJye#4Xfd5nIJBjMSJiOiMkIsIibvl6cuVGd8VEIgQXZlh6U8VGbGBybtpWaXJiOi8kI1xSfiUTSOFlI0IyQiwiIu3Waz9WZ4hXRgAicldXZpZFdy3GclJFIv5mapdlI0IiTisHL3JyS7gDSiojIDJCLi86bpNnblRHeFBCI73mUpRHb55EIv5mapdlI0IiTisHL3JCNGZDRiojIDJCLi86bpNnblRHeFBCIQFETPBCIv5mapdlI0IiTisHL3JyMDBjQiojIDJCLiUmcvNEIv5mapdlI0IiTisHL3JSV8cTQiojIDJCLi86bpNnblRHeFBCI4JXYoNEbhl6YuFmbpZEIv5mapdlI0IiTis7W0ICZyBlIsIyM5cDN5ADIxADOwQjMwIjI0ICdyNkIsIiMtkTMzRXLi5CZkJiOiMXbEJCLikmbhJXahREIuFmcpRkI0ISYONkIsISN7gjM9MTOxcjN4YDNxcjI0ICZJJCL355W0IyZsZmIsIiM6NjMwIjI0IiclZnIsU6csFmZII9c');

    this.formGroupAuswahl = new FormGroup({
      ctlMeisterschaft: this.selectedMeisterschaft
    });

    this.fgDataAusgabe9erRatten = [];
    this.fgDataAusgabe6TageRennen = [];
    this.fgDataAusgabePokal = [];
    this.fgDataAusgabeKombimeisterschaft = [];
    this.fgDataAusgabeSargkegeln = [];
    this.fgDataAusgabeMeisterschaft = [];
    this.fgDataAusgabeBlitztunier = [];

    this.lstMeisterschaften = meisterschaftService.GetMeisterschaftsliste();
    //console.table(this.lstMeisterschaften);
    this.meisterschaftsID = -1;
    this.lstSpieltage = spielergebnisseService.GetSpieltage(this.meisterschaftsID);
  }
  
  meisterschaftSelected = () => {
    //console.log(this.selectedMeisterschaft.value);
    this.lstSpieltage = this.spielergebnisseService.GetSpieltage(Number(this.selectedMeisterschaft.value));
  }

  aktualisierenClick = () => {
    //console.log(this.lstSelectedSpieltage.selectedOptions.selected.map(o => o.value));
    console.log(this.lstSelectedSpieltage.options.filter(f => f.selected).map(m => m.value))
  }

  allDaysSelectedClick = () => {
    this.lstSelectedSpieltage.selectAll();
  }

  noDaySelectedClick = () => {
    this.lstSelectedSpieltage.deselectAll();
  }

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
