import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../auth/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = 'http://localhost:8080/exampleSecurity/user';
  private adminUrl = 'http://localhost:8080/exampleSecurity/admin';

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) { }

  getUserPage(): Observable<string> {
    return this.http.get(this.userUrl, { responseType: 'text' });
  }

  getAdminPage(): Observable<string> {
    return this.http.get(this.adminUrl, { responseType: 'text' });
  }

  public roleMatch(allowedRoles: string[]): boolean {
    let isMatch = false;
    const userRoles: string[] = this.tokenStorageService.getAuthorities();

    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i] === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          }
        }
      }
    }
    return false
  }
}
