import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class ProductDetailsService {

  constructor(private db: AngularFireDatabase, private _http: HttpClient, private router:Router) { }

  inCartProductList: AngularFireList<any>;


                  //firebase code for getting in db
                  getInProductList() 
                    {
                        //let email1="suhail@gmail.com";
                        let email1=localStorage.getItem('emailId');
                        if(!email1) return;
                        
                        const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
                        const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
                        const p = new RegExp(a.split('').join('|'), 'g')

                        //let email = "suhail.khan@gmail.com"
                        
                      
                        email1 = email1.toString().toLowerCase()
                        .replace(/\s+/g, '-') // Replace spaces with -
                        .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
                        .replace(/&/g, '-and-') // Replace & with 'and'
                        .replace(/[^\w\-]+/g, '') // Remove all non-word characters
                        .replace(/\-\-+/g, '-') // Replace multiple - with single -
                        .replace(/^-+/, '') // Trim - from start of text
                        .replace(/-+$/, '') // Trim - from end of text
                      

                        this.inCartProductList = this.db.list("inCartProductList/" + email1);
                        return this.inCartProductList.snapshotChanges();


                    }


            //firebase code for inserting in db
            insertInProductList(product, seller, inCartProduct) {
            console.log("incoming product 1 is : ", product);
            console.log("incoming product 2 is : ", inCartProduct);

            const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
            const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
            const p = new RegExp(a.split('').join('|'), 'g')

            //let email = "sohail@gmail.com"
            
            let email=localStorage.getItem('emailId');
            if(email!=null){
            email = email.toString().toLowerCase()
            .replace(/\s+/g, '-') // Replace spaces with -
            .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
            .replace(/&/g, '-and-') // Replace & with 'and'
            .replace(/[^\w\-]+/g, '') // Remove all non-word characters
            .replace(/\-\-+/g, '-') // Replace multiple - with single -
            .replace(/^-+/, '') // Trim - from start of text
            .replace(/-+$/, '') // Trim - from end of text
            }
            this.db.list("inCartProductList/" + email).push({
            
                    productBrandName: inCartProduct.productBrandName,
                    productDescription: inCartProduct.productDescription,
                    productId: inCartProduct.productId,
                    productImage: inCartProduct.productImage,
                    productName: inCartProduct.productName,
                    productPrice:inCartProduct.productPrice,
                    productQty:inCartProduct.productQty,
                    inCartTotal:inCartProduct.inCartTotal,
                    userEmail:inCartProduct.userEmail,
                    sellerEmail:inCartProduct.sellerEmail,
            });
            console.log("incoming product 3 is : ", seller);
      }

          //firebase code for deleting in db
          deleteIncartProduct($key: string) 
              {
                this.inCartProductList.remove($key);
                this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
                  this.router.navigateByUrl('/app-incart-products')
                })
              }

        //firebase code for updating
        updateIncartProduct(inCartProduct) {
          console.log("is this getting called ??")
          const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
          const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
          const p = new RegExp(a.split('').join('|'), 'g')

          
          
          let email=localStorage.getItem('emailId');
          let q= inCartProduct.$key;
          email = email.toString().toLowerCase()
          .replace(/\s+/g, '-') // Replace spaces with -
          .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
          .replace(/&/g, '-and-') // Replace & with 'and'
          .replace(/[^\w\-]+/g, '') // Remove all non-word characters
          .replace(/\-\-+/g, '-') // Replace multiple - with single -
          .replace(/^-+/, '') // Trim - from start of text
          .replace(/-+$/, '') // Trim - from end of text
          
          
          console.log(`inCartProductList/${email}/${q}`);
          console.log(this.db.object('inCartProductList').valueChanges());
          console.log({
            
            productDescription: inCartProduct.productDescription,
            productId: inCartProduct.productId,
            productImage: inCartProduct.productImage,
            productName: inCartProduct.productName,
            productPrice: inCartProduct.productPrice,
            productQty: inCartProduct.productQty,
            inCartTotal: inCartProduct.inCartTotal,
            userEmail:inCartProduct.userEmail,
            sellerEmail:inCartProduct.sellerEmail,
        })


          //this.db.object(`inCartProductList/${email}/`).remove()
          this.db.object(`inCartProductList/${email}/${q}`).update({
            
              productDescription: inCartProduct.productDescription,
              productId: inCartProduct.productId,
              productImage: inCartProduct.productImage,
              productName: inCartProduct.productName,
              productPrice: inCartProduct.productPrice,
              productQty: inCartProduct.productQty,
              inCartTotal: inCartProduct.inCartTotal,
              userEmail:inCartProduct.userEmail,
              sellerEmail:inCartProduct.sellerEmail,
          });
          console.log('hello');
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigateByUrl('/app-incart-products')
          })
          
        }

        deleteIncartOnPay(inCartProduct) {
          console.log(" delete incart on pay is getting called ??")
          const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
          const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
          const p = new RegExp(a.split('').join('|'), 'g')
          let email=localStorage.getItem('emailId');
        // let q= inCartProduct.$key;
          email = email.toString().toLowerCase()
          .replace(/\s+/g, '-') // Replace spaces with -
          .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
          .replace(/&/g, '-and-') // Replace & with 'and'
          .replace(/[^\w\-]+/g, '') // Remove all non-word characters
          .replace(/\-\-+/g, '-') // Replace multiple - with single -
          .replace(/^-+/, '') // Trim - from start of text
          .replace(/-+$/, '') // Trim - from end of text
          //console.log(inCartProductList/${email}/${q});
          //console.log(this.db.object('inCartProductList').valueChanges());
          this.db.object(`inCartProductList/${email}/`).remove()
          console.log('hello from delete on pay');
        }

        // temporary jason-server methods
        getProductInfo(): Observable<any> {
          return this._http.get<any>("http://localhost:3000/posts/Kitty%20Cat");
        }

        addProductToCart(product): Observable<any> {
          console.log(product, 'from service');

          return this._http.post<any>("http://localhost:3000/cart/", product);
        }

        addProductToWishlist(product): Observable<any> {
          return this._http.post<any>("http://localhost:3000/wishlist/", product);
        }
  //////////////////////////////////////////////////////////////////////////
}
