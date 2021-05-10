import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnInit {
  @Input()
  userData;
  userForm: FormGroup;
  constructor(private fb: FormBuilder,public user:UserService,public auth:AuthService,public route:Router) { }

  ngOnInit(): void {
    this.auth.authenticationState.subscribe(val => {
      if(!val){
        this.route.navigateByUrl('auth')
      }
    })
    this.userForm = this.fb.group({
      pincode: [,[Validators.required,Validators.min(100000),Validators.max(999999)]],
      phoneNumber:[,[Validators.required, Validators.pattern("^[0-9]{10}$")]]
    })
  }


  onSubmit(form: FormGroup) {
    if(!form.valid) return;
    form.value.uid = this.auth.currentUserId;
    this.user.updateUser(form.value).then(data => {
      this.userForm.reset();
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })
    });
  }

}
