import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-search-addreses-form',
  templateUrl: './search-addreses-form.component.html',
  styleUrls: ['./search-addreses-form.component.scss'],
})
export class SearchAddresesFormComponent implements OnInit {
  searchGroupForm: FormGroup;
  constructor(private fb: FormBuilder) {}

  onSubmit(): void {
    console.log(this.searchGroupForm.value);
  }
  createSearchGroupForm(): FormGroup {
    return this.fb.group({
      originAddress: '',
      destinationAddress: '',
    });
  }

  ngOnInit(): void {
    this.searchGroupForm = this.createSearchGroupForm();
    console.log(this.searchGroupForm);
  }
}
