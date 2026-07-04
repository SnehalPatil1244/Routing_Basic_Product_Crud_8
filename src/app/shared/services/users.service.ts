import { Injectable } from '@angular/core';
import { Iuser } from '../models/users';
import { Observable, of } from 'rxjs';
import { IProduct, IRes } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  UsersDetails: Array<Iuser> = [
    {
      userName: 'Rohit Yewale',
      userId: 'EMP101',
      userRole: 'Candidate',
      profileDescription: '3 years of experience in Angular development.',
      profileImage: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
      skills: ['Angular', 'TypeScript', 'RxJS', 'Bootstrap'],
      experienceYears: '3',
      isActive: true,
      address: {
        current: {
          city: 'Pune',
          state: 'Maharashtra',
          country: 'India',
          zipcode: '411001'
        },
        permanent: {
          city: 'Kolhapur',
          state: 'Maharashtra',
          country: 'India',
          zipcode: '416001'
        }
      },
      isAddSame: false
    },
    {
      userName: 'Snehal Patil',
      userId: 'EMP102',
      userRole: 'Admin',
      profileDescription: 'Experienced in Angular and responsive UI development.',
      profileImage: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
      skills: ['Angular', 'HTML', 'CSS', 'JavaScript'],
      experienceYears: '2',
      isActive: true,
      address: {
        current: {
          city: 'Mumbai',
          state: 'Maharashtra',
          country: 'India',
          zipcode: '400001'
        },
        permanent: {
          city: 'Satara',
          state: 'Maharashtra',
          country: 'India',
          zipcode: '415001'
        }
      },
      isAddSame: true
    }
  ];

  constructor() { }

  fetchusers(): Observable<Array<Iuser>> {
    return of(this.UsersDetails)
  }
  fetchproductsById(id: string): Observable<Iuser> {
    let Usersobj = this.UsersDetails.find(u => u.userId === id)!
    return of(Usersobj)
  }
  onAddUser(user: Iuser): Observable<IRes<Iuser>> {
    this.UsersDetails.push(user)
    return of({
      msg: `The New User With Id ${user.userId} IS Added Successfully !!`,
      data: user
    })
  }

  onupdateuser(updateduser: Iuser): Observable<IRes<Iuser>> {
    let getindex = this.UsersDetails.findIndex(u => u.userId === updateduser.userId)
    this.UsersDetails[getindex] = updateduser
    return of({
      msg: `The User With Id ${updateduser.userId} Is Updated Successfully !!`,
      data: updateduser
    })
  }
  onremoveuser(id: string) {
    let getindex = this.UsersDetails.findIndex(u => u.userId === id)
    let removeid = this.UsersDetails.splice(getindex, 1)
    return of({
      msg: `The User With Id ${removeid[0].userId} IS Removed Successfully !!`,
      data: removeid[0]
    })
  }
}
