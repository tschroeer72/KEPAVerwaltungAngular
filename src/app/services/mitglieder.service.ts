import { Injectable } from '@angular/core';
import { ITVData, DynamicFlatNode } from '../core/interfaces/tvdata';
import {CollectionViewer, SelectionChange, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {FlatTreeControl} from '@angular/cdk/tree';
import { IMitglieder } from '../core/interfaces/imitglieder';

@Injectable({
  providedIn: 'root'
})
export class MitgliederService {
  treeControl: FlatTreeControl<DynamicFlatNode>;
  dataSource: DynamicDataSource;
  getLevel = (node: DynamicFlatNode) => node.level;
  isExpandable = (node: DynamicFlatNode) => node.expandable;
  hasChild = (_: number, _nodeData: DynamicFlatNode) => _nodeData.expandable;

  constructor(database: DynamicDatabase) {
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new DynamicDataSource(this.treeControl, database);
    this.dataSource.data = database.initialData();
   }

   public GetAktiveMitglieder():IMitglieder[]{
    let lstMitglieder:IMitglieder[] = [];

    lstMitglieder.push({
      ID: 1,
      Vorname: 'Reinhard',
      Nachname: 'Albrecht',
      Display: 'Albrecht, Reinhard',
      Spitzname: 'Hase'
    });

    lstMitglieder.push({
      ID: 2,
      Vorname: 'Jürgen',
      Nachname: 'Roßmann',
      Display: 'Roßmann, Jürgen',
      Spitzname: ''
    });

    lstMitglieder.push({
      ID: 3,
      Vorname: 'Rainer',
      Nachname: 'Schmidt',
      Display: 'Schmidt, Rainer',
      Spitzname: ''
    });
    
    lstMitglieder.push({
      ID: 4,
      Vorname: 'Wolfgang',
      Nachname: 'Schmidt',
      Display: 'Schmidt, Wolfgang',
      Spitzname: 'Wolle'
    });
    
    lstMitglieder.push({
      ID: 5,
      Vorname: 'Thorsten',
      Nachname: 'Schröer',
      Display: 'Schröer, Thorsten',
      Spitzname: 'Thor'
    });
    return lstMitglieder;
  }
}


/**
 * Database for dynamic data. When expanding a node in the tree, the data source will need to fetch
 * the descendants data from the database.
 */
@Injectable({providedIn: 'root'})
export class DynamicDatabase {
  rootLevelNodes: ITVData[] = [
    { ID: 1,
      Vorname: '',
      Nachname: '',
      Display: 'A (1)'
    },
    {
      ID: 2,
      Vorname: '',
      Nachname: '',
      Display: 'R (1)'
    },
    { 
      ID: 3,
      Vorname: '',
      Nachname: '',
      Display: 'S (3)'
    }];
  
  dataMap = new Map<ITVData, ITVData[]>([
    [this.rootLevelNodes[0], [
      {
        ID: 4,
        Vorname: 'Reinhard',
        Nachname: 'Albrecht',
        Display: 'Albrecht, Reinhard'
      }]],
    [this.rootLevelNodes[1], [
      {
        ID: 5,
        Vorname: 'Jürgen',
        Nachname: 'Roßmann',
        Display: 'Roßmann, Jürgen'
      }]],
    [this.rootLevelNodes[2], [
      {
        ID: 6,
        Vorname: 'Rainer',
        Nachname: 'Schmidt',
        Display: 'Schmidt, Rainer'
      },
      {
        ID: 7,
        Vorname: 'Wolfgang',
        Nachname: 'Schmidt',
        Display: 'Schmidt, Wolfgang'
      },
      { 
        ID: 8,
        Vorname: 'Thorsten',
        Nachname: 'Schröer',
        Display: 'Schröer, Thorsten',
        Notizen: 'Testnotiz',
        Bemerkungen: 'Testbemerkung'
      }]],
  ]);

  /** Initial data from database */
  initialData(): DynamicFlatNode[] {
    return this.rootLevelNodes.map(name => new DynamicFlatNode(name, 0, true));
  }

  getChildren(node: ITVData): ITVData[] | undefined {
    return this.dataMap.get(node);
  }

  isExpandable(node: ITVData): boolean {
    return this.dataMap.has(node);
  }
}

/**
 * File database, it can build a tree structured Json object from string.
 * Each node in Json object represents a file or a directory. For a file, it has filename and type.
 * For a directory, it has filename and children (a list of files or directories).
 * The input will be a json object string, and the output is a list of `FileNode` with nested
 * structure.
 */
export class DynamicDataSource implements DataSource<DynamicFlatNode> {
  dataChange = new BehaviorSubject<DynamicFlatNode[]>([]);

  get data(): DynamicFlatNode[] {
    return this.dataChange.value;
  }
  set data(value: DynamicFlatNode[]) {
    this._treeControl.dataNodes = value;
    this.dataChange.next(value);
  }

  constructor(
    private _treeControl: FlatTreeControl<DynamicFlatNode>,
    private _database: DynamicDatabase,
  ) {}

  connect(collectionViewer: CollectionViewer): Observable<DynamicFlatNode[]> {
    this._treeControl.expansionModel.changed.subscribe(change => {
      if (
        (change as SelectionChange<DynamicFlatNode>).added ||
        (change as SelectionChange<DynamicFlatNode>).removed
      ) {
        this.handleTreeControl(change as SelectionChange<DynamicFlatNode>);
      }
    });

    return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data));
  }

  disconnect(collectionViewer: CollectionViewer): void {}

  /** Handle expand/collapse behaviors */
  handleTreeControl(change: SelectionChange<DynamicFlatNode>) {
    if (change.added) {
      change.added.forEach(node => this.toggleNode(node, true));
    }
    if (change.removed) {
      change.removed
        .slice()
        .reverse()
        .forEach(node => this.toggleNode(node, false));
    }
  }

  /**
   * Toggle the node, remove from display list
   */
  toggleNode(node: DynamicFlatNode, expand: boolean) {
    const children = this._database.getChildren(node.item);
    const index = this.data.indexOf(node);
    if (!children || index < 0) {
      // If no children, or cannot find the node, no op
      return;
    }

    node.isLoading = true;

    setTimeout(() => {
      if (expand) {
        const nodes = children.map(
          name => new DynamicFlatNode(name, node.level + 1, this._database.isExpandable(name)),
        );
        this.data.splice(index + 1, 0, ...nodes);
      } else {
        let count = 0;
        for (
          let i = index + 1;
          i < this.data.length && this.data[i].level > node.level;
          i++, count++
        ) {}
        this.data.splice(index + 1, count);
      }

      // notify the change
      this.dataChange.next(this.data);
      node.isLoading = false;
    }, 1000);
  }
}