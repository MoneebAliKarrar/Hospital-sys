import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { TokenStorageService } from '../../auth/token-storage.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(
    private AuthService: AuthService,
    private router: Router,
    public tokenStorageService: TokenStorageService,
    public userService: UserService
  ) { }

  ngOnInit(): void { }

  public isLoggedIn() {
    return this.tokenStorageService.isLoggedIn();
  }

  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

}
