import { Component, OnInit } from '@angular/core';
import { UseraServicesService } from '../services/usera-services.service';
import { Router, Routes } from '@angular/router';
@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent implements OnInit {
  currentUser = "";
  customername="";
  items=[];
  total;
  loginuseropt;
  useropt;
  constructor(private user: UseraServicesService, private router: Router) { }

  ngOnInit(): void {
    if (this.currentUser) {
      this.loginuseropt = true;
      this.useropt = false;
    }
    else {
      this.loginuseropt = false;
      this.useropt = true;
    }
    this.currentUser = localStorage.getItem("username");
    this.customername = localStorage.getItem("customername");
    this.user.viewMyCart(this.currentUser).subscribe((data: any) => {
      if (data) {
        this.items=data.items;
        console.log(data);
        
      }
    }), (data) => {
      alert(data.error.message);
    }



    
    this.user.getTotAmt(this.currentUser).subscribe((data: any) => {
      if (data) {
        this.total=data.sum;
      }
    }), (data) => {
      alert(data.error.message);
    }

  }


}
