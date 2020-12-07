import { AbstractControl, ValidatorFn } from '@angular/forms';

export function longlatPresence(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null =>
    control.value?.longitude && control.value?.latitude
      ? null
      : { notPosition: 'Dirección no válida' };
}
