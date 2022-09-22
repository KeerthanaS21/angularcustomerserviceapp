import { Component, OnInit } from '@angular/core';
import { RequestModel } from '../models/requestModel';
import { RequestService } from '../services/request.service';

@Component({
  selector: 'app-customerhome',
  templateUrl: './customerhome.component.html',
  styleUrls: ['./customerhome.component.css']
})
export class CustomerhomeComponent implements OnInit {

  requestList : RequestModel[] = []
  requestDetails : RequestModel = {
    requestId : 0,
    requestType : '',
    requestDetail : '',
    requestStatus : '',
    requestAssignedTo : '',
    requestAssigneeComments: '',
    requestCreatedBy : '',
    requestCreatedDate: new Date(),
    requestClosedDate:  new Date()
  }

  isCreateClicked = false;
  isSuccessful = false;
  isrequestSubmitFailed = false;
  errorMessage = false
  user : string | null
  status = ''

  constructor(private requestService: RequestService) { 
    this.requestDetails.requestCreatedBy = this.user =  window.sessionStorage.getItem('userName')
  }

  ngOnInit(): void {
    this.getAllRequests(String(this.user))
  }

  getAllRequests(userName : string) : void {
    this.requestService.getRequests(userName).subscribe(
      response => { 
        if(response.success){
          console.log(response)
          this.requestList = response.data
        }
      }
    )
  }

  getRequestsByFilter()
  {
    if (this.status) {
      this.requestList = this.requestList?.filter(res => {
        return res.requestStatus.toLocaleLowerCase().match(this.status.toLocaleLowerCase());
      })
    }
  }

  onCreateRequestClick() : void {
    this.isCreateClicked = true
  }

  onSubmitRequest() : void {
    console.log(this.requestDetails)
    this.requestService.createNewRequest(this.requestDetails).subscribe(
      response => {
        if(response.success){
          this.isSuccessful =  true;
        }
        else{
          this.isrequestSubmitFailed = true;
          this.errorMessage = response.message;
        }
      }
    )
  }

}
