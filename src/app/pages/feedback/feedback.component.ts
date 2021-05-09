import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  userForm: FormGroup;

  constructor(private fb: FormBuilder,public auth:AuthService,public user:UserService,public route:Router) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      feedback:[,[Validators.required, Validators.maxLength(1000)]]
    })
  }


  onSubmit(form: FormGroup) {
    if(!form.valid) return;
    form.value.uid = this.auth.currentUserId;
    form.value.userData = this.auth.userData
    this.user.feedback(form.value).then(data => {
      this.userForm.reset();
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })
      this.route.navigateByUrl('home')
    });
  }
}
