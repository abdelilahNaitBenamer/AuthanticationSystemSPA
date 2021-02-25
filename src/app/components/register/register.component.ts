import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { UsernameValidator } from '../validators/confirm-password.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService:AuthService, private toastr: ToastrService, private router: Router) { }
  data = {
    username:'',
    password: '',
    fullname: '',
    email: ''
  }
  ngOnInit(): void {
  }


  registerForm = new FormGroup({
    email: new FormControl(
      null,[Validators.required, Validators.email]
    ),
    username: new FormControl(
      null,[Validators.required, Validators.minLength(8),Validators.maxLength(30)]
    ),
    fullname: new FormControl(
      null,[Validators.required,Validators.minLength(10)]
    ),
    password: new FormControl(
      null,[Validators.required, Validators.minLength(6)]
    ),
    confirmPassword: new FormControl(
      null,[Validators.required],
    ),
  },{
    validators: UsernameValidator.ConfirmPasswordValidator
  })

  get email(){
    return this.registerForm.get('email')
  }

  get fullname(){
    return this.registerForm.get('fullname')
  }

  get username(){
    return this.registerForm.get('username')
  }

  get password(){
    return this.registerForm.get('password')
  }

  get confirmPassword(){
    return this.registerForm.get('confirmPassword')
  }

  reset(){
    this.username?.setValue('')
    this.password?.setValue('')
    this.fullname?.setValue('')
    this.email?.setValue('')
  }

  onSubmit(){

    this.data = {
      username: this.username?.value,
      password: this.password?.value,
      fullname: this.fullname?.value,
      email: this.email?.value
    }

    this.authService.register(this.data).subscribe(res=>{
      if (JSON.parse(res).succeeded) {
        this.reset()
        this.toastr.success('New user created!', 'Registration successful.');
        this.router.navigateByUrl('/login');
      } else {
        JSON.parse(res).errors.forEach((element:any) => {
          switch (element.code) {
            case 'DuplicateUserName':
              this.toastr.error('Username is already taken','Registration failed.');
              break;

            default:
            this.toastr.error(element.description,'Registration failed.');
              break;
          }
        });
      }
    },
    error=>{
      console.log(error)
    })
  }
}
