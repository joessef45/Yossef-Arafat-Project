import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }
  getAllProducts() {
    return this.http.get("https://fakestoreapi.com/products")
  }
  getAllCategories(){
    return this.http.get("https://fakestoreapi.com/products/categories")
  }
  getProductsCategory(keyWord:string){
    return this.http.get("https://fakestoreapi.com/products/category/"+keyWord)
  }
  getProductById(id:any){
    return this.http.get("https://fakestoreapi.com/products/"+id)
  }
}
