import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AutocompleteAddress } from 'src/app/core/interfaces/autocomplete-address';
import { AutocompleteAddresesService } from 'src/app/core/services/autocomplete-addreses.service';
import { debounceTime, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-addreses-form',
  templateUrl: './search-addreses-form.component.html',
  styleUrls: ['./search-addreses-form.component.scss'],
})
export class SearchAddresesFormComponent implements OnInit {
  searchGroupForm: FormGroup;
  constructor(private fb: FormBuilder, private validAddreses: AutocompleteAddresesService) {}
  validOriginAddreses: Observable<AutocompleteAddress[]>;
  validDestinationAddreses: Observable<AutocompleteAddress[]>;
  onSubmit(): void {
    console.log(this.searchGroupForm.value);
  }
  createSearchGroupForm(): FormGroup {
    return this.fb.group({
      originInput: '',
      destinationInput: '',
    });
  }

  ngOnInit(): void {
    this.searchGroupForm = this.createSearchGroupForm();
    this.validOriginAddreses = this.searchGroupForm.get('originInput').valueChanges.pipe(
      debounceTime(300),
      switchMap((value) => this.validAddreses.getValidAddreses(value))
    );
    this.validDestinationAddreses = this.searchGroupForm.get('destinationInput').valueChanges.pipe(
      debounceTime(300),
      switchMap((value) => this.validAddreses.getValidAddreses(value))
    );
  }

  displayFn(address: AutocompleteAddress): string {
    if (address) {
      return address.address;
    }
  }
}
