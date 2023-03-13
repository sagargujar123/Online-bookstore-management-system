import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

const materialComponents = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatGridListModule,
  MatIconModule,
  MatListModule,
];



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    materialComponents
  ],
  exports: [
    materialComponents
  ]
})
export class MaterialModule { }
