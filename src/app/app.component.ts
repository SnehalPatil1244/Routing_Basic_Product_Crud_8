import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { SpinnerService } from './shared/services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoading : boolean = false
  private spinnerservice = inject(SpinnerService)
  private cdr = inject(ChangeDetectorRef)
  title = 'Routing_Basic_Product_Crud_8';

    ngOnInit(): void {
    this.spinnerservice.isLoading$.subscribe({
      next : res => {
        this.isLoading = res
        this.cdr.detectChanges()
      }
    })
  }
}
