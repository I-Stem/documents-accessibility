import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthLayoutGuard } from './layouts/auth-layout/auth-layout.guard';
import { PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: '', redirectTo: '/auth', pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('src/app/layouts/auth-layout/auth-layout.module').then((m) => m.AuthLayoutModule)
  },
  {
    path: 'home',
    loadChildren: () => {
      return import('src/app/layouts/home-layout/home-layout.module').then((m) => m.HomeLayoutModule);
    },
    canActivate: [AuthLayoutGuard],
  },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', useHash: false })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
