import { Component } from '@angular/core';
import { Patient } from '../../models/Patient';
import { PatientService } from '../../services/patient.service';
import { TokenStorageService } from '../../auth/token-storage.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-edit-details',
  templateUrl: './edit-details.component.html',
  styleUrl: './edit-details.component.css'
})
export class EditDetailsComponent {
  form: any = {};
  patient?: Patient;
  isPatinetRegisterd = false
  isRegisterFailed = false;
  errorMessage = '';
  username?:string

  constructor(private patientService: PatientService,private tokenStorageService:TokenStorageService) { }

  ngOnInit() { }

  onSubmit() {
    console.log(this.form);

    this.patient = new Patient(
      this.form.firstname,
      this.form.lastname,
      new User(this.tokenStorageService.getUsername())
    );

    this.patientService.addPatient(this.patient).subscribe({
      next: (response) => {
        this.isPatinetRegisterd = true;
      },
      error: (error) => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isRegisterFailed = true;
      }
    });
  }

}
