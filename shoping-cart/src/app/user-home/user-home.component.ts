import { Component, OnInit } from '@angular/core';
import { getDefaultCompilerOptions } from 'typescript';
import { UseraServicesService } from '../services/usera-services.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, Routes } from '@angular/router';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  products = [];
  productslth = [];
  productshtl = [];
  showdefault = true;
 currentUser="";
 customername="";
  pricelistinglth;
  pricelistinghtl;
  constructor(private user: UseraServicesService, private router: Router) { }

  ngOnInit(): void {
    this.user.getAllBooks().subscribe((data: any) => {
      if (data) {
        alert(data.message);
        console.log(data.book);
        this.products = data.book;
      }
    }), (data) => {
      alert(data.error.message);
    }

    this.currentUser=localStorage.getItem("username");
    this.customername=localStorage.getItem("customername");
  }
  listByLowtoHigh() {
    this.user.listByLowtoHigh().subscribe((data: any)=> {
      if (data) {
        alert(data.message);
        this.productslth = data.book;
        console.log("hellooo");

       this.showdefault = false;
        this.pricelistinglth =true;
        this.pricelistinghtl = false;
      }
    }),(data) => {
      alert(data.error.message);
    }
  }

  listByHightoLow() {
    this.user.listByHightoLow().subscribe((data: any)=> {
      if (data) {
        alert(data.message);
        this.productshtl = data.book;
        this.showdefault = false;
        this.pricelistinglth =false;
        this.pricelistinghtl = true;
      }
    }),(data) => {
      alert(data.error.message);
    }
  }
  gotoBookDetails(isbnno){
   // alert(isbnNo);
    localStorage.setItem("isbnNo",isbnno);
    this.router.navigateByUrl('bookDetails');
  }
  //getDefaultCompilerOptions()
}

