import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
isLoading$ : BehaviorSubject<boolean> = new BehaviorSubject(false)
isLoadingObs$ = this.isLoading$.asObservable()
  constructor() { }
  emitLoadingobs$(flag : boolean){
    this.isLoading$.next(flag)
  }
}
