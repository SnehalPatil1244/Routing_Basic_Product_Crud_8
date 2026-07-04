import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppRoutingModule } from "src/app/app-routing.module";
import { IProduct } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@Component({
  selector: 'app-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrls: ['./product-dashboard.component.scss'],
})
export class ProductDashboardComponent implements OnInit {
  product !: Array<IProduct>

  constructor(private productservice: ProductService) { }

  ngOnInit(): void {
    this.productservice.fetchproducts()
      .subscribe({
        next: data => {
          this.product = data
        },
        error: err => {
          console.log(err);

        }
      })

  }

  trackbyfun(index : number, pro : IProduct){
    return pro.pid
  }

}
