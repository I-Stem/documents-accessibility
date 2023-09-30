import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-remediation-success',
  templateUrl: './remediation-success.component.html',
  styleUrls: ['./remediation-success.component.scss']
})
export class RemediationSuccessComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigate(viewTab: string) {
    this.router.navigate(['/home/remediation', { viewTab: viewTab } ])
  }
}
