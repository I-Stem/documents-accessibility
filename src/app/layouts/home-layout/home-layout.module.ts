import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeLayoutRoutingModule } from './home-layout-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomelayoutComponent } from './homelayout/homelayout.component';
import { RemediationComponent } from './screens/remediation/remediation.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { RemediationSuccessComponent } from './screens/remediation-success/remediation-success.component';

@NgModule({
  declarations: [
    HomelayoutComponent,
    RemediationComponent,
    RemediationSuccessComponent,
  ],
  imports: [
    CommonModule,
    HomeLayoutRoutingModule, 
    SharedModule,
    ReactiveFormsModule,
    NgbNavModule,
  ],
})
export class HomeLayoutModule { }
