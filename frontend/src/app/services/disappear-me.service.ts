import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { BehaviorSubject, Observable, Subject, throwError } from "rxjs";
import { catchError, filter, map, tap } from "rxjs/operators";

import { InputContent, UserContent } from "../models";
@Injectable({
  providedIn: "root",
})
export class DisappearMeService {
  constructor(private http: HttpClient) {}
  private api_url: string = "http://localhost:5000/";
  //private api_url: string = "https://api-disappear-me.herokuapp.com/";
  private base_url: string = location.origin;
  getURLPath(inputData: InputContent) {
    return this.http.post(this.api_url + "submit", inputData).pipe(
      map((data) => `${this.base_url}/${data}`),
      catchError(this.handleError)
    );
  }

  loginUser(loginData: Object) {
    return this.http
      .post(`${this.api_url}login`, loginData, { observe: "response" })
      .pipe(catchError(this.handleError));
  }

  signupUser(userData: Object) {
    return this.http
      .post(`${this.api_url}signup`, userData, { observe: "response" })
      .pipe(catchError(this.handleError));
  }

  getUserContent(user_id: string) {
    return this.http.get<UserContent[]>(`${this.api_url}user\\${user_id}`).pipe(
      // map((data) =>

      // ),
      // tap((data) =>
      //   data.forEach((d) => {
      //     console.log(typeof JSON.parse(JSON.stringify(d.result)));
      //   })
      // ),
      catchError(this.handleError)
    );
  }
  getTaskTimeDetails(taskId: string) {
    return this.http
      .get<InputContent>(this.api_url + taskId)
      .pipe(catchError(this.handleError));
  }

  retryTask(content) {
    return this.http
      .post(`${this.api_url}retry`, content)
      .pipe(catchError(this.handleError));
  }

  deleteTask(taskId: string) {
    return this.http
      .delete(`${this.api_url}delete/${taskId}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    }
    // else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong.
    //   console.error(
    //     `Backend returned code ${error.status}, ` +
    //       `body was: ${JSON.stringify(error.error)}`
    //   );
    // }
    // Return an observable with a user-facing error message.
    return throwError(error.error);
  }
}
