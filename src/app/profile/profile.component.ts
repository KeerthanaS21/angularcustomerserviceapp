import { Component, OnInit } from '@angular/core';
import { UpdateProfile } from '../models/updateProfile';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user : string | null
  isProfileUpdateFailed = false;
  errorMessage = false;
  isSuccessful = false;
  isAdmin = false

  UpdateProfileList : any[] = []
  updateProfile : UpdateProfile = {
    userName: '',
    firstName: '',
    lastName: '',
    dob: new Date(),
    idType: '',
    idValue : ''
  }

  constructor(private profileService : ProfileService) { 
    this.user = window.sessionStorage.getItem('userName')  
    }

  ngOnInit(): void {
    this.updateProfile.userName = this.user    
    this.getProfile()
    if(window.sessionStorage.getItem('role')== '0')
    {
      this.isAdmin = true
      this.updateProfile = this.profileService.updateProfile
      if(this.updateProfile.userName == '')
      {
        this.updateProfile.userName = this.user
      }
    }
  }

  onSubmitProfile() : void {
    console.log('inside submit')
    this.profileService.addProfileDetails(this.updateProfile).
    subscribe(
      response => {
        if(response.success){
          this.isSuccessful =  true;
        }
        else{
          this.isProfileUpdateFailed = true;
          this.errorMessage = response.message;
        }
        console.log(response);
    }
    );
  }

  getProfile() : void {
    this.profileService.getProfiles(String(this.user)).subscribe(
      response => { 
        this.UpdateProfileList = response.data
        this.updateProfile.dob = this.UpdateProfileList[0].dob.slice(0,10)
        this.updateProfile.firstName = this.UpdateProfileList[0].firstName
        this.updateProfile.lastName = this.UpdateProfileList[0].lastName
        this.updateProfile.idType = this.UpdateProfileList[0].idType
        this.updateProfile.idValue = this.UpdateProfileList[0].idValue
      }
    )
    }
}
