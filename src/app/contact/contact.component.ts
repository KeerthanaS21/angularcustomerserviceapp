import { Component, OnInit } from '@angular/core';
import { UpdateContact } from '../models/updateContact';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  user : string | null
  isContactUpdateFailed = false;
  errorMessage = false;
  isSuccessful = false;

  updateContactList : any[]=[]
  updateContact : UpdateContact = {
    userName: '',
    address: '',
    city: '',
    state:'',
    country:'',
    contactPreference: '',
    phoneNo : ''
  }

  constructor(private profileService : ProfileService) { 
    this.user = window.sessionStorage.getItem('userName')
    this.updateContact.userName = this.user;
  }

  ngOnInit(): void {
    this.getContact()
  }

  onSubmitProfile() : void {
    this.profileService.addContactDetails(this.updateContact).
    subscribe(
      response => {
        if(response.success){
          this.isSuccessful =  true;
        }
        else{
          this.isContactUpdateFailed = true;
          this.errorMessage = response.message;
        }
        console.log(response);
    }
    );
  }

  getContact() : void {
    this.profileService.getContacts(String(this.user)).subscribe(
      response => { 
        this.updateContactList = response.data
        this.updateContact.address = this.updateContactList[0].address
        this.updateContact.city = this.updateContactList[0].city
        this.updateContact.state = this.updateContactList[0].state
        this.updateContact.country = this.updateContactList[0].country
        this.updateContact.contactPreference = this.updateContactList[0].contactPreference
        this.updateContact.phoneNo = this.updateContactList[0].phoneNo
      }
    )
  }


}
