import { Component, OnInit } from '@angular/core';
import {Router,Routes} from '@angular/router';
import {UseraServicesService} from '../services/usera-services.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
currentUser='';
  constructor(private router:Router) { }

  ngOnInit(): void {
    
    
  }
cartClick(){
  this.currentUser=localStorage.getItem("username");
  alert(this.currentUser);
  if(this.currentUser)
  {
    this.router.navigateByUrl('userHome/userCart');
    
  }
  else{
    this.router.navigateByUrl('login');
  }
}

}
