import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ContactUsService } from 'src/app/services/contact-us.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  userForm: FormGroup;

  constructor(private fb: FormBuilder,public auth:AuthService,public route:Router,public contact:ContactUsService) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      discussion:[,[Validators.required, Validators.maxLength(1000)]]
    })
  }


  onSubmit(form: FormGroup) {
    if(!form.valid) return;
    form.value.uid = this.auth.currentUserId;
    form.value.userData = this.auth.userData
    this.contact.contactUs(form.value).then(data => {
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
