import { Component, OnInit } from '@angular/core';
import { getDefaultCompilerOptions } from 'typescript';
import { UseraServicesService } from '../services/usera-services.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, Routes } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products = [];
  productslth = [];
  productshtl = [];
  showdefault = true;

  pricelistinglth;
  pricelistinghtl;
  constructor(private user: UseraServicesService, private router: Router) { }
  //products=[];
  ngOnInit(): void {
    this.user.getAllBooks().subscribe((data: any) => {
      if (data) {
        alert(data.message);
        console.log(data.book);
        this.products = data.book;
        //console.log(this.products);
      }
    }), (data) => {
      alert(data.error.message);
    }

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
  //getDefaultCompilerOptions()

  gotoBookDetails(){
    this.router.navigateByUrl('bookDetails');
  }
}

