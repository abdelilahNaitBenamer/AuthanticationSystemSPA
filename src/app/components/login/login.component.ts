import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoggedIn:boolean = false;

  constructor(private authService:AuthService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.authService.authStatus.subscribe(res => {
      this.isLoggedIn = res
    })
    // if(this.isLoggedIn)
    // this.router.navigateByUrl('/home')
  }


  loginForm = new FormGroup({
    username :new FormControl(
      null,[Validators.required]
    ),
    password :new FormControl(
      null,[Validators.required]
    ),
  })

  get password(){
    return this.loginForm.get('password');
  }

  get username(){
    return this.loginForm.get('username');
  }

  onSubmit(){
    let data = {
      username: this.username?.value,
      password: this.password?.value,
    }
    this.authService.login(data).subscribe(data=>{
      console.log(data)
      this.authService.setSession(data)
      this.router.navigateByUrl('/home');
    },
    (error:HttpErrorResponse) =>{
      console.log(error.error.errorMessage)
      this.toastr.error(error.error.errorMessage);
    })
  }
}
