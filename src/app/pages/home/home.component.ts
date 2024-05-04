import { Component } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { PrescriptionService } from '../../services/prescription.service';
import { PatientService } from '../../services/patient.service';
import { VisitService } from '../../services/visit.service';
import { TokenStorageService } from '../../auth/token-storage.service';
import { Prescription } from '../../models/Prescription';
import { Doctor } from '../../models/Doctor';
import { Patient } from '../../models/Patient';
import { Visit } from '../../models/Visit';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  doctorsList?: Doctor[]
  patientsList?: Patient[]
  prescriptionsList?: Prescription[]
  visitsList?: Visit[]
  info: any;


  constructor(
    private doctrosService: DoctorService,
    private patinetService: PatientService,
    private prescriptionService: PrescriptionService,
    private visitService: VisitService,
    private token: TokenStorageService
  ) { }

  ngOnInit() {
    this.getDoctors();
    this.getPatinets();
    this.getPrescriptions();
    this.getVisits();
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
  }

  public getDoctors(): void {
    this.doctrosService.getAllDoctors().subscribe(
      doctorsList => this.doctorsList = doctorsList
    );
  }

  public getPatinets(): void {
    this.patinetService.getAllPatients().subscribe(
      patientsList => this.patientsList = patientsList
    );
  }


  public getPrescriptions(): void {
    this.prescriptionService.getAllprescriptions().subscribe(
      prescriptionsList => this.prescriptionsList = prescriptionsList
    );
  }


  public getVisits(): void {
    this.visitService.getAllvisits().subscribe(
      visitsList => this.visitsList = visitsList
    );
  }

}
