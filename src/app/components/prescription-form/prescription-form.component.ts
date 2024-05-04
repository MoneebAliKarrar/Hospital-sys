import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { Doctor } from '../../models/Doctor';

@Component({
  selector: 'prescription-form',
  templateUrl: './prescription-form.component.html',
  styleUrl: './prescription-form.component.css'
})
export class PrescriptionFormComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phone: string = '';
  nic: string = '';
  dob: string = '';
  gender: string = '';
  appointmentDate: string = '';
  department: string = '';
  doctor: string = '';
  address: string = '';
  hasVisited: boolean = false;
  doctorsList?: Doctor[]

  departmentsArray: string[] = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT"
  ];
  doctors: any[] = [];

  constructor(private http: HttpClient, private doctrosService: DoctorService) { }

  ngOnInit(): void {
    this.getDoctors();
  }
  public getDoctors(): void {
    this.doctrosService.getAllDoctors().subscribe(
      doctorsList => this.doctorsList = doctorsList
    );
  }

  handleAppointment() {
    // Check if required fields are filled
    if (!this.firstName || !this.lastName || !this.email || !this.phone || !this.department || !this.doctor) {
      console.error('Please fill all required fields.');
      return;
    }

  }

}
