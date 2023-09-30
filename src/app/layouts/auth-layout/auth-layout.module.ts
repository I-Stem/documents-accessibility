import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
 
import { AuthLayoutComponent } from './auth-layout.component';
import { SharedModule } from '../../shared/shared.module';
import { AuthLayoutRoutingModule } from './auth-layout-routing.module';
import { PlaceholderDirective } from 'src/app/core/directives/placeholder.directive';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    AuthLayoutComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    PlaceholderDirective,
  ],
  imports: [
    CommonModule,
    FormsModule, 
    SharedModule,
    AuthLayoutRoutingModule,
    ReactiveFormsModule
  ], 
  providers: []
})
export class AuthLayoutModule { }
