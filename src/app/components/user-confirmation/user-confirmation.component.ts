import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-confirmation',
  templateUrl: './user-confirmation.component.html',
  styleUrls: ['./user-confirmation.component.css']
})
export class UserConfirmationComponent implements OnInit {

  constructor(private route:ActivatedRoute, private authService:AuthService, private toastr:ToastrService) { }
  token:any = "";
  email:any = "";

  showSuccess: boolean = false;
  showError: boolean = false;
  errorMessage: string = "";

  ngOnInit(): void {
    this.getParams();
    this.confirmUserEmail()
  }

  confirmUserEmail(){
    this.authService.confirmEmail({token:this.token, email:this.email})
    .subscribe(data=>{
      this.showSuccess = true;
      this.toastr.success('Confirmed with success !');
    },
    (error:HttpErrorResponse)=>{
      this.toastr.error('Confirmation failed !');
      this.showError = true;
      this.errorMessage = error.error.errorMessage;
    })
  }

  getParams(){
    this.token = this.route.snapshot.queryParamMap.get('token')
    this.email = this.route.snapshot.queryParamMap.get('email')
  }

}
