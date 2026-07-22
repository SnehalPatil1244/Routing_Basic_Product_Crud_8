import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../models/product';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { SnackbarService } from '../../services/snackbar.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { GetConfirmationComponent } from '../get-confirmation/get-confirmation.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']

})
export class ProductsComponent implements OnInit {
  productId !: string
  productobj !: IProduct

  constructor(private routes: ActivatedRoute,
    private productservice: ProductService,
    private router: Router,
    private snackbar: SnackbarService,
    private matdialog: MatDialog
  ) {
    this.routes.data.subscribe(res => {
      this.productobj = res['products']
      this.productId = res['products'].pid
    })
  }

  ngOnInit(): void {
    // this.getproducts()
  }

  // getproducts() {
  //   this.routes.params.subscribe(param => {
  //     this.productId = param['productId']
  //     if (this.productId) {
  //       this.productservice.fetchproductsById(this.productId)
  //         .subscribe({
  //           next: data => {
  //             this.productobj = data
  //           }
  //         })
  //     }
  //   })
  // }

  onRemove() {
    let config = new MatDialogConfig()
    config.width = '300px'
    config.disableClose = true
    config.data = `Are You Sure ? You Want To Remove This Id ${this.productId}`
    let matref = this.matdialog.open(GetConfirmationComponent, config)
    matref.afterClosed().subscribe(res => {
      if (res) {
        this.productservice.removeproduct(this.productId).subscribe({
          next: res => {
            this.snackbar.opensnackbar(res.msg)
            this.productservice.fetchproducts().subscribe({
              next: res => {
                this.router.navigate(['/products', res[0].pid], {
                  queryParams: { cr: res[0].canReturn }
                })
              }
            })
          }, error: err => {
            console.log(err);

          }
        })
      }
    })
  }
  redirectToEdit() {
    this.router.navigate(['/products', this.productId, 'edit'], {
      queryParamsHandling: 'preserve',
      relativeTo: this.routes
    })
  }


}
