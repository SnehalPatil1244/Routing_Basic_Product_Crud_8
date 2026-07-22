import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { FairsService } from '../../services/fairs.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  userRole !: string
  constructor(private productservice: ProductService,
    private userservice: UsersService,
    private fairservice: FairsService,
    private authservice: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userRole = this.authservice.getUserRole()!
    this.authservice.islading$.subscribe({
      next: res => {
        this.userRole = res
      }
    })
  }

  ongoproduct() {
    this.productservice.fetchproducts().subscribe(res => {
      this.router.navigate(['/products', res[0].pid], {
        queryParams: { cr: res[0].canReturn }
      })
    })
  }

  ongouser() {
    this.userservice.fetchusers().subscribe(res => {
      this.router.navigate(['/users', res[0].userId], {
        queryParams: { userRole: res[0].userRole }
      })
    })
  }

  ongofairs() {
    this.fairservice.fetchfairs().subscribe(res => {
      this.router.navigate(['/fairs', res[0].fairId])
    })
  }

  onlogout() {
    this.authservice.LogOut()
    this.router.navigate([''])
  }

}
