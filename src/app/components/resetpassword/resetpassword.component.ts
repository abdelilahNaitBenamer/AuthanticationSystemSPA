import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  constructor(private route:ActivatedRoute, private authService:AuthService, private toastr:ToastrService) { }
  token:any = "";
  email:any = "";

  showSuccess: boolean = false;
  showError: boolean = false;
  errorMessage: string = "";

  resetPasswordForm = new FormGroup({
    password: new FormControl(
      null,[Validators.required, Validators.minLength(6)]
    ),
    confirmPassword: new FormControl(
      null,[Validators.required],
    ),
  })

  get password(){
    return this.resetPasswordForm.get('password')
  }

  get confirmPassword(){
    return this.resetPasswordForm.get('confirmPassword')
  }

  ngOnInit(): void {
    this.getParams()
  }

  onSubmit(){
    let data:any={
      password:this.password?.value,
      confirmPassword:this.confirmPassword?.value,
      token:this.token,
      email:this.email
    }
    this.showError = false;
    this.showSuccess = false;

    this.authService.resetPassword(data)
    .subscribe(_ => {
      this.showSuccess = true;
      this.toastr.success('Your password has ben reset')
    },
    (error:HttpErrorResponse) => {
      this.showError = true;
      this.errorMessage = error.error.errorMessage;
    })
  }

  getParams(){
    this.token = this.route.snapshot.queryParamMap.get('token')
    this.email = this.route.snapshot.queryParamMap.get('email')
  }
}
