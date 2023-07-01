import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { ValidatePassword } from '../password-match/validate-password';
import { DirectoryService } from '../services/directory.service';
import { pairwise, startWith } from 'rxjs/operators'

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  resetForm: FormGroup;
  submitted:boolean = false;
  toastMessage: string = "";
  enableToast: boolean = false;
  notFound: boolean = false;
  notFoundMessage:string;
  constructor(private fb: FormBuilder, private _api:DirectoryService) { }

  ngOnInit() {
    this.resetForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, ValidatePassword.patternValidator()])],
      confirmPassword: ['', Validators.required]
    },
    {
      validator: ValidatePassword.matchPassowrd // your validation method
    }
    );
    this.resetForm.get('userName').valueChanges
    .subscribe(() => {
      if(this.notFound)
        this.notFound = false;
    })
  }

  submit(){
    this.submitted = true;
    if(this.resetForm.valid){
            // write api call
            this._api.resetPassword(this.resetForm.value).subscribe({
              next: res => {
                this.toastMessage = res["msg"];
                this.enableToast = true;
                this.submitted = false;
                this.resetForm.reset();
              },
              error: err =>{
                if(err.status == 401){
                  this.notFound = true;
                  this.notFoundMessage = err?.error?.msg;
                }else{
                  this.toastMessage = err?.error?.msg;
                  this.enableToast = true;
                }
                
              }
            })
    }
  }

  get myForm() {
    return this.resetForm.controls;
  }

}
