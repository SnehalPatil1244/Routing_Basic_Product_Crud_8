import { Component, OnInit } from '@angular/core';
import { Ifairs } from '../../models/fairs';
import { FairsService } from '../../services/fairs.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-fairs-details',
  templateUrl: './fairs-details.component.html',
  styleUrls: ['./fairs-details.component.scss']
})
export class FairsDetailsComponent implements OnInit {
  fairId !: string
  fairObj !: Ifairs

  constructor(private fairservice: FairsService,
    private routes: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.routes.params.subscribe((param: Params) => {
      this.fairId = param['fairsId']
      if (this.fairId) {
        this.fairservice.fetchfairsById(this.fairId)
          .subscribe({
            next: res => {
              this.fairObj = res
            },
            error: err => {
              console.log(err);

            }
          })
      }

    })
  }

}
