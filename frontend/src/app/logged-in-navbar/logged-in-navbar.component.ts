import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { AutoCompleteService } from '../services/auto-complete.service';

@Component({
  selector: 'app-logged-in-navbar',
  templateUrl: './logged-in-navbar.component.html',
  styleUrls: ['./logged-in-navbar.component.css']
})
export class LoggedInNavbarComponent implements OnInit {

  private productName: string;
  public notOnPayment = true;
  private token: string;
  private decToken: any;
  public isBuyer = true;

  // Autocomplete code
  private control = new FormControl();
  private streets: string[];
  // private streets: string[] = ['Vishal', 'Vishesh', 'Vimal',
  // 'Tathagat'];
  private filteredStreets: Observable<string[]>;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private autoCompleteService: AutoCompleteService) { }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.decToken = this.checkToken(this.token);
    if (this.decToken.role === 'seller') {
      this.isBuyer = false;
    }

    // Autocomplete code
    this.autoCompleteService.getAllProductsList().subscribe( data =>
      {
        this.streets = data;
        console.log(this.streets);

        this.filteredStreets = this.control.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value))
        );
      }
    );
  }

  toSearch(event) {
    this.productName = event.target.value;
    this.router.navigate(['']).then(() =>
      {
        this.router.navigate(['./search', { name: this.productName }])
      }
    );
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['']);
  }

  goToBuyerProfile() {
    if (this.decToken.role === 'buyer') {
      this.router.navigate(['./buyer-profile', { eMail: localStorage.getItem('emailId') }]);
    }
    if (this.decToken.role === 'seller') {
      this.router.navigate(['./seller-dashboard', { eMail: localStorage.getItem('emailId') }]);
    }
  }

  goToBuyerProfileLogo() {
    if (this.decToken.role === 'buyer') {
      this.router.navigate(['']);
    }
    if (this.decToken.role === 'seller') {
      this.router.navigate(['./seller-dashboard', { eMail: localStorage.getItem('emailId') }]);
    }
  }

  checkToken(tokenStr) {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(tokenStr);
    return decodedToken;
  }

  // Autocomplete code
  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.streets.filter(street => this._normalizeValue(street).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

}
