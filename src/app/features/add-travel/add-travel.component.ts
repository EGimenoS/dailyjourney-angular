import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { Observable } from 'rxjs';
import { debounceTime, filter, switchMap } from 'rxjs/operators';
import { AutocompleteAddress } from 'src/app/core/interfaces/autocomplete-address';
import { Travel } from 'src/app/core/interfaces/travel';
import { AutocompleteAddresesService } from 'src/app/core/services/autocomplete-addreses.service';
import { TravelsService } from 'src/app/core/services/travels.service';
import { longlatPresence } from 'src/app/core/validators/longlat-presence';

@Component({
  selector: 'app-add-travel',
  templateUrl: './add-travel.component.html',
  styleUrls: ['./add-travel.component.scss'],
})
export class AddTravelComponent implements OnInit {
  isUpdating = false;
  periodicityOptions = ['Diario L-D', 'Semanal', 'Entre semana L-V', 'Fin de semana S-D'];
  newTravelGroupForm: FormGroup;
  validOriginAddreses: Observable<AutocompleteAddress[]>;
  validDestinationAddreses: Observable<AutocompleteAddress[]>;

  theme: NgxMaterialTimepickerTheme = {
    container: {
      bodyBackgroundColor: 'white',
      buttonColor: '#002a4d',
    },
    dial: {
      dialBackgroundColor: '#ff6430',
    },
    clockFace: {
      clockFaceBackgroundColor: '#ff6430',
      clockHandColor: '#002a4d',
      clockFaceTimeInactiveColor: '#fff',
    },
  };

  constructor(
    private fb: FormBuilder,
    private validAddreses: AutocompleteAddresesService,
    private travelsService: TravelsService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  onSubmit(): void {
    this.isUpdating
      ? this.travelsService
          .updateTravel(this.route.snapshot.params.id, this.newTravelGroupForm.value)
          .subscribe()
      : this.travelsService.createNewTravel(this.newTravelGroupForm.value).subscribe();
  }
  createNewTravelGroupForm(): FormGroup {
    return this.fb.group({
      origin_attributes: ['', [longlatPresence()]],
      destination_attributes: ['', [longlatPresence()]],
      departure_time: ['', Validators.required],
      capacity: ['', Validators.required],
      periodicity: ['', Validators.required],
      owner_comment: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.newTravelGroupForm = this.createNewTravelGroupForm();

    if (this.route.snapshot.params.id) {
      this.isUpdating = true;
      this.fillForm(this.route.snapshot.params.id);
    }
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

  onCancelFormClick(): void {
    this.location.back();
  }

  private fillForm(id: string): void {
    this.travelsService.getTravelDetail(id).subscribe((travel: Travel) => {
      this.newTravelGroupForm.patchValue({
        ...travel[0],
        origin_attributes: travel[0].origin,
        destination_attributes: travel[0].destination,
        departure_time: formatDate(travel[0].departure_time, 'hh:mm', 'en'),
      });
    });
  }
}
