import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ValidatePassword } from '../password-match/validate-password';
import { DirectoryService } from '../services/directory.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted: boolean = false;
  toastMessage: string = "";
  enableToast: boolean = false;
  alreadyExistsMessage: string;
  notFound:boolean = false;

  constructor(private fb: FormBuilder, 
    private _api:DirectoryService,
    private route: Router) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      userName:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      mobileNo: ['',[Validators.required,Validators.maxLength(10),Validators.pattern('^[0-9]+$')]],
      password: ['', Validators.compose([Validators.required, ValidatePassword.patternValidator()])],
      confirmPassword: ['', Validators.required]
    },
    {
      validator: ValidatePassword.matchPassowrd, // your validation method
    }
    );

    this.registerForm.get('email').valueChanges.subscribe(() => {
      if(this.notFound)
        this.notFound = false;
    })

  }

  get myForm() {
    return this.registerForm.controls;
  }

  onSubmit(){
    this.submitted = true;
    if(this.registerForm.valid){
      // write api call
      this._api.saveUserData(this.registerForm.value).subscribe({
        next: res => {
          this.toastMessage = "User Sucessfully Registered";
          this.enableToast = true;
          this.submitted = false;
          this.registerForm.reset();
        },
        error: err =>{
          if(err.status == 401){
            this.notFound = true;
            this.alreadyExistsMessage = err?.error?.msg;
          }else{
            this.toastMessage = err?.error?.msg;
            this.enableToast = true;
          }
        }
      })
    }
  }

  closeToast(event:boolean){
    this.enableToast = event
  }

}
