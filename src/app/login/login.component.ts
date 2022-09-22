import { Component, OnInit } from '@angular/core';
import { LoginUser } from '../models/loginUser';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isSuccessful = false;
  isLoginFailed = false;
  errorMessage = false;

  token : any

  loginUser: LoginUser = {
    userEmail : '',
    userPassword : ''
  }

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    if(window.sessionStorage.getItem('token')){
      this.isSuccessful =  true;
    }

  }

  onSubmitLogin() : void {
    this.authService.login(this.loginUser).
    subscribe(
      response => { this.token = response
        if(response.success){
          this.isSuccessful =  true;
          window.sessionStorage.setItem('token', this.token.data.token)
          window.sessionStorage.setItem('role',this.token.data.userRole)
          window.sessionStorage.setItem('userName', this.token.data.userName)
          window.location.reload();
        }
        else{
          this.isLoginFailed = true;
          this.errorMessage = response.message;
        }
    },
    // (error) => {
    //   this.errorMessage = error.message
    // }
    );
  }

}
