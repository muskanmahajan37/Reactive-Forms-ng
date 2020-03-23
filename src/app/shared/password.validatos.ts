import { AbstractControl } from '@angular/forms'

export const passwordValidation = (control: AbstractControl) : { [key: string]: boolean } | null =>{
    const password= control.get('password')
    const confermPassword = control.get('confermPassword')
    if(password.pristine || confermPassword.pristine)
        return null     // this is to make UX better as now when controle value not change it will work,
        // if we change value of both password and confermPassword field this will not run and below statement runs
    return  password && confermPassword && password.value !== confermPassword.value ? {'misMatch' : true} : null
}

// "control" is parameter of "FormControl" 
// and "control" points to the "registrationForm" FormGroup 

// password && confermPassword && password.value !== confermPassword.value
// this means if password is not blank, confermPassword is not blank, and password.value is not equals to confermPassword.value
// return true 
