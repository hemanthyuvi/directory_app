import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ValidatePassword } from '../password-match/validate-password';
import { DirectoryService } from '../services/directory.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';


@Component({
  selector: 'app-addContact',
  templateUrl: './addContact.component.html',
  styleUrls: ['./addContact.component.scss']
})
export class AddContactComponent implements OnInit {
  contactForm: FormGroup;
  submitted: boolean = false;
  toastMessage: string = "";
  enableToast: boolean = false;
  alreadyExistsMessage: string;
  notFound:boolean = false;
  contactData: Object = {};
  userId: string;
  

  constructor(private fb: FormBuilder, 
    private _api:DirectoryService,
    private route: Router,
    private _activatedRoute: ActivatedRoute,
    private location: Location) { }

    ngOnInit() {
      const token = this._api.getToken();
      const decodeToken = this._api.decodeToken(token);
      this.userId = decodeToken["userId"];
      this.contactForm = this.fb.group({
        contactName:['',Validators.required],
        workType:['',Validators.required],
        phoneNo: ['',[Validators.required,Validators.maxLength(10),Validators.pattern('^[0-9]+$')]],
        email:['',[Validators.required,Validators.email]],
        location:['',Validators.required],
      });
  
    }
  
    get myForm() {
      return this.contactForm.controls;
    }
  
    onSubmit(){
      this.submitted = true;
      if(this.contactForm.valid){
        // write api call
        this.contactData = {
          userId: this.userId,
          ...this.contactForm.value
        }
        console.log(this.contactData);
        this._api.saveContactData(this.contactData).subscribe({
          next: res => {
            this.toastMessage = "User Sucessfully Registered";
            this.enableToast = true;
            this.submitted = false;
            this.contactForm.reset();
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

    backPage(){
      this.location.back();
    }

}
