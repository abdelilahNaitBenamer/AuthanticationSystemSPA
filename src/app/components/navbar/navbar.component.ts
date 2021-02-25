import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn:boolean = false;
  constructor(private authService:AuthService, private router:Router,private toastr:ToastrService ) {

  }

  ngOnInit(): void {
    this.authService.authStatus.subscribe(res => {
      this.isLoggedIn = res
    })
  }

  onLogout(){
    this.authService.logout()
    this.router.navigateByUrl('/login')
    this.toastr.info('Deconnected !')
  }
}
