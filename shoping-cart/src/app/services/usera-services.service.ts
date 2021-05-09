import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const options = {
  withCredentials: true
}


@Injectable({
  providedIn: 'root'
})
export class UseraServicesService {

currentUser="";
  constructor(private http: HttpClient) { }

  getAllBooks() {
    return this.http.get(environment.apiUrl + "/books/bookList");
  }

  listByLowtoHigh() {

    return this.http.get(environment.apiUrl + "/books/listByPrice/lowToHigh");
  }

  listByHightoLow() {
    return this.http.get(environment.apiUrl + "/books/listByPrice/highToLow");
  }

  login(userName: any, password: any) {
    const data = {
      userName,
      password
    }
    //alert(acno);
    return this.http.post(environment.apiUrl + "/userLogin", data, options)
  }

  addToCart(userName,isbnNo,noOfCopies){
    //alert("helloo");
    //alert(userName+isbnNo+noOfCopies);
    const data={
      userName,
      isbnNo,
      noOfCopies
    }
   return this.http.post(environment.apiUrl+"/useritem/addToCart",data);
  }

  userRegister(custName, userName, password, gender, dob, address, phoneNo, email) {
    const data = {
      custName,
      userName,
      password,
      gender,
      dob,
      address,
      phoneNo,
      email
    }
    return this.http.post(environment.apiUrl + "/userRegister", data)
  }

  userUpdate(custName, userName, password, gender, dob, address, phoneNo, email) {
    this.currentUser=localStorage.getItem("username");
    const data = {
      custName,
      userName,
      password,
      gender,
      dob,
      address,
      phoneNo,
      email
    }
    //return this.http.put(environment.apiUrl + "/userUpdate/:userName", data)
    return this.http.put(environment.apiUrl + "/userUpdate/"+this.currentUser, data,options)
  }

  getBookDetails(isbnNo){
    return this.http.get(environment.apiUrl+"/books/detailsByIsbn/"+isbnNo);
  }
  getUserDetails(userName){
    return this.http.get(environment.apiUrl + "/user/userdetails/"+userName);
  }

  viewMyCart(userName){
    return this.http.get(environment.apiUrl+"/viewCart/"+userName);
  }
getTotAmt(userName){
  return this.http.get(environment.apiUrl+"/getCartAmount/"+userName);
}

}




