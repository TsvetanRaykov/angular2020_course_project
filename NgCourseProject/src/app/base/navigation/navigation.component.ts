import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';
import { Router } from '@angular/router';
import { IUser } from '../../interfaces';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  collapsed = true;
  get User(): IUser {
    return this.authService.User;
  }
  get isLogged(): boolean {
    return !!this.User;
  }
  constructor(private authService: AuthService, private router: Router) {}
  logout() {
    this.authService.logOut().subscribe(() => this.router.navigate(['/user/login']));
  }
  ngOnInit() {}
}
