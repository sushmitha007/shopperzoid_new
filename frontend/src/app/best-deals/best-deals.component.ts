import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DealsService } from '../services/deals.service';
import { IncartProducts } from '../incart-products/incartProducts';
import { ProductDetailsService } from '../services/product-details.service';
import { RecommendationService } from '../services/recommendation.service';

@Component({
  selector: 'app-best-deals',
  templateUrl: './best-deals.component.html',
  styleUrls: ['./best-deals.component.css']
})
export class BestDealsComponent implements OnInit {

  public products =  {};
  public searchProductName = {};
  public getProduct:any;
  public isCheckedMore = true;
  public isData = true;
  private seller:any;
  private incartProduct: IncartProducts = new IncartProducts();


  constructor(private route: ActivatedRoute,
              private _dealsService: DealsService,
              private router: Router,
              private _productDetailsService: ProductDetailsService,
              private _recommendationService: RecommendationService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.searchProductName = params.get('name');
    });
    this._dealsService.findProduct(this.searchProductName.toString().toLowerCase()).subscribe(data => {
      if (data) {
        this.isData = true;
        this.products = data;
      }
      },
      error => {
        console.log(error);
        this.isData = false;
    });

    this._dealsService.findProductByName(this.searchProductName.toString().toLowerCase()).subscribe(data => {
      if (data) {
        this.isData = true;
        this.getProduct = data;
      }
      },
      error => {
        console.log(error);
        this.isData = false;
      });

  }

  goToProduct(sellerId){
    this.router.navigate(['./product-details', { sellerId: sellerId,
      searchProductName: this.searchProductName.toString().toLowerCase()}]);
  }

  checkMore() {
    console.log(this.getProduct+'hello');
    this.isCheckedMore =! (this.isCheckedMore);
  }

  buyItem(sellerId){
    console.log(this.getProduct);
    console.log(sellerId);
    this._dealsService.findSellerById(this.searchProductName, sellerId).subscribe(response =>
      {
        this.seller = response;
        console.log(this.seller);
        this.incartProduct.productBrandName = this.getProduct.productBrandName;
        this.incartProduct.productDescription = this.getProduct.productDescription;
        this.incartProduct.productPrice = this.seller.productPrice;
        this.incartProduct.productImage = this.getProduct.productImage;
        this.incartProduct.productQty = 1;
        this.incartProduct.productName = this.getProduct.productName;
        this.incartProduct.productId = this.getProduct.productId;
        this.incartProduct.inCartTotal = 0;
        this.incartProduct.userEmail = localStorage.getItem('emailId');
        this.incartProduct.sellerEmail = sellerId;
        this._productDetailsService.insertInProductList(this.getProduct, this.seller, this.incartProduct);
        if(this.incartProduct.userEmail === null){
          this.router.navigate(['./login-page']);
        }
        else{
        this._recommendationService.addProductToCart(this.incartProduct.userEmail, this.incartProduct.productName);
        this.router.navigate(['./app-incart-products', { product:this.getProduct }]);
        }
      }
    );
        
  }

  

}
