import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AutocompleteAddress } from 'src/app/core/interfaces/autocomplete-address';
import { AutocompleteAddresesService } from 'src/app/core/services/autocomplete-addreses.service';
import { debounceTime, filter, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-addreses-form',
  templateUrl: './search-addreses-form.component.html',
  styleUrls: ['./search-addreses-form.component.scss'],
})
export class SearchAddresesFormComponent implements OnInit {
  searchGroupForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private validAddreses: AutocompleteAddresesService,
    private router: Router
  ) {}
  validOriginAddreses: Observable<AutocompleteAddress[]>;
  validDestinationAddreses: Observable<AutocompleteAddress[]>;
  onSubmit(): void {
    const destinationParams = this.searchGroupForm.controls.destinationInput.value;
    const originParams = this.searchGroupForm.controls.originInput.value;
    this.router.navigate(['/search-results'], {
      queryParams: {
        destination_latitude: destinationParams.latitude,
        destination_longitude: destinationParams.longitude,
        origin_latitude: originParams.latitude,
        origin_longitude: originParams.longitude,
      },
    });
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
      filter((value) => value.length > 0),
      switchMap((value) => this.validAddreses.getValidAddreses(value))
    );
    this.validDestinationAddreses = this.searchGroupForm.get('destinationInput').valueChanges.pipe(
      debounceTime(300),
      filter((value) => value.length > 0),
      switchMap((value) => this.validAddreses.getValidAddreses(value))
    );
  }

  displayFn(address: AutocompleteAddress): string {
    if (address) {
      return address.address;
    }
  }
}
