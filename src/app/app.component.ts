import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../app/core/services/auth.service';
import { LocalStorageService } from './core/services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'web-frontend'; 
  theme: string = 'default';

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(): void { 
    let localStorageTheme = this.localStorageService.getItem('theme');
    if(localStorageTheme) {
      this.theme = localStorageTheme;
    }
    else {
      this.theme = 'default';
    }
  }

}
