import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AlertComponent } from './alert/alert.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

import { ContentComponent } from './layout/content/content.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';

import { TrustHtmlPipe } from './pipes/trustHtml.pipe';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';




@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent,
    ContentComponent,
    NavbarComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    AlertComponent,
    LoadingSpinnerComponent,
    ContentComponent,
    NavbarComponent,
    SidebarComponent,
  ],
  entryComponents: [AlertComponent],
  providers: [TrustHtmlPipe,NgbActiveModal],
})
export class SharedModule { }
