import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, Routes } from '@angular/router';
import { UseraServicesService } from '../services/usera-services.service';
@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  constructor(private router: Router, private user: UseraServicesService, private fb: FormBuilder) { }
  currentUser='';
  custName: '';
  userName: '';
  password: '';
  gender: '';
  dob: '';
  address: '';
  phoneNo: '';
  email: '';
  registerForm = this.fb.group(
    {
      custName: [''],
      userName: ['', [Validators.minLength(4), Validators.maxLength(10), Validators.pattern('[a-zA-Z0-9]*')]],
      password: ['', [Validators.pattern('[a-zA-Z0-9]*')]],
      gender: [''],
      dob: [''],
      address: [''],
      phoneNo: ['', [Validators.pattern('[0-9]*')]],
      email: ['']
    }
  );
  ngOnInit(): void {
    this.currentUser=localStorage.getItem("customername");
  }
  userUpdate() {
  
    if(this.registerForm.valid)
    {
        var custname = this.registerForm.value.custName;  
        var username = this.registerForm.value.userName;
        var upwd = this.registerForm.value.password;
        var gender = this.registerForm.value.gender;
        var dob = this.registerForm.value.dob;
        var address = this.registerForm.value.address;
        var phoneno = this.registerForm.value.phoneNo;
        var email = this.registerForm.value.email;
        this.user.userUpdate(custname,username,upwd,gender,dob,address,phoneno,email)
        .subscribe((data:any)=>{
          if(data){
            alert(data.message);
            this.router.navigateByUrl('userHome');
          }
        },(data)=>{
          alert(data.error.message);
        })
       
      }
      else
      {
        alert("Invalid Forms");
      }

}
gotoUpdate() {
  this.router.navigateByUrl('userHome/userUpdate');
}
gotoViewAccount(){
this.router.navigateByUrl('userHome/userView');
}
}
