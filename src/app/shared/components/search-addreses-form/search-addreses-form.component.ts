import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutocompleteAddress } from 'src/app/core/interfaces/autocomplete-address';
import { AutocompleteAddresesService } from 'src/app/core/services/autocomplete-addreses.service';
import { debounceTime, filter, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { longlatPresence } from 'src/app/core/validators/longlat-presence';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/core/components/alert/alert.component';
import { UserLocationService } from 'src/app/core/services/user-location.service';
import { GeoPosition } from 'src/app/core/interfaces/travel-payload';

@Component({
  selector: 'app-search-addreses-form',
  templateUrl: './search-addreses-form.component.html',
  styleUrls: ['./search-addreses-form.component.scss'],
})
export class SearchAddresesFormComponent implements OnInit {
  @Input() userOrigin: GeoPosition;
  @Input() userDestination: GeoPosition;
  searchGroupForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private validAddreses: AutocompleteAddresesService,
    private router: Router,
    private dialog: MatDialog,
    private userLocationService: UserLocationService
  ) {}
  validOriginAddreses: Observable<AutocompleteAddress[]>;
  validDestinationAddreses: Observable<AutocompleteAddress[]>;
  onSubmit(): void {
    if (this.searchGroupForm.valid) {
      const destinationParams = this.searchGroupForm.controls.destinationInput.value;
      const originParams = this.searchGroupForm.controls.originInput.value;
      this.userLocationService.setUserOrigin({
        latitude: originParams.latitude,
        longitude: originParams.longitude,
        address: originParams.address,
      });
      this.userLocationService.setUserDestination({
        latitude: destinationParams.latitude,
        longitude: destinationParams.longitude,
        address: destinationParams.address,
      });
      this.router.navigate(['/search-results'], {
        queryParams: {
          destination_latitude: destinationParams.latitude,
          destination_longitude: destinationParams.longitude,
          destination_address: destinationParams.address,
          origin_address: originParams.address,
          origin_latitude: originParams.latitude,
          origin_longitude: originParams.longitude,
        },
      });
    } else {
      console.log('valid');
      this.dialog.open(AlertComponent, {
        minWidth: '30%',
        data: {
          title: 'Direcciones inválidas',
          message: 'Por favor, seleccione una dirección válidas',
        },
      });
    }
  }
  createSearchGroupForm(): FormGroup {
    return this.fb.group({
      originInput: [this.userDestination, [longlatPresence()]],
      destinationInput: [this.userOrigin, [longlatPresence()]],
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
