export interface RequestModel {
    requestId:number 
    requestType: string
    requestDetail : string
    requestStatus : string
    requestAssignedTo : string
    requestAssigneeComments : string
    requestCreatedBy : string | null
    requestCreatedDate : Date
    requestClosedDate : Date
}