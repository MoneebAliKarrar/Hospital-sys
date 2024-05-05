import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { Visit } from '../models/Visit';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class VisitService {

  private visitsLink = "http://localhost:8080/visits"

  constructor(private http: HttpClient) { }

  public getAllvisits(): Observable<Visit[]> {
    return this.http.get<Visit[]>(this.visitsLink);
  }

  public getSpecificVisit(id: number): Observable<Visit> {
    return this.http.get<Visit>(this.visitsLink + `/${id}`).pipe(
      tap(_ => this.log(`fetched Patinet id=${id}`)),
      catchError(this.handleError<Visit>(`getDoctor id=${id}`))
    );
  }
/*
  public getVisitForSpecificUser(id: number): Observable<Visit> {
    return this.http.get<Visit>(this.visitsLink + `/user/${id}`).pipe(
      tap(_ => this.log(`fetched Patinet id=${id}`)),
      catchError(this.handleError<Visit>(`getDoctor id=${id}`))
    );
  }
  */


  public addvisit(newvisit: Visit): Observable<Visit> {
    return this.http.post<Visit>(this.visitsLink, newvisit, httpOptions).pipe(
      tap((addedvisit: Visit) => this.log(`added visit id = ${addedvisit.id}`)),
      catchError(this.handleError<Visit>(`add visit`))
    );
  }

  public deleteAllvisits(): Observable<Visit> {
    return this.http.delete<Visit>(this.visitsLink, httpOptions).pipe(
      tap(_ => this.log(`deleted visits`)),
      catchError(this.handleError<Visit>(`deleted Patinets`))
    );
  }

  public deletevisit(id: number): Observable<Visit> {
    return this.http.delete<Visit>(this.visitsLink + `/${id}`, httpOptions).pipe(
      tap(_ => this.log(`deleted student id = ${id}`)),
      catchError(this.handleError<Visit>(`deleted Student id = ${id}`))
    );
  }

  public updatevisitsSet(newvisits: Visit[]): Observable<Visit[]> {
    return this.http.put<Visit[]>(this.visitsLink, newvisits, httpOptions).pipe(
      tap(_ => this.log(`updated visits`)),
      catchError(this.handleError<Visit[]>(`updaging visits`))
    );
  }

  public updateSpecificvisit(newvisit: Visit, id: number): Observable<Visit> {
    return this.http.put<Visit>(this.visitsLink + `${id}`, newvisit, httpOptions).pipe(
      tap(_ => this.log(`updated visit id = ${id}`)),
      catchError(this.handleError<Visit>(`updating visit id = ${id}`))
    );
  }

  public updatePartOfvisit(id: number, updates: Partial<Visit>): Observable<any> {
    return this.http.patch(this.visitsLink, updates, httpOptions).pipe(
      catchError(this.handleError<any>(`update part of visit`))
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
