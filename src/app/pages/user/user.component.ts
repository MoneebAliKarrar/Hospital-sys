import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  board?: string;
  errorMessage?: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserPage().subscribe({
      next: (data) => {
        this.board = data;
      }
      ,
      error: (error) => {
        this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
      }
    });
  }

}
