import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {
  public successMessage: string = "";
  public errorMessage: string = "";
  public showSuccess: boolean=false;
  public showError: boolean=false;

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

  forgetPasswordForm = new FormGroup({
    email :new FormControl(
      null,[Validators.required, Validators.email]
    )
  })

  get email(){
    return this.forgetPasswordForm.get('email');
  }

  onSubmit(){
    this.showSuccess = false;
    this.showError = false;
    let data={
      email:this.email?.value
    }
    this.authService.forgetPassword(data)
    .subscribe(result => {
      this.showSuccess = true;
      this.successMessage = JSON.parse(result).successMessage;
    },
    (err:HttpErrorResponse) => {
      this.showError = true;
      this.errorMessage = err.error?.errorMessage;
    })
  }
}
