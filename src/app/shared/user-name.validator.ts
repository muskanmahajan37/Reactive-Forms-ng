import { AbstractControl, ValidatorFn } from "@angular/forms";

export const forbiddenNameValidator = (forbiddenName: RegExp) : ValidatorFn => { 
    return (control:AbstractControl): {[key: string]:any} | null =>{
        const forbidden = forbiddenName.test(control.value);
        return forbidden ? { 'forboddenName': {value : control.value}} : null;
    }
} 
// this is a function which returns the validatior function 
// custom validator with parameters
// RegExp, regular expression is an object that describes a pattern of characters
// this is used with test function to find the pattern which maatches in a string from RegExp function

// we can replace {[key: string]:any}  by     {[key: string]:{[key: string]: string}}  in both above and below


// below is example of "custom validation" of a single name, and we have a name declared in the function only 
//like "admin" specified in this case
// but if we want to take in a variable as to be a forbidden name we need to use "function which returns the validatior function"

// export const forbiddenNameValidator = (control:AbstractControl): {[key: string]:any} | null =>{
//     const forbidden = /admin/.test(control.value); // this means id admin will be in a string that name will be invalid
//     // const forbidden = (control.value == 'admin') ? true : false;     // this means if name is specfically admin its invalid
//     return forbidden ? { 'forboddenName': {value : control.value}} : null;
// }

// {[key: string]: any} (an object with key(s) declared as variable named key, and value type can be any), or null;
// we can  replace above by object
// after decleration of function, after " : " we write what the function will return 
//like in cpp "int add(){}" in
//in js or ts, const add = (a, b) : int =>{} 

// validator function accepts only one parameter