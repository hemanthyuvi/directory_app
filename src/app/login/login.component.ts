import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { DirectoryService } from '../services/directory.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean = false;
  enableToast: boolean = false;
  toastMessage: string = "";

  constructor(private fb: FormBuilder, private _api:DirectoryService, private route: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  loggedIn(){
    this.submitted = true;
    if(this.loginForm.valid){
      this._api.validateUser(this.loginForm.value).subscribe({
        next: res =>{
          if(res){
            console.log(res);
            localStorage.setItem('token', res["token"]);
            this.route.navigate(['/home', res["userId"]]);
          }
        },
        error: err => {
          console.log(err.error.msg);
          this.toastMessage = err?.error?.msg;
          this.enableToast = true;
        }
      })
    }
  }

  get myForm() {
    return this.loginForm.controls;
  }

  closeToast(event:boolean){
    this.enableToast = event
  }

}
