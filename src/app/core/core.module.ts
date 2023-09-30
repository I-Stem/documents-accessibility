import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaceholderDirective } from '../core/directives/placeholder.directive';
import { DropdownDirective } from '../core/directives/dropdown.directive';

@NgModule({
  declarations: [
    PlaceholderDirective,
    DropdownDirective,
  ],
  imports: [
    CommonModule
  ],
  exports:[
    PlaceholderDirective,
    DropdownDirective,
  ]
})
export class CoreModule { }
