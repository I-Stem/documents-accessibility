import {
  Component,
  ComponentFactoryResolver,
  ViewChild,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Router } from '@angular/router'; 
import { PlaceholderDirective } from 'src/app/core/directives/placeholder.directive';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  isLoading = false;
  error: string | null = null;

show_button : boolean[] = [false, false];
show_eye : boolean[] = [false, false];
  @ViewChild(PlaceholderDirective, { static: false })
  alertHost!: PlaceholderDirective;

  private subcription$: Subscription = new Subscription();
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private router: Router,
    private storageService: LocalStorageService,
    private authService: AuthService,
  ) {
  }

  ngOnInit() {
    this.storageService.clear();
  }

  onSubmit(form: NgForm, modal: any) {
    if (!form.valid) {
      return;
    }
    if(form.value.password !== form.value.confirm_password) {
      alert("Passwords do not match");
      return;
    }
    const ipEmail = form.value.email.trim();
    const ipPassword = form.value.password ?? "";
    const ipFirstName = form.value.first_name.trim() ?? "";
    const ipLastName = form.value.last_name.trim() ?? "";

    this.authService.register(ipEmail, ipPassword, ipFirstName,ipLastName)
      .subscribe((authState: any) => {
        this.error = authState.authError;
        if (this.error) {
          alert(this.error);
          // this.showErrorAlert(this.error); 
        } else {
          alert("You have successfully registered! Please log in to continue");
          this.router.navigate(['/auth']);
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

showPassword(i: number){ 
  this.show_button[i] = !this.show_button[i];
  this.show_eye[i] = !this.show_eye[i];
}
}
