import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlightSearch'
})
export class HighlightSearchPipe implements PipeTransform {

  transform(value: string, search: string): string {
    if(value == "" || value.length == 0) value = "---";
    const valueStr = value + ''; // Ensure numeric values are converted to strings;
    return valueStr.replace(new RegExp('(?![^&;]+;)(?!<[^<>]*)(' + search + ')(?![^<>]*>)(?![^&;]+;)', 'gi'), '<strong class="your-class">$1</strong>');
  }
}