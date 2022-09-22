import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { ContactComponent } from './contact/contact.component';
import { CustomerhomeComponent } from './customerhome/customerhome.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'customerhome', component: CustomerhomeComponent},
  {path: 'adminhome', component: AdminhomeComponent},
  {path: 'addcustomer', component: AddCustomerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
