import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormControl, FormBuilder } from '@angular/forms';    // this is when we use "FormGroup" and "FormComponent"
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms'; // this is to use FormBuilder, this is easy to read code
// FormArray is for dynamic forms 
import { forbiddenNameValidator } from './shared/user-name.validator';
import { passwordValidation } from './shared/password.validatos';

import { RegistractionService } from './service/registraction.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private fb:FormBuilder, private registraction: RegistractionService){}

  registerationForm: FormGroup;

  get userName(){     // setting a getter for userName to clean code
    return this.registerationForm.get('userName');   // this is to retrive elements of userName from "FormBuilder" and "validation"
  }

  get email(){
    return this.registerationForm.get('email');
  }

  get alternateEmails(){
    return this.registerationForm.get('alternateEmails') as FormArray;  
    //"as" is typescript, and "as" tells the compiler to consider the object
  }

  addAlternateEmail(){        // this is method
    this.alternateEmails.push(this.fb.control(''));   
    // every time we call this method in alternalEmail a form control is pushed 
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
      }),
      alternateEmails: this.fb.array([])    // using FormArray for alternate email and dynamic forms
      // initialising array with zero controlles
    }, {
      validators: passwordValidation
    })
    // 2nd argument of FormBuilder(fb) group method is validator
    
    // this is for conditional validation for checkbox(subscrible) and email
    this.registerationForm.get('subscribe').valueChanges.subscribe(checkedValue =>{  
      // valueChanges is a type of observable so we need to use subscribe, when ever value of "subscribe" changes 
      // this subscribe function will run 
      const email= this.registerationForm.get('email')      // getting email elements from registerationForm 
      if(checkedValue){
        email.setValidators(Validators.required)      // setting validation for email 
        email.markAsUntouched()             // changing state of untouched to true
      }
      else{
        email.clearValidators();        // here we are removing validation in elements of elements
      }
      email.updateValueAndValidity()    // here validation is updated to email elements in registerationForm
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
  onSubmit(){
    console.log(this.registerationForm.value)
    this.registraction.register(this.registerationForm.value)
    .subscribe( 
      response => console.log('Success'),
      error => console.error('error') 
      )

  }
}
