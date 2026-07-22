import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Iuser } from '../../models/users';
import { UsersService } from '../../services/users.service';
import { SnackbarService } from '../../services/snackbar.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  UserForm !: FormGroup
  isinEditMode: boolean = false
  edituser !: Iuser
  userId !: string

  constructor(private userservice: UsersService,
    private snackbar: SnackbarService,
    private router: Router,
    private routes: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.createUserForm()
    this.isPermenanentAddHandler()
    this.isAddSameHandler()
    this.patchvalueinForm()
  }

  isPermenanentAddHandler() {
    this.formcontrols['address'].get('current')?.valueChanges
      .subscribe(val => {
        if (this.formcontrols['address'].get('current')?.valid) {
          this.formcontrols['isAddSame'].enable()
        } else {
          this.formcontrols['isAddSame'].reset()
          this.formcontrols['isAddSame'].disable()
        }
      })
  }

  isAddSameHandler() {
    this.formcontrols['isAddSame'].valueChanges
      .subscribe(val => {
        if (val) {
          let currentAdd = this.formcontrols['address'].get('current')?.value
          this.formcontrols['address'].get('permanent')?.patchValue(currentAdd)
          this.formcontrols['address'].get('permanent')?.disable()
        } else if (this.isinEditMode && !val) {
          this.formcontrols['address'].get('permanent')?.patchValue(this.edituser.address.permanent)
          this.formcontrols['address'].get('permanent')?.enable()
        }
        else {
          this.formcontrols['address'].get('permanent')?.reset()
          this.formcontrols['address'].get('permanent')?.disable()
        }
      })
  }

  createUserForm() {
    this.UserForm = new FormGroup({
      userName: new FormControl(null, [Validators.required]),
      userRole: new FormControl('Candidate'),
      profileDescription: new FormControl(null, Validators.required),
      profileImage: new FormControl(null, [Validators.required]),
      experienceYears: new FormControl(null, [Validators.required]),
      isActive: new FormControl(null, [Validators.required]),
      isAddSame: new FormControl({ value: null, disabled: true }),
      skills: new FormArray([]),

      address: new FormGroup({
        current: new FormGroup({
          city: new FormControl(null, [Validators.required]),
          state: new FormControl(null, [Validators.required]),
          country: new FormControl('India'),
          zipcode: new FormControl(null, [Validators.required])
        }),
        permanent: new FormGroup({
          city: new FormControl(null, [Validators.required]),
          state: new FormControl(null, [Validators.required]),
          country: new FormControl('India'),
          zipcode: new FormControl(null, [Validators.required])
        })
      })
    })
  }
  addSkillsControl() {
    let skillcontrol = new FormControl(null, [Validators.required])
    this.skillsArr.push(skillcontrol)
  }

  get formcontrols() {
    return this.UserForm.controls
  }
  get skillsArr() {
    return this.formcontrols['skills'] as FormArray
  }

  onusersubmit() {
    if (this.UserForm.invalid) {
      this.UserForm.markAllAsTouched()
    } else {
      let UserDetails = { ...this.UserForm.getRawValue(), userId: Date.now().toString() }
      this.userservice.onAddUser(UserDetails)
        .subscribe({
          next: res => {
            this.snackbar.opensnackbar(res.msg)
            this.router.navigate(['/users', res.data.userId])
          },
          error: err => {
            this.snackbar.opensnackbar(err.msg)
          }
        })
    }
  }
  patchvalueinForm() {
    this.userId = this.routes.snapshot.paramMap.get('userId')!
    if (this.userId) {
      this.userservice.fetchproductsById(this.userId).subscribe({
        next: res => {
          this.edituser = res
          this.isinEditMode = true
          this.UserForm.patchValue(this.edituser)
          if (res.userRole === 'Candidate') {
            this.UserForm.disable()
          }
          this.skillsArr.clear()
          this.edituser.skills.forEach(ele => {
            let control = new FormControl({
              value : ele,
              disabled : res.userRole === 'Candidate'
            })
            this.skillsArr.push(control)
          })
        }

      })
    }

  }


  onupdate() {

    if (this.UserForm.invalid) {
      this.UserForm.markAllAsTouched()
    } else {
      let userupdated = { ...this.UserForm.getRawValue(), userId: this.userId }
      this.userservice.onupdateuser(userupdated)
        .subscribe({
          next: res => {
            this.snackbar.opensnackbar(res.msg)
            this.router.navigate(['/users', res.data.userId])
          },
          error: err => {
            this.snackbar.opensnackbar(err.msg)
          }
        })
    }
  }

  onremoveskills(i: number) {
    this.skillsArr.removeAt(i)
  }

  canDeactivate(): boolean {
    if (!!this.UserForm.dirty && this.isinEditMode) {
      return confirm(`Are You Sure You Want To Discard The Changes !!`)
    }
    return true
  }
}

