import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PlaceholderDirective } from 'src/app/core/directives/placeholder.directive';
import { AuthService } from 'src/app/core/services/auth.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  isLoading = false;
  error: string | null = null;
  passwordResetForm: FormGroup;

  @ViewChild(PlaceholderDirective, { static: false })
  alertHost!: PlaceholderDirective;
  
  private subcription$: Subscription = new Subscription();
  
  constructor(
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.passwordResetForm = this.formBuilder.group({
      email: ['', Validators.email]
    })
  }

  ngOnInit() {
    
  }

  onSubmit() {
    if (this.passwordResetForm.invalid) {
      return;
    }
    const ipEmail = this.passwordResetForm.value.email ?? "";
    this.authService.resetPassword(ipEmail)
      .subscribe((authState: any) => {
        this.error = authState.authError;
        if (this.error) {
          this.showErrorAlert(this.error);
        } else {
          this.router.navigate(['/home/feeds']);
        }
      });
    this.passwordResetForm.reset();
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
  
  ngOnDestroy() {
    if (this.subcription$) {
      this.subcription$.unsubscribe();
    }
  }
}