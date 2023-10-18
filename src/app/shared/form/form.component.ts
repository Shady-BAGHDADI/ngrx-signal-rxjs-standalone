import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  @Input() formGroup: FormGroup;
  @Output() formSubmit = new EventEmitter<void>();

  onSubmit() {
    this.formSubmit.emit();
  }
}
