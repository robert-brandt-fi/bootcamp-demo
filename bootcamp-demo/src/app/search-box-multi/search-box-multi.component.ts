import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {take} from "rxjs/operators";

/**
 * @title Chips Autocomplete
 */
@Component({
  selector: 'search-box-multi',
  templateUrl: 'search-box-multi.component.html',
  styleUrls: ['search-box-multi.component.css'],
})
export class SearchBoxMulti {
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  commodityCtrl = new FormControl();
  filteredCommodities: Observable<string[]>;
  commodities: string[] = [];
  allCommodities: string[] = ["Veldspar", "Scordite", "Pyroxeres", "Plagioclase"]

  @ViewChild('commodityInput') commodityInput!: ElementRef<HTMLInputElement>;

  constructor() {
    this.filteredCommodities = this.commodityCtrl.valueChanges.pipe(
        startWith(null),
        map((commodity: string | null) => commodity ? this._filter(commodity) : this.allCommodities.slice()));
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our commodity
    this.filteredCommodities.pipe(take(1)).subscribe(commodities => {
      
      if (commodities.length === 1 && !this.commodities.includes(commodities[0])) {
        this.commodities.push(commodities[0]);
      }
    });

    // Clear the input value
    event.chipInput!.clear();

    this.commodityCtrl.setValue(null);
  }

  remove(commodity: string): void {
    const index = this.commodities.indexOf(commodity);

    if (index >= 0) {
      this.commodities.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.commodities.push(event.option.viewValue);
    this.commodityInput.nativeElement.value = '';
    this.commodityCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allCommodities.filter(commodity => commodity.toLowerCase().includes(filterValue));
  }
}
