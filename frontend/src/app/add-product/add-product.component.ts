import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { AddProductService } from '../services/add-product.service';
import { FileUploadService } from '../services/file-upload.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { getMultipleValuesInSingleSelectionError } from '@angular/cdk/collections';

export interface Category {
  value: string;
  viewValue: string;
}

export interface ElecCategory {
  value: string;
  viewValue: string;
}

export interface BookGenre {
  value: string;
  viewValue: string;
}

export function requiredFileType(type: string) {
  return function (control: FormControl) {
    const file = control.value;
    if (file) {
      const extension = file.name.split('.')[1].toLowerCase();
      if (type.toLowerCase() !== extension.toLowerCase()) {
        return {
          requiredFileType: true
        };
      }
      return null;
    }
    return null;
  };
}

export class Seller {
  sellerId: string;
  productPrice: number;
  productStock: number;
}

export class Product {
  productCategory: string;
  productSubCategory: string;
  productName: string;
  productDescription: string;
  productImage: string;
  productBrandName: string;
  sellers: Seller[];
}

export class Book {
  bookCategory: string;
  bookSubCategory: string;
  bookTitle: string;
  bookAuthor: string;
  bookISBN: string;
  bookPublisher: string;
  bookDescription: string;
  bookImage: string;
  sellers: Seller[];
}

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  isElectronic = true;
  filteredOptions: Observable<any[]>;
  eMail;
  isFormFull = false;
  alreadyExists=false;
  product: Product = {
    productCategory: '',
    productSubCategory: '',
    productName: '',
    productDescription: '',
    productImage: '',
    productBrandName: '',
    sellers: [{
      productStock: 0,
      sellerId: '',
      productPrice: 0
    }]
  };

  book: Book = {
    bookISBN: '',
    bookAuthor: '',
    bookTitle: '',
    bookDescription: '',
    bookCategory: '',
    bookSubCategory: '',
    bookPublisher: '',
    bookImage: '',
    sellers: [{
      productStock: 0,
      productPrice: 0,
      sellerId: ''
    }]
  }
  constructor(private _formBuilder: FormBuilder, private host: ElementRef<HTMLInputElement>, private router: Router,
    private route: ActivatedRoute, private addProductService: AddProductService, private fileUp: FileUploadService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.eMail = params.get('eMail');
    });
    console.log(this.eMail);

    this.eMail = localStorage.getItem('emailId');

    this.firstFormGroup = this._formBuilder.group({
      category1: ['', Validators.required],
      subcategory: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      brandName: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      author: ['', Validators.required],
      isbn: ['', Validators.required],
      publisher: ['', Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({

      quantity: ['', Validators.required],
      price: ['', Validators.required],

    });

    this.filteredOptions = this.firstFormGroup.controls['subcategory'].valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }


  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.eleCat.filter(ele => ele.value.toLowerCase().includes(filterValue));
  }

  category: Category[] = [
    { value: 'electronics', viewValue: 'Electronics' },
    { value: 'accessories', viewValue: 'Accessories'},
    { value: 'books', viewValue: 'Books'},
    { value: 'fashion', viewValue: 'Fashion'},
    { value: 'appliances', viewValue: 'Appliances'}
  ];

  eleCat: ElecCategory[] = [
    { value: 'mobiles', viewValue: 'Mobiles' },
    { value: 'laptops', viewValue: 'Laptops' },
    { value: 'computers', viewValue: 'Computers' },
    { value: 'speaker', viewValue: 'Speakers' },
    { value: 'telivision', viewValue: 'TVs' },
    { value: 'home audio', viewValue: 'Home Audio' },
    { value: 'tablet', viewValue: 'Tablet' },
    { value: 'digital watch', viewValue: 'Digital Watches'},
    {  value: 'gaming', viewValue: 'Gaming' } 
  ];

  genres: BookGenre[] = [
    { value: 'romantic', viewValue: 'Romantic' },
    { value: 'horror', viewValue: 'Horror' },
    { value: 'thriller', viewValue: 'Thriller' },
    { value: 'self-help', viewValue: 'Self-Help' },
    { value: 'comic', viewValue: 'Comics' },
    { value: 'sci-fi', viewValue: 'Sci-Fi' },
    { value: 'fantasy', viewValue: 'Fantasy' },
    { value: 'drama', viewValue: 'Drama' },
    { value: 'poetry', viewValue: 'Poetry' }
  ];

  access: any[]=[
    { value:'watches', viewValue: 'Watches'},
    { value: 'smart wearables', viewValue: 'Smart Wearables' },
    { value: 'sun glasses', viewValue: 'Sun Glasses' },
    { value: 'headphones', viewValue: 'Headphones' },
    { value: 'bags', viewValue: 'Bags' },
    { value: 'backpacks', viewValue: 'BackPacks' },
    { value: 'wallets', viewValue: 'Wallets' },
    { value: 'helmets', viewValue: 'Helmets' },
    { value: 'caps', viewValue: 'Caps' },
    { value: 'earphones', viewValue: 'EarPhones' },
    { value: 'charger', viewValue: 'Chargers' }
  ]
  getCat() {
    console.log(this.firstFormGroup.value.category1);
    if (this.firstFormGroup.value.category1 === 'accessories') {
      this.isElectronic = false;
    }
    else
      this.isElectronic = true;
  }

  takeInfoProduct() {
    this.product.productCategory = this.firstFormGroup.value.category1;
    this.product.productSubCategory = this.firstFormGroup.value.subcategory;
    this.product.productName = this.secondFormGroup.value.name;
    this.product.productDescription = this.secondFormGroup.value.description;
    this.product.productBrandName = this.secondFormGroup.value.brandName;
    this.giveImage();
    this.product.sellers[0].productStock = this.fourthFormGroup.value.quantity;
    this.product.sellers[0].productPrice = this.fourthFormGroup.value.price;
    this.product.sellers[0].sellerId = this.eMail;
    console.log(this.product);
    this.addProductService.addProduct(this.product).subscribe(data=>{
      this.alreadyExists=false;
      this.router.navigate(['./seller-dashboard-inventory', { eMail: this.eMail }]);
    },
    error=>{
      this.alreadyExists=true;
    });
    
  }
  takeInfoBook() {
    this.book.bookCategory = this.firstFormGroup.value.category1;
    this.book.bookSubCategory = this.firstFormGroup.value.subcategory;
    this.book.bookAuthor = this.thirdFormGroup.value.author;
    this.book.bookTitle = this.thirdFormGroup.value.title;
    this.book.bookDescription = this.thirdFormGroup.value.description;
    this.book.bookISBN = this.thirdFormGroup.value.isbn;
    this.book.bookPublisher = this.thirdFormGroup.value.publisher;
    this.book.sellers[0].productPrice = this.fourthFormGroup.value.price;
    this.book.sellers[0].productStock = this.fourthFormGroup.value.quantity;
    this.book.sellers[0].sellerId = this.eMail;
    this.addProductService.addBook(this.book).subscribe();
    this.router.navigate(['./seller-dashboard-inventory', { eMail: this.eMail }]);
  }

  giveImage() {
    console.log(this.fileUp.getImage());
    console.log(this.isElectronic);
    this.product.productImage = this.fileUp.getImage();
    
  }

  isDisabled() {
    if (this.isElectronic) {
      if (this.firstFormGroup.value.category1 == null || this.firstFormGroup.value.subcategory == null
        || this.secondFormGroup.value.name == null || this.secondFormGroup.value.description == null
        || this.secondFormGroup.value.brandName == null || this.fourthFormGroup.value.quantity == null
        || this.fourthFormGroup.value.price == null) {
        this.isFormFull = true;
      }
      else {
        this.isFormFull = false;
      }

      return this.isFormFull;
    }
  }
}
