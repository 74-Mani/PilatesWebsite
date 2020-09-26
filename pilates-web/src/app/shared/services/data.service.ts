import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppConfigService } from '../../core/app-config.service';
import { IClass, IApiResponse, IMembership, IUser, IUserMemberResponse } from '../interfaces';
import { throwError } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class DataService {
    constructor(private http: HttpClient, private configService: AppConfigService) { 
    }

    getClasses(): Observable<IApiResponse<IClass[]>> {
        var endpoint = '/api/Classes';
        return this.http.get<IApiResponse<IClass[]>>(this.configService.settings.apiUrl + endpoint)
            .pipe(catchError(this.handleError));
    }

    getMemberships(): Observable<IApiResponse<IMembership[]>> {
        var endpoint = '/api/Memberships';
        return this.http.get<IApiResponse<IMembership[]>>(this.configService.settings.apiUrl + endpoint)
            .pipe(catchError(this.handleError));
    }

    getClassesCalendar(): Observable<IApiResponse<IClass[]>> {
        var endpoint = '/api/Classes/timetable/week';
        return this.http.get<IApiResponse<IClass[]>>(this.configService.settings.apiUrl + endpoint)
            .pipe(catchError(this.handleError));
    }

    registerUser(user: IUser): Observable<IApiResponse<any>>{
        var endpoint = '/api/user';
        return this.http.post<IApiResponse<any>>(this.configService.settings.apiUrl + endpoint, user)
            .pipe(catchError(this.handleError));
    }

    getUser(userId: string): Observable<IApiResponse<IUserMemberResponse>>{
        var endpoint = '/api/user';
        return this.http.get<IApiResponse<IUserMemberResponse>>(this.configService.settings.apiUrl + endpoint, 
            {params: {id: userId}}
            )
            .pipe(catchError(this.handleError));
    }



    private handleError(error: HttpErrorResponse) {
        console.error('server error:', error);
        if (error.error instanceof Error) {
            const errMessage = error.error.message;
            return throwError( new Error(errMessage) )
        }
        return throwError(error || 'Server error');
    }
}