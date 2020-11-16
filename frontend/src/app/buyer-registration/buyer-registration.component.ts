import { Component, OnInit } from '@angular/core';
import { Buyer1 } from './buyer';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BuyerRegistrationService } from '../services/buyer-registration.service';
import { AuthenticationService } from '../services/authentication.service';
import { AuthService } from 'angularx-social-login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buyer-registration',
  templateUrl: './buyer-registration.component.html',
  styleUrls: ['./buyer-registration.component.css']
})
export class BuyerRegistrationComponent implements OnInit {
  error: any = '';
  emailId;
  password = 'random';
  private responseObj;
  private loggedIn: boolean;
  public alreadyExists = false;

  private buyer: Buyer1 = new Buyer1();
  private registrationForm = new FormGroup({
    Email: new FormControl("", [Validators.required, Validators.email]),
    Name: new FormControl("", Validators.required),
    Phone: new FormControl("", [Validators.required, Validators.min(1000000000), Validators.max(9999999999)]),
    Password: new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(16)]),
  })

  // tslint:disable-next-line: max-line-length
  constructor(private buyerService: BuyerRegistrationService, 
              private authService: AuthService, 
              private authenticationService: AuthenticationService, 
              private router: Router) { }


  ngOnInit() {
  }

  addBuyer(email, name, phone, password) {
    // console.log(email1,name1,phone1,password1);
    //   this.buyer.buyerEmail = this.registrationForm.value.Email;
    //   this.buyer.buyerName = this.registrationForm.value.Name;
    //  this.buyer.buyerPhone = this.registrationForm.value.Phone;
    //   this.buyer.password = this.registrationForm.value.Password;
    this.buyer.buyerEmail = email;
    this.buyer.buyerName = name;
    this.buyer.buyerPhone = phone;
    this.buyer.password = password;
    console.log(this.buyer);

    this.buyerService.add(this.buyer).subscribe(data => {
      this.alreadyExists = false;
      this.router.navigate(['./login-page']);
    },
      error => {
        this.alreadyExists = true;
      });
  }
}
