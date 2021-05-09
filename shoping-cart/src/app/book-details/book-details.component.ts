import { Component, OnInit } from '@angular/core';
import { UseraServicesService } from '../services/usera-services.service';
import { Router, Routes } from '@angular/router';
@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  currentUser = '';
  customername = '';
  isbnNo = '';
  bookDetails = [];
  bookName = '';
  bookImage = '';
  author = '';
  inStock = '';
  price = '';
  description = ';'
  loginuseropt;
  useropt;
  noOfCopies;
  constructor(private user: UseraServicesService, private router: Router) { }

  ngOnInit(): void {
    this.customername = localStorage.getItem('customername');
    if (this.currentUser) {
      this.loginuseropt = true;
      this.useropt = false;
    }
    else {
      this.loginuseropt = false;
      this.useropt = true;
    }
    this.isbnNo = localStorage.getItem('isbnNo');
    this.user.getBookDetails(this.isbnNo).subscribe((data: any) => {
      if (data) {
        alert(data.message);
        this.bookDetails = data.bookDetails;
        this.bookName = data.bookDetails.bookName;
        this.bookImage = data.bookDetails.bookImage;
        this.author = data.bookDetails.author;
        this.inStock = data.bookDetails.inStock;
        this.price = data.bookDetails.price;
        this.description = data.bookDetails.description;
      }
    }), (data) => {
      alert(data.error.message);
    }

    this.currentUser = localStorage.getItem("username");
    this.customername = localStorage.getItem("customername");
  }
  gotoLogin() {
    this.router.navigateByUrl('login');
  }
  gotoViewAccount() {
    this.router.navigateByUrl('userHome/userView');
  }
  gotoUpdateAccount() {
    this.router.navigateByUrl('userHome/userUpdate');
  }
  gotoRegister() {
    this.router.navigateByUrl('userRegister');
  }
  gotoMyCart() {
    this.router.navigateByUrl('userCart');
  }

  getValue(event) {
    this.noOfCopies = event.target.value;
    //alert(this.noOfCopies);
    
  }

  addToCart() {
    //alert("hiiiii");
    if(this.noOfCopies==null){
      alert("Select number of copies.");
    }
    else{
    this.user.addToCart(this.currentUser, this.isbnNo, this.noOfCopies)
    .subscribe((data: any) => {
      if (data) {
        alert(data.message);
      }
    }), (data) => {
      alert(data.error.message);
    }
  }
  }

}
