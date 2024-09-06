import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicFlatNode } from '../../../../core/interfaces/tvdata';
import { FlatTreeControl } from '@angular/cdk/tree';
import { DynamicDataSource, MitgliederService } from '../../../../services/mitglieder.service';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTreeModule} from '@angular/material/tree';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'app-mitgliederverwaltung',
  standalone: true,
  imports: [MatTreeModule, MatButtonModule, MatIconModule, MatProgressBarModule, MatCardModule, MatFormFieldModule, MatInputModule, 
    FormsModule, ReactiveFormsModule, MatTabsModule],
  templateUrl: './mitgliederverwaltung.component.html',
  styleUrl: './mitgliederverwaltung.component.scss'
})
export class MitgliederverwaltungComponent {
  mitgliederPersoenlichesForm: FormGroup;
  mitgliederNotizenForm: FormGroup;
  treeControl: FlatTreeControl<DynamicFlatNode>;
  dataSource: DynamicDataSource;
  hasChild = (_: number, _nodeData: DynamicFlatNode) => _nodeData.expandable;
  isExpandable = (node: DynamicFlatNode) => node.expandable;
  
  constructor(private mitgliederService: MitgliederService){
    this.mitgliederPersoenlichesForm = new FormGroup({
      ID: new FormControl({value: '', disabled: true}),
      Vorname: new FormControl('', [Validators.required]),
      Nachname: new FormControl('', [Validators.required]),
      Display: new FormControl('')
    });

    this.mitgliederNotizenForm = new FormGroup({
      Notizen: new FormControl(''),
      Bemerkungen: new FormControl('')
    });

    // this.mitgliederPersoenlichesForm.disable();
    // this.mitgliederNotizenForm.disable();

    this.mitgliederPersoenlichesForm.controls['ID'].disable();
    this.mitgliederPersoenlichesForm.controls['Vorname'].disable();
    this.mitgliederPersoenlichesForm.controls['Nachname'].disable();
    this.mitgliederPersoenlichesForm.controls['Display'].disable();

    this.mitgliederNotizenForm.controls['Notizen'].disable();
    this.mitgliederNotizenForm.controls['Bemerkungen'].disable();

    this.treeControl = mitgliederService.treeControl;
    this.dataSource = mitgliederService.dataSource;
  }

  tvShowSelectedNode(node:DynamicFlatNode){
    console.log(node.item)
    this.mitgliederPersoenlichesForm.patchValue(node.item);
    this.mitgliederNotizenForm.patchValue(node.item);

    //this.mitgliederPersoenlichesForm.enable();
  }
}
