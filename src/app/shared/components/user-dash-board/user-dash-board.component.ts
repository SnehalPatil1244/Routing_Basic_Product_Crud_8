import { Component, OnInit } from '@angular/core';
import { Iuser } from '../../models/users';
import { UsersService } from '../../services/users.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-user-dash-board',
  templateUrl: './user-dash-board.component.html',
  styleUrls: ['./user-dash-board.component.scss']
})
export class UserDashBoardComponent implements OnInit {
UsersArr : Iuser[] = []

  constructor(private Userservice : UsersService,
              private snackbar : SnackbarService
  ) { }

  ngOnInit(): void {
    this.getusers()
  }

  getusers(){
    this.Userservice.fetchusers().subscribe({
      next : res => {
        this.UsersArr = res
      },
      error : err => {
        console.log(err);
        
      }
    })
  }

}
