import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patient } from '../models/Patient';
import { Observable, catchError, of, tap } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private patientsLink = "http://localhost:8080/patients"

  constructor(private http: HttpClient) { }

  public getAllPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.patientsLink);
  }

  public getSpecificPatinet(id: number): Observable<Patient> {
    return this.http.get<Patient>(this.patientsLink + `/${id}`).pipe(
      tap(_ => this.log(`fetched Patinet id=${id}`)),
      catchError(this.handleError<Patient>(`getDoctor id=${id}`))
    );
  }

  public addPatient(newpatient: Patient): Observable<Patient> {
    return this.http.post<Patient>(this.patientsLink, newpatient, httpOptions).pipe(
      tap((addedPatient: Patient) => this.log(`added patient id = ${addedPatient.id}`)),
      catchError(this.handleError<Patient>(`add patient`))
    );
  }

  public deleteAllPatients(): Observable<Patient> {
    return this.http.delete<Patient>(this.patientsLink, httpOptions).pipe(
      tap(_ => this.log(`deleted Patients`)),
      catchError(this.handleError<Patient>(`deleted Patinets`))
    );
  }

  public deletePatient(id: number): Observable<Patient> {
    return this.http.delete<Patient>(this.patientsLink + `/${id}`, httpOptions).pipe(
      tap(_ => this.log(`deleted student id = ${id}`)),
      catchError(this.handleError<Patient>(`deleted Student id = ${id}`))
    );
  }

  public updatePatientsSet(newpatients: Patient[]): Observable<Patient[]> {
    return this.http.put<Patient[]>(this.patientsLink, newpatients, httpOptions).pipe(
      tap(_ => this.log(`updated patients`)),
      catchError(this.handleError<Patient[]>(`updaging patients`))
    );
  }

  public updateSpecificPatient(newpatient: Patient, id: number): Observable<Patient> {
    return this.http.put<Patient>(this.patientsLink + `${id}`, newpatient, httpOptions).pipe(
      tap(_ => this.log(`updated patient id = ${id}`)),
      catchError(this.handleError<Patient>(`updating patient id = ${id}`))
    );
  }

  public updatePartOfPatient(id: number, updates: Partial<Patient>): Observable<any> {
    return this.http.patch(this.patientsLink, updates, httpOptions).pipe(
      catchError(this.handleError<any>(`update part of patient`))
    );
  }



  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  private log(message: string) {
    console.log('StudentService: ' + message);
  }
}
