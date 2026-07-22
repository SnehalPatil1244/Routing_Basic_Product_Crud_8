import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { IProduct } from "../models/product";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ProductService } from "./product.service";


@Injectable({
    providedIn: "root"
})
export class productResolver implements Resolve<IProduct[]> {
    private productservice = inject(ProductService)
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IProduct[] | Observable<IProduct[]> | Promise<IProduct[]> {
        return this.productservice.fetchproducts()
    }

}