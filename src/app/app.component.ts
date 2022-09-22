import { ThisReceiver } from '@angular/compiler';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'customerserviceapp';
  isAdmin = false;
  isCustomer = false;
  isLoggedIn = false;
  showProfile = false;
  showcontact =  false;
  user : string | null

  constructor() {
    this.user = window.sessionStorage.getItem('userName')
  }

  ngOnInit(): void {
    this.isLoggedIn = !!window.sessionStorage.getItem('token');
    if (this.isLoggedIn)
    {
      this.showProfile = true
      this.showcontact = true
      if(window.sessionStorage.getItem('role')  == '1')
      {
        this.isCustomer = true
      }
      else{
        this.isAdmin = true;
      }
    }
  }

  logout(): void {
    this.isLoggedIn = false;
    window.sessionStorage.clear();
    window.localStorage.clear();
  }

}
