// filter.component.ts

import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  @Output() filterChange = new EventEmitter<any>();
  filterForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      artist: [''],
      album: ['']
    });
  }

  onFilterChange() {
    this.filterChange.emit(this.filterForm.value);
  }
}
