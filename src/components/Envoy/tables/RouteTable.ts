import { SummaryTable, SummaryTableRenderer } from './BaseTable';
import { ICell, ISortBy, sortable } from '@patternfly/react-table';
import { RouteSummary } from '../../../types/IstioObjects';
import { FILTER_ACTION_APPEND, FilterType, FilterTypes } from '../../../types/Filters';

export class RouteTable implements SummaryTable {
  summaries: RouteSummary[];
  sortingIndex: number;
  sortingDirection: 'asc' | 'desc';

  constructor(summaries: RouteSummary[], sortBy: ISortBy) {
    this.summaries = summaries;
    this.sortingIndex = sortBy.index || 0;
    this.sortingDirection = sortBy.direction || 'asc';
  }

  sortBy = (): ISortBy => {
    return {
      index: this.sortingIndex,
      direction: this.sortingDirection
    };
  };

  setSorting = (columnIndex: number, direction: 'asc' | 'desc') => {
    this.sortingDirection = direction;
    this.sortingIndex = columnIndex;
  };

  head(): ICell[] {
    return [
      { title: 'Name', transforms: [sortable] },
      { title: 'Domains', transforms: [sortable] },
      { title: 'Match', transforms: [sortable] },
      { title: 'Virtual Service', transforms: [sortable] }
    ];
  }

  availableFilters = (): FilterType[] => {
    return [
      {
        id: 'name',
        title: 'Name',
        placeholder: 'Name',
        filterType: FilterTypes.text,
        action: FILTER_ACTION_APPEND,
        filterValues: []
      }
    ];
  };

  rows(): string[][] {
    return this.summaries
      .map((summary: RouteSummary) => {
        return [summary.name, summary.domains, summary.match, summary.virtual_service];
      })
      .sort((a: string[], b: string[]) => {
        if (this.sortingDirection === 'asc') {
          return a[this.sortingIndex] < b[this.sortingIndex] ? -1 : a[this.sortingIndex] > b[this.sortingIndex] ? 1 : 0;
        } else {
          return a[this.sortingIndex] > b[this.sortingIndex] ? -1 : a[this.sortingIndex] < b[this.sortingIndex] ? 1 : 0;
        }
      });
  }
}

export const RouteSummaryTable = SummaryTableRenderer<RouteTable>();