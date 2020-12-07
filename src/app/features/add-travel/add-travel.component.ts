import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, filter, switchMap } from 'rxjs/operators';
import { AutocompleteAddress } from 'src/app/core/interfaces/autocomplete-address';
import { AutocompleteAddresesService } from 'src/app/core/services/autocomplete-addreses.service';
import { TravelsService } from 'src/app/core/services/travels.service';
import { longlatPresence } from 'src/app/core/validators/longlat-presence';

@Component({
  selector: 'app-add-travel',
  templateUrl: './add-travel.component.html',
  styleUrls: ['./add-travel.component.scss'],
})
export class AddTravelComponent implements OnInit {
  periodicityOptions = ['Diario', 'Semanal', 'Entre semana', 'Fin de semana'];
  newTravelGroupForm: FormGroup;
  validOriginAddreses: Observable<AutocompleteAddress[]>;
  validDestinationAddreses: Observable<AutocompleteAddress[]>;

  constructor(
    private fb: FormBuilder,
    private validAddreses: AutocompleteAddresesService,
    private travelsService: TravelsService
  ) {}

  onSubmit(): void {
    console.log(this.newTravelGroupForm.value);
    this.travelsService.createNewTravel(this.newTravelGroupForm.value).subscribe();
  }
  createNewTravelGroupForm(): FormGroup {
    return this.fb.group({
      origin_attributes: ['', [longlatPresence()]],
      destination_attributes: '',
      departure_time: ['', Validators.required],
      capacity: ['', Validators.required],
      periodicity: ['', Validators.required],
      owner_comment: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.newTravelGroupForm = this.createNewTravelGroupForm();
    this.validOriginAddreses = this.newTravelGroupForm.get('origin_attributes').valueChanges.pipe(
      debounceTime(300),
      filter((value) => value.length > 0),
      switchMap((value) => this.validAddreses.getValidAddreses(value))
    );
    this.validDestinationAddreses = this.newTravelGroupForm
      .get('destination_attributes')
      .valueChanges.pipe(
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
