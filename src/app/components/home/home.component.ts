import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoggedIn:boolean = false;

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.authService.authStatus.subscribe(res => {
      this.isLoggedIn = res
    })

    // if(!this.isLoggedIn)
    //   this.router.navigateByUrl('/login')
  }

}
