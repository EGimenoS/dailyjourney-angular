import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, filter, switchMap } from 'rxjs/operators';
import { AutocompleteAddress } from 'src/app/core/interfaces/autocomplete-address';
import { AutocompleteAddresesService } from 'src/app/core/services/autocomplete-addreses.service';

@Component({
  selector: 'app-add-travel',
  templateUrl: './add-travel.component.html',
  styleUrls: ['./add-travel.component.scss'],
})
export class AddTravelComponent implements OnInit {
  periodicityOptions = ['Diario', 'Semanal', 'Entre semana', 'Fin de semana'];
  newTravelGroupForm: FormGroup;
  constructor(private fb: FormBuilder, private validAddreses: AutocompleteAddresesService) {}
  validOriginAddreses: Observable<AutocompleteAddress[]>;
  validDestinationAddreses: Observable<AutocompleteAddress[]>;
  onSubmit(): void {
    console.log(this.newTravelGroupForm.value);
  }
  createNewTravelGroupForm(): FormGroup {
    return this.fb.group({
      originInput: '',
      destinationInput: '',
      departure_time: '',
      capacity: '',
      periodicity: '',
      owner_comment: '',
    });
  }

  ngOnInit(): void {
    this.newTravelGroupForm = this.createNewTravelGroupForm();
    this.validOriginAddreses = this.newTravelGroupForm.get('originInput').valueChanges.pipe(
      debounceTime(300),
      filter((value) => value.length > 0),
      switchMap((value) => this.validAddreses.getValidAddreses(value))
    );
    this.validDestinationAddreses = this.newTravelGroupForm
      .get('destinationInput')
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
