import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ErrorInputMessages } from '../error-input-messages/error-input-messages';

@Component({
  selector: 'app-custom-input',
  imports: [ErrorInputMessages, ReactiveFormsModule],
  template: `<div>
    <label class="block text-sm font-medium text-gray-700 mb-1">
      {{ label() }}
    </label>
    <input
      [name]="name()"
      [type]="type()"
      [formControl]="control()"
      class="w-full px-3 py-2 border rounded-lg text-sm placeholder:text-gray-300
                 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      [placeholder]="placeholder()"
    />
    <app-error-input-messages [control]="control()" />
  </div>`,
  styleUrl: './custom-input.css',
})
export class CustomInput {
  control = input<FormControl>(new FormControl());
  label = input.required<string>();
  type = input.required<string>();
  placeholder = input.required<string>();
  name = input.required<string>();
}
