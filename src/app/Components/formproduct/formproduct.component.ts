import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../../Services/product.service';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-formproduct',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule],
  templateUrl: './formproduct.component.html',
  styleUrl: './formproduct.component.css'
})
export default class FormproductComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route =inject(ActivatedRoute);
  private productService = inject(ProductService);
 

  form?: FormGroup;
  product?: Product;

ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id');

  if(id){
    this.productService.getProductsbyid(parseInt(id))
    .subscribe(product =>{
      this.product = product;
      this.form = this.fb.group({
        name:[product.name,[Validators.required]],
        fecha_registro:[product.fecha_registro,[Validators.required]],
        precio:[product.precio,[Validators.required]],
        stock:[product.stock,[Validators.required]]
      });    
    })
  }
  else{
    this.form = this.fb.group({
      name:['',[Validators.required]],
      fecha_registro:['',[Validators.required]],
      precio:['',[Validators.required]],
      stock:['',[Validators.required]]
    });
  
  }
}


  guardar(){
    const productForm = this.form!.value;
    
    if(this.product){
      this.productService.updateProduct(this.product.id, productForm)
      .subscribe(()=>{
        this.router.navigate(['/']);
      });
    }else{
    this.productService.createProducts(productForm)
    .subscribe(()=>{
      this.router.navigate(['/']);
      });
    }
  }
}
