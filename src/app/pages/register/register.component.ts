import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { SignupInfo } from '../../auth/SignupInfo';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form: any = {};
  signupInfo?: SignupInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) { }

  ngOnInit() { }

  onSubmit() {
    console.log(this.form);

    this.signupInfo = new SignupInfo(
      this.form.username,
      this.form.password);

    this.authService.signUp(this.signupInfo).subscribe({
      next: (data) => {
        console.log(data);
        this.isSignedUp = true;
        this.isSignUpFailed = false;
      }
      ,
      error: (error) => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    });
  }

}
