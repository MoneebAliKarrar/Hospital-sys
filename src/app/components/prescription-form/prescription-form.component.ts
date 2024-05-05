import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { Doctor } from '../../models/Doctor';
import { Prescription } from '../../models/Prescription';
import { Patient } from '../../models/Patient';
import { PrescriptionService } from '../../services/prescription.service';
import { TokenStorageService } from '../../auth/token-storage.service';

@Component({
  selector: 'prescription-form',
  templateUrl: './prescription-form.component.html',
  styleUrl: './prescription-form.component.css'
})
export class PrescriptionFormComponent {
  doctorsList?: Doctor[]
  form: any = {};
  username?:string
  patient?:Patient

  constructor(private tokenStorageService: TokenStorageService, private doctrosService: DoctorService, private prescriptionService: PrescriptionService) { }

  ngOnInit(): void {
    this.getDoctors();
    this.username = this.tokenStorageService.getUsername();
  }
  public getDoctors(): void {
    this.doctrosService.getAllDoctors().subscribe(
      doctorsList => this.doctorsList = doctorsList
    );
  }

  handleAppointment(): void {
  
    const newPrescription: Prescription = {
      medicine: this.form.date,
      dose: this.form.dose,
      instruction: this.form.instruction,
      doctor: {firstname : this.form.doctor},
      patient :{ firstname: this.form.firstname}
    };

    this.prescriptionService.addprescription(newPrescription).subscribe(
      addedVisit => {
        console.log('New prescription added successfully:', addedVisit);
        this.resetForm();
      },
      error => {
        console.error('Error adding new prescription:', error);
      }
    );
  }

  resetForm(): void {
    this.form.date = '';
    this.form.doctor = '';
  }

}
