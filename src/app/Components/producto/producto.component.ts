import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { DatePipe } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [DatePipe,RouterModule,RouterLink],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export default class ProductoComponent implements OnInit {
  private productService = inject(ProductService);

  products: Product[] = [];

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(){
    this.productService.getProducts()
    .subscribe(products =>{
      this.products = products;
    })
  }

  borrarProduct(product: Product){
    this.productService.deleteProduct(product.id)
    .subscribe(()=>{
      this.cargarProductos();
    })
  }
}
