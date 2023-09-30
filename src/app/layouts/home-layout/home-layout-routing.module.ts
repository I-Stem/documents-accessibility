import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomelayoutComponent } from './homelayout/homelayout.component';
import { RemediationComponent } from './screens/remediation/remediation.component';
import { RemediationSuccessComponent } from './screens/remediation-success/remediation-success.component';

const routes: Routes = [
  {
    path: '',
    component: HomelayoutComponent,
    children: [
      {
        path: 'remediation',
        component: RemediationComponent
      }, 
      {
        path: 'remediation-success',
        component: RemediationSuccessComponent
      }, 
      {
        path: '**',
        redirectTo: '/home/remediation'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeLayoutRoutingModule { }
