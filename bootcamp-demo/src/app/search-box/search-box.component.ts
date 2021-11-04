import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { ApiService } from "../services/api.service";

@Component({
  selector: 'search-box-component',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})

export class SearchBoxComponent implements OnInit {
  options: string[] = this.apiService.getItemNames();
  searchControl = new FormControl();
  filteredOptions: Observable<string[]>;

  @Output() name: EventEmitter<string> = new EventEmitter();

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  constructor(
    private apiService: ApiService
    ) {
    this.filteredOptions = new Observable<string[]>();
  }

  ngOnInit() {
    // In the search box, filter the options to what the user is trying to search for.
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith(''),map(value => this._filter(value))
    );
  }

  // Prevent the page from reloading when pressing Enter.
  search(event: Event) {
    event.preventDefault();
    this.name.emit(this.searchControl.value);
  }
}
