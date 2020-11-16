import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { AutoCompleteService } from '../services/auto-complete.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private productName: string;

  // Autocomplete code
  private control = new FormControl();
  private streets: string[];
  // private streets: string[] = ['Vishal', 'Vishesh', 'Vimal',
  // 'Tathagat'];
  private filteredStreets: Observable<string[]>;

  constructor(private router: Router,
              private autoCompleteService: AutoCompleteService) { }

  ngOnInit() {
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

  // Autocomplete code
  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.streets.filter(street => this._normalizeValue(street).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

}
