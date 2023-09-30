import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/core/services/common.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  mobileSidebarCheck:boolean=false
  sidebarStyle:any;
  theme: string = 'default';

  constructor(private commonService: CommonService, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    // this.commonService.themeSelected.subscribe(res => {
      let localStorageTheme = this.localStorageService.getItem('theme');
    //   if(res) {
    //     this.theme = res;
    //   }
      if(localStorageTheme) {
        this.theme = localStorageTheme;
      }
      else {
        this.theme = 'default';
      }
    // });
    this.addGoogleTranslateScript();
    
  }
  
  sidebarClick(){
    if(!this.mobileSidebarCheck){
      this.mobileSidebarCheck=true;
      this.sidebarStyle="width:20%";
    }else{
      this.mobileSidebarCheck=false
      this.sidebarStyle="width:0px";
    }
  }
  
  toggleTheme() {
    this.theme = this.theme === 'default'? 'high-contrast' : 'default';
    this.localStorageService.setItem('theme', this.theme);
    window.location.reload();
    // this.commonService.changeTheme('default');
  }
  addGoogleTranslateScript(){
    let node = document.createElement('script');
    node.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node); 
  }
}
