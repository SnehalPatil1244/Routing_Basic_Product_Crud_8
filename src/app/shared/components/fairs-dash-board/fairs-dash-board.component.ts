import { Component, OnInit } from '@angular/core';
import { Ifairs } from '../../models/fairs';
import { FairsService } from '../../services/fairs.service';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "src/app/app-routing.module";

@Component({
  selector: 'app-fairs-dash-board',
  templateUrl: './fairs-dash-board.component.html',
  styleUrls: ['./fairs-dash-board.component.scss'],

})
export class FairsDashBoardComponent implements OnInit {
  fairsArr: Ifairs[] = []
  constructor(private fairsservice: FairsService) { }

  ngOnInit(): void {
    this.getfairs()
  }

  getfairs() {
    this.fairsservice.fetchfairs().subscribe({
      next: res => {
        this.fairsArr = res
      },
      error: err => {
        console.log(err);

      }
    })

  }

}
