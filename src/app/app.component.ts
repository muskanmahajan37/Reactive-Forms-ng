import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormControl, FormBuilder } from '@angular/forms';    // this is when we use "FormGroup" and "FormComponent"
import { FormBuilder, Validators, FormGroup } from '@angular/forms'; // this is to use FormBuilder, this is easy to read code
import { forbiddenNameValidator } from './shared/user-name.validator';
import { passwordValidation } from './shared/password.validatos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private fb:FormBuilder){}

  registerationForm: FormGroup;

  get userName(){     // setting a getter for userName to clean code
    return this.registerationForm.get('userName');   // this is to retrive elements of userName from "FormBuilder" and "validation"
  }

  get email(){
    return this.registerationForm.get('email');
  }

  

  ngOnInit(){
    this.registerationForm = this.fb.group({   // this is using form builder
      // userName: ['', Validators.required],    // in array 1st: Default value, 2nd: Validation
      // above is only for one validation
      userName: ['', [Validators.required, Validators.minLength(3), forbiddenNameValidator(/password/)]],  // multiple validation
      // forbiddenNameValidator will be used in place of  forbiddenNameValidator(/password/) if we don't want to pass a paramerter
      // and in "user-name.validator" we need to change the class to a validation function
      email: [''],
      subscribe: [false],
      password: '',
      confermPassword: '',
      fullAddress: this.fb.group({
        city:'',
        address:''
      })
    }, {
      validators: passwordValidation
    })
    // 2nd argument of FormBuilder(fb) group method is validator
    
    this.registerationForm.get('subscribe').valueChanges.subscribe(checkedValue =>{
      const email= this.registerationForm.get('email')
      if(checkedValue)
        email.setValidators(Validators.required)
      else
        email.clearValidators();
      email.updateValueAndValidity()
    })
  }

  
  
  // registerationForm = new FormGroup({      // this is using "FormGroup" and "FormComponent"
  //   userName: new FormControl('sawa'),
  //   password: new FormControl(''),
  //   confermPassword: new FormControl(''),
  //   // to set default value pass values to constructor of formControl

  //   fullAddress: new FormGroup({    // this is example of "FormGroup" in "FormGroup"
  //     city: new FormControl(''),
  //     address: new FormControl('')
  //   })
  // });
  // // above we created object of class and pass 3 paramenter in constructor


  loadApiData(){    // this class setValue of the Form programatically

    this.registerationForm.patchValue({ // patchValue function takes object of registerationForm but not strictly
      userName: 'Dael Singh',
      password: '789654',
      confermPassword: '789654'
    })

    // this.registerationForm.setValue({  //setValue function takes object of registerationForm strictly, if not show error
    //   userName: 'Gursewak',
    //   password: '147852369',
    //   confermPassword: '147852369',
    //   fullAddress:{
    //     city: 'Dael',
    //     address: 'full dael'
    //   }
    // });
    
  }
}
