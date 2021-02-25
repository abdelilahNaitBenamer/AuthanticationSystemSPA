import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent implements OnInit {
  isLoggedIn:boolean = false;
  user={    userName:'',    fullName:'',    email:''  };
  constructor(private authService:AuthService, private userService:UserService, private router:Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.authService.authStatus.subscribe(res => {
      this.isLoggedIn = res
    })

    this.getUserInfo()
  }

  getUserInfo()
  {
    this.userService.getUserProfil()
    .subscribe(data=>{
      this.user = JSON.parse(data)
    },err=>{
      this.toastr.error(err.description)
    })
  }

  editUserForm = new FormGroup({
    fullname : new FormControl(
      null,[Validators.required,Validators.minLength(10)]
    )
  })

  get fullname(){
    return this.editUserForm.get('fullname')
  }

  onSubmit(){
    let data = {
      userName: this.user.userName,
      fullName: this.fullname?.value,
      email: this.user.email
    }
    this.userService.editUserProfil(data)
    .subscribe(data=>{
      this.user = JSON.parse(data)
      this.toastr.success(this.user.userName + " Has been updated")
      document.getElementById("closeModalButton")?.click();
    },(err:HttpErrorResponse)=>{
      this.toastr.error(err.error.errorMessage)
    })
  }
}
