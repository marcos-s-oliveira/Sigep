import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface AlunosItem {
  name: string;
  id: number;
  faltas: number;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: AlunosItem[] = [
  {id: 1, name: 'Hydrogen tsfs', faltas: 0},
  {id: 2, name: 'Helium sdflksndfçld', faltas: 0},
  {id: 3, name: 'Lithium çkdjsgnçk', faltas: 0},
  {id: 4, name: 'Beryllium sdfojndsfn', faltas: 10},
  {id: 5, name: 'Boron lksdkfjdjd', faltas: 0},
  {id: 6, name: 'Carbon', faltas: 5},
  {id: 7, name: 'Nitrogen', faltas: 0},
  {id: 8, name: 'Oxygen', faltas: 0},
  {id: 9, name: 'Fluorine', faltas: 0},
  {id: 10, name: 'Neon', faltas: 0},
  {id: 11, name: 'Sodium', faltas: 0},
  {id: 12, name: 'Magnesium', faltas: 0},
  {id: 13, name: 'Aluminum', faltas: 2},
  {id: 14, name: 'Silicon', faltas: 0},
  {id: 15, name: 'Phosphorus', faltas: 0},
  {id: 16, name: 'Sulfur', faltas: 0},
  {id: 17, name: 'Chlorine', faltas: 0},
  {id: 18, name: 'Argon', faltas: 0},
  {id: 19, name: 'Potassium', faltas: 1},
  {id: 20, name: 'Calcium', faltas: 0},
];

/**
 * Data source for the Alunos view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class AlunosDataSource extends DataSource<AlunosItem> {
  data: AlunosItem[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<AlunosItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: AlunosItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: AlunosItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'faltas': return compare(+a.faltas, +b.faltas, isAsc);
        default: return 0;
      }
    });
  }

}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
