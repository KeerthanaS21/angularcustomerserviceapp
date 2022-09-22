import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contacts } from '../models/contacts';
import { Profiles } from '../models/profiles';
import { UpdateProfile } from '../models/updateProfile';
import { AdminService } from '../services/admin.service';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  contactList : Contacts[] = []
  contactData : Contacts = {
    ContactId : 0,
    userName: '',
    address: '',
    city: '',
    state: '',
    country: '',
    contactPreference: '',
    phoneNo: ''
  }

  profileList : Profiles[] = []
  profileData : Profiles = {
    profileId: 0,
    userName : '',
    firstName:'',
    lastName:'',
    dob: new Date(),
    idType: '',
    idValue : ''
  }

  updateProfile : UpdateProfile = {
    userName: '',
    firstName: '',
    lastName: '',
    dob: new Date(),
    idType: '',
    idValue : ''
  }
  user = ''

  constructor(private adminService: AdminService,private profileService : ProfileService, private route : Router) 
  { this.user = String(sessionStorage.getItem('userName')) }

  ngOnInit(): void {
    this.profiles();
    this.contacts();
    console.log(this.profileList)
    console.log(this.contactList)
  }

  ngOnDestroy(): void {
    this.profileService.updateProfile = this.updateProfile 
    console.log(this.updateProfile)
  }

  profiles() : void {
    this.adminService.getProfiles(this.user).subscribe(
      response => { 
        console.log(response.data)
        this.profileList = response.data
        console.log(this.profileList )}
        
    )
  }

  contacts(): void {
    this.adminService.getContacts(this.user).subscribe(
      response => { this.contactList = response.data}
    )
  }

  createCustomer(): void {
    this.route.navigateByUrl('/register')
  }

  editIconClick(profile : Profiles) : void {
    this.updateProfile.userName = profile.userName
    this.updateProfile.firstName = profile.firstName
    this.updateProfile.lastName = profile.lastName
    this.updateProfile.dob = profile.dob
    this.updateProfile.idType = profile.idType
    this.updateProfile.idValue = profile.idValue
    this.route.navigateByUrl('/profile')
  }

}
