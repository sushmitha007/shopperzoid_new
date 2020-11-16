import { Component, OnInit, Directive } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SocialLoginService } from '../services/social-login.service';
import { AuthService, SocialUser } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { BuyerRegistrationService } from '../services/buyer-registration.service';
import { Buyer1 } from '../buyer-registration/buyer';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent implements OnInit {

  public emailId = '';
  public password = '';
  private invalidLogin = true;
  public decodedToken;
  public notRegistered = false;
  private user: SocialUser;
  private loggedIn: boolean;
  loginType;


  private buyer: Buyer1 = new Buyer1();

  private loginForm = new FormGroup({
    Email: new FormControl("", [Validators.required, Validators.email]),
    Password: new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(16)]),
  });

  constructor(private buyerService: BuyerRegistrationService, 
    private socialLogin: SocialLoginService, 
    private authService: AuthService, 
    private authenticationService: AuthenticationService, 
    private router: Router) { }

  ngOnInit() { }

  checkLogin(){
    // console.log(this.loginForm.value);
    this.emailId = this.loginForm.value.Email;
    this.password = this.loginForm.value.Password;

    (this.authenticationService.authenticate(this.emailId, this.password).subscribe(

      data => {
        console.log(data);
        if(data){
          this.decodedToken = this.checkToken(JSON.stringify(data));
          localStorage.setItem('token',data.token);
          localStorage.setItem('emailId',this.decodedToken.sub)
          console.log(this.decodedToken);
          if(this.decodedToken.role === "buyer"){
            
            this.router.navigate(['./buyer-dashboard', {emailId:this.emailId}]);
          }
          if(this.decodedToken.role === "seller"){
        
            console.log(this.emailId);
            this.router.navigate(['./seller-dashboard', {emailId:this.emailId}]);
          }
        }
      },
      error => {
        // this.spinner.hide();
        this.notRegistered = true;
      }
    ));
  }

  checkToken(tokenStr) {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(tokenStr);
    return decodedToken;
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.emailId = this.user.email;
      this.loginType = 'google';
      console.log(this.user);
      console.log(this.user);
      this.loggedIn = (user != null);
      this.router.navigate(['/buyer-dashboard', { emailId: this.emailId}]);
      this.buyer.buyerEmail = this.user.email;
      this.buyer.buyerName = this.user.name;
      this.buyerService.add(this.buyer).subscribe();
    });
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(this.user);
      this.emailId = this.user.email;
      this.loginType = 'facebook';
      console.log(this.user);
      this.loggedIn = (user != null);
      this.authenticationService.login(this.emailId, this.password, this.loginType);
      this.router.navigate(['/buyer-dashboard', { emailId: this.emailId}]);
      this.buyer.buyerEmail = this.user.email;
      this.buyer.buyerName = this.user.name;
      this.buyerService.add(this.buyer).subscribe();
    });
  }

  addBuyer(email,name,phone,password) {
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

    this.buyerService.add(this.buyer).subscribe();
  }

}
