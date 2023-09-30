import {
  Component,
  ComponentFactoryResolver,
  ViewChild,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AlertComponent } from '../../shared/alert/alert.component';
import { PlaceholderDirective } from '../../core/directives/placeholder.directive';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss'],
})
export class AuthLayoutComponent implements OnInit, OnDestroy {
  isLoading = false;
  error: string | null = null;
 
  show_button : boolean = false;
  show_eye : boolean = false;
  @ViewChild(PlaceholderDirective, { static: false })
  alertHost!: PlaceholderDirective;
 
  theme: string = 'default';
  private subcription$: Subscription = new Subscription();

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private router: Router,
    private storageService: LocalStorageService,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    let localStorageTheme = this.storageService.getItem('theme');
    if(localStorageTheme) {
      this.theme = localStorageTheme;
    }
    else {
      this.theme = 'default';
    }
    this.storageService.clear();
    this.storageService.setItem('theme', this.theme || '');
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const ipEmail = form.value.email ?? "";
    const ipPassword = form.value.password ?? "";

    this.authService.validateLogin(ipEmail, ipPassword)
      .subscribe((authState: any) => {
        this.error = authState.authError;
        if (this.error) {
          this.showErrorAlert(this.error);
        } else {
          this.router.navigate(['/home/feeds']);
        }
      });
    form.reset();
  }

  ngOnDestroy() {
    if (this.subcription$) {
      this.subcription$.unsubscribe();
    }
  }

  private showErrorAlert(message: string) {
    // const alertCmp = new AlertComponent();
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message = message;
    this.subcription$ = componentRef.instance.close.subscribe(() => {
      this.subcription$.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
  showPassword(){
    
    this.show_button = !this.show_button;
    this.show_eye = !this.show_eye;
  }
}
