import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, Routes } from '@angular/router';
import { UseraServicesService } from '../services/usera-services.service';
@Component({
  selector: 'app-user-viewaccount',
  templateUrl: './user-viewaccount.component.html',
  styleUrls: ['./user-viewaccount.component.css']
})
export class UserViewaccountComponent implements OnInit {

  constructor(private router: Router, private user: UseraServicesService, private fb: FormBuilder) { }
  currentUser = "";
  name = '';
  customername: '';
  username: '';
  password: '';
  gender: '';
  dob: '';
  address: '';
  phoneno: '';
  email: '';

  ngOnInit(): void {
    this.name = localStorage.getItem("customername");
    this.currentUser = localStorage.getItem("username");
    alert(this.currentUser);
    this.user.getUserDetails(this.currentUser).subscribe((data: any) => {
      if (data) {
        alert(data.message);
        this.customername = data.usdata.custName;
        this.username = data.usdata.userName;
        this.password = data.usdata.password;
        this.gender = data.usdata.gender;
        this.dob = data.usdata.dob;
        this.address = data.usdata.address;
        this.phoneno = data.usdata.phoneNo;
        this.email = data.usdata.email;
        alert(this.gender);
      }
    }), (data) => {
      alert(data.error.message);
    }
  }
  gotoUpdate() {
    this.router.navigateByUrl('userHome/userUpdate');
  }
// gotoViewAccount(){
//   this.router.navigateByUrl('userHome/userView');
//   }
}

