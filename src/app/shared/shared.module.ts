import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  imports: [CommonModule],
  exports: [CommonModule, FormsModule, HttpClientModule, ReactiveFormsModule],
})
export class SharedModule {}
