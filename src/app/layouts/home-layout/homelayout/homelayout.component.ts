import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Component({
  selector: 'app-homelayout',
  templateUrl: './homelayout.component.html',
  styleUrls: ['./homelayout.component.scss']
})
export class HomelayoutComponent implements OnInit {
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
