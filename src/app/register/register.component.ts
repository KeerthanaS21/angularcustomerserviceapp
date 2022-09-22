import { Component, OnInit } from '@angular/core';
import { RegisterUser } from '../models/registerUserModel';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isSuccessful = false;
  isAdmin = false;
  isRegistrationFailed = false;
  errorMessage = '';

  userRole = '';
  registerUser : RegisterUser = {
    userName : '',
    userPassword : '',
    userEmail : '',
    userRole : 1
  }

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    if(window.sessionStorage.getItem('userName') != null)
    { this.isAdmin = true }

  }

  onSubmitRegister(): void {
    if(this.userRole == 'customer'){
      this.registerUser.userRole = 1
    }
    this.authService.register(this.registerUser).
    subscribe(
      response => {
        if(response.success){
          this.isSuccessful =  true;
        }
        else{
          this.isRegistrationFailed = true;
          this.errorMessage = response.message;
        }
        console.log(response);
    }
    );

  }

}
