import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { AuthService } from '../../../core/services/auth.service'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  
  theme: string = 'default';

  constructor(private authService: AuthService, private router: Router, private storageService: LocalStorageService,) { }

  ngOnInit(): void {
    let localStorageTheme = this.storageService.getItem('theme');
    if(localStorageTheme) {
      this.theme = localStorageTheme;
    }
    else {
      this.theme = 'default';
    }
  }
  
  onLogout() {
    this.authService.logout();
  }

  logoutUser() {
    this.authService.logout().subscribe((result: boolean) => {
      this.router.navigate(['auth']);
    })
  }

}
