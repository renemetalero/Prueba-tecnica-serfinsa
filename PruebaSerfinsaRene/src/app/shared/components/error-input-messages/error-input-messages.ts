import {
  Component,
  input,
  InputSignal,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-error-input-messages',
  imports: [],
  template: `
    @if (control().touched || control().dirty) { @for (key of errorKeys(); track
    $index) {
    <div class="flex flex-row">
      <small class="text-red-500">{{ errorMessages()[key] }}</small>
    </div>
    } }
  `,
  styleUrl: './error-input-messages.css',
})
export class ErrorInputMessages implements OnInit {
  control: InputSignal<FormControl> = input.required<FormControl>();
  errorKeys: WritableSignal<string[]> = signal<string[]>([]);
  errorMessages: WritableSignal<Record<string, string>> = signal<
    Record<string, string>
  >({});

  ngOnInit(): void {
    this.setErrorKeys();
    this.setErrorMessages();

    this.control().valueChanges.subscribe((): void => {
      this.setErrorKeys();
      this.setErrorMessages();
    });
  }

  setErrorKeys(): void {
    this.errorKeys.set(Object.keys(this.control().errors || {}));
  }

  setErrorMessages(): void {
    this.errorMessages.set({
      required: 'Este campo es requerido',
      min: 'Este campo es requerido',
      email: 'Ingrese un email válido',
      maxlength: `Máximo ${
        this.control().getError('maxlength')?.requiredLength || 0
      } caracteres`,
      minlength: `Mínimo ${
        this.control().getError('minlength')?.requiredLength || 0
      } caracteres`,
    });
  }
}
