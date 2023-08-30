import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { product } from '../../models/product';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

    products:product[] = [];
    categories:string[] = [];
    loading:boolean = false;
    cartProducts:any[] = []
  constructor(private service:ProductsService) { }

  ngOnInit(): void {
    this.getProducts()
    this.getCategories()
  }

  getProducts() {
    this.loading = true
    this.service.getAllProducts().subscribe((res:any) => {
      this.products = res
      this.loading = false
    })
  }
  getCategories() {
    this.loading = true
    this.service.getAllCategories().subscribe((res:any) => {
    this.categories = res
    this.loading = false
    })}
    
    filterCategory(event:any){

      let value = event.target.value
      if(value == 'all'){
       this.getProducts()
      }
      else{
      this.getProductCategory(value)
      }
    }
    getProductCategory(keyWord:string){
      this.loading = true 
      this.service.getProductsCategory(keyWord).subscribe((res:any)=>{
      this.loading = false
      this.products=res
      })
    }
    addToCart(event:any) {
     if("cart" in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!)
      let exist = this.cartProducts.find(item => item.item.id == event.item.id)
      if(exist) {
        alert("Product is already added in your cart")
      }else {
        this.cartProducts.push(event)
        localStorage.setItem("cart" , JSON.stringify(this.cartProducts))
      }
     }else {
      this.cartProducts.push(event)
      localStorage.setItem("cart" , JSON.stringify(this.cartProducts))
     }
    }
  }