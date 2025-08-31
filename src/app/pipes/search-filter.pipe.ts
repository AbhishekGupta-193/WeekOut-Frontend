import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter',
  standalone: true,
  pure: false 
})
export class SearchFilterPipe implements PipeTransform {
transform(items: any[], searchText: string, selectedTypes: string[] | null): any[] {
    if (!items) return [];
    if (!searchText && (!selectedTypes || selectedTypes.length === 0)) {
      return items;
    }

    searchText = searchText?.toLowerCase() || '';

    return items.filter(item => {
      // Search condition (check fields of your plan/spot objects)
      const matchesSearch = !searchText || 
        (item.title?.toLowerCase().includes(searchText)) ||
        (item.type?.toLowerCase().includes(searchText)) ||
        (item.meetupPoint?.toLowerCase().includes(searchText)) ||
        (item.tags?.some((tag: string) => tag.toLowerCase().includes(searchText))) ||
        (item.name?.toLowerCase().includes(searchText));  // for spot-card

      // Filter condition (plan types)
      const matchesFilter = !selectedTypes || selectedTypes.length === 0 || selectedTypes.includes("All Types") ||
        selectedTypes.includes(item.type);

      return matchesSearch && matchesFilter;
    });
  }

}
