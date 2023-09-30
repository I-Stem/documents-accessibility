import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/core/services/data.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { UserService } from 'src/app/core/services/user.service';
import { OCRUploadData } from 'src/app/shared/entity/entity';

@Component({
  selector: 'app-remediation',
  templateUrl: './remediation.component.html',
  styleUrls: ['./remediation.component.scss']
})
export class RemediationComponent implements OnInit, OnDestroy {
  uploadPDFForm: FormGroup;
  selectedFile: File;
  subscriptions: Subscription[] = [];
  active = 1;
  viewTab: string;
  requests: any[] = [];
  theme: string = 'default';
  isLoading: boolean = false;

  constructor(private fb: FormBuilder,
    private dataService: DataService,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.uploadPDFForm = this.fb.group({
      file: [null, Validators.required],
      containsMath: ['', Validators.required],
      outputFormat: ['', Validators.required]
    });
    this.viewTab = this.activatedRoute.snapshot.params['viewTab']
    this.active = this.viewTab == 'requests' ? 2 : 1
  }

  ngOnInit(): void {
    let localStorageTheme = this.localStorageService.getItem('theme');
    this.getUserRequests();
    if(localStorageTheme) {
      this.theme = localStorageTheme;
    }
    else {
      this.theme = 'default';
    }
  }
  
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  
  onFileChange(file: File) {
    this.selectedFile = file;
    console.log(this.selectedFile);
  }
  
  uploadPDFFormSubmit() {
    if(this.uploadPDFForm.invalid) {
      return;
    }
    this.uploadPDFForm.disable();
    this.subscriptions.push(this.userService.getUserDetail().subscribe({
      next: user => {
        if(user?.email && user._id) {
            if(!+this.uploadPDFForm.controls['containsMath'].value &&this.uploadPDFForm.controls['outputFormat'].value=='PDF') {
              this.dataService.pdfAccessibilityCheck(this.selectedFile, user.email, user._id)
              setTimeout(() => {
                this.selectedFile = {} as File
                this.uploadPDFForm.reset();
                this.uploadPDFForm.enable();
                this.router.navigate(['/home/remediation-success']);              
              }, 2000);
            }
            else {
              const body: OCRUploadData = {
                userId: user._id,
                email: user.email,
                doc_type: +this.uploadPDFForm.controls['containsMath'].value?'MATH ':'NONMATH',
                file: this.selectedFile,
                format: this.uploadPDFForm.controls['outputFormat'].value,
              }
              this.dataService.pdfAccessibilityCheckOCR(body)
              setTimeout(() => {
                this.selectedFile = {} as File
                this.uploadPDFForm.reset();
                this.uploadPDFForm.enable();
                this.router.navigate(['/home/remediation-success']);              
              }, 2000);
            }
          }
          else {
            alert("Error: User has no email address")
          }
        },
        error: err => {
          console.log(err);
        }
      }))
      return
  }
  
  getUserRequests() {
    this.isLoading = true;
    this.subscriptions.push(this.userService.getUserDetail().subscribe({
      next: user => {
        if(user?._id) {
          this.subscriptions.push(this.dataService.getPDFResultsByUserId(user?._id).subscribe({
            next: (response: any) => {
              this.requests = response.data;
              this.isLoading = false;
            },
            error: (err) => {
              console.log(err);
              this.requests = [];
              this.isLoading = false;
            }
          })
          )
        }
      },
      error: (err) => {
        console.log(err);
      }
    }));
  }

  checkOutputOptions() {
    if(+this.uploadPDFForm.controls['containsMath'].value && this.uploadPDFForm.controls['outputFormat'].value=='PDF') {
      this.uploadPDFForm.patchValue({outputFormat:''})
    }
  }
}
