import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Doctor } from '../../models/Doctor';
import { DoctorService } from '../../services/doctor.service';
import { VisitService } from '../../services/visit.service';
import { Visit } from '../../models/Visit';
import { TokenStorageService } from '../../auth/token-storage.service';
import { Patient } from '../../models/Patient';
import { User } from '../../models/User';

@Component({
  selector: 'appointmentForm',
  templateUrl: './appointment-form.component.html',
  styleUrl: './appointment-form.component.css'
})
export class AppointmentFormComponent {
  doctorsList?: User[]
  form: any = {};
  username?:string
  patient?:Patient

  constructor(private tokenStorageService: TokenStorageService, private doctrosService: DoctorService, private visitService: VisitService) { }

  ngOnInit(): void {
    this.getDoctors();
    this.username = this.tokenStorageService.getUsername();
  }
  public getDoctors(): void {
    this.doctrosService.getAllDoctors().subscribe(
      doctorsList => this.doctorsList = doctorsList
    );
  }

  handleVisit(): void {
    const newVisit: Visit = {
      date: this.form.date,
      dc_p_list: [{username: this.username}],
      time: this.form.time
    };

    this.visitService.addvisit(newVisit).subscribe(
      addedVisit => {
        console.log('New visit added successfully:', addedVisit);
        this.resetForm();
      },
      error => {
        console.error('Error adding new visit:', error);
      }
    );
  }

  resetForm(): void {
    this.form.date = '';
    this.form.doctor = '';
  }
}
