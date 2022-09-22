import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestModel } from '../models/requestModel';
import { RequestService } from '../services/request.service';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent implements OnInit {

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

  isSuccessful = false;
  isrequestSubmitFailed = false;
  errorMessage = false;
  isAssignClicked = false;
  isCommentClicked = false;
  assingedTo = ''
  user : string | null
  status = ''

  constructor(private requestService: RequestService, private route: Router) { 
    this.requestDetails.requestCreatedBy = this.user =  window.sessionStorage.getItem('userName')
  }

  ngOnInit(): void {
    this.getAllRequests(String(this.user))
  }

  getAllRequests(userName : string) : void {
    this.requestService.getRequests(userName).subscribe(
      response => { 
        if(response.success){
          this.requestList = response.data
          console.log(this.requestList)
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

  assign(request : RequestModel) : void {
    this.isAssignClicked = true
    this.requestDetails = request
    console.log(this.requestDetails)
  }

  addComment(request : RequestModel) : void {
    this.isCommentClicked= true
    this.requestDetails = request
  }

  onSubmitAssign() : void{
    //this.requestDetails.requestAssignedTo = this.assingedTo
    console.log(this.requestDetails)
    this.requestService.assignRequest(this.requestDetails).subscribe(
      response => {
        if(response.success){
          this.getAllRequests(String(this.user))
          this.isSuccessful =  true;
        }
        else{
          this.isrequestSubmitFailed = true;
          this.errorMessage = response.message;
        }
      }
    )
    this.isAssignClicked = false
  }

  onSubmitComment() : void{
    this.requestService.addComment(this.requestDetails).subscribe(
      response => {
        if(response.success){
          this.getAllRequests(String(this.user))
          this.isSuccessful =  true;
        }
        else{
          this.isrequestSubmitFailed = true;
          this.errorMessage = response.message;
        }
      }
    )
    this.isCommentClicked = false
  }

  addEditCustomer() : void {
    this.route.navigateByUrl('addcustomer')
  }
}
