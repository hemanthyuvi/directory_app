import {AbstractControl, ValidatorFn} from '@angular/forms';

export class ValidatePassword{

     static patternValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
          if (!control.value) {
            return null;
          }
          const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
          const valid = regex.test(control.value);
          return valid ? null : { invalidPassword: true };
        };
      }


    static matchPassowrd(abstratcontrol: AbstractControl){
        let password = abstratcontrol.get('password').value;
        let confirmPassword = abstratcontrol.get('confirmPassword').value;
        if(password != confirmPassword){
            abstratcontrol.get('confirmPassword').setErrors({
                MatchPassword: true
            })
        }else{
            return null;
        }
    }
}