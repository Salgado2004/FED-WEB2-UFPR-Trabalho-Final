import { Injectable } from '@angular/core';
import { Observable, catchError, lastValueFrom } from 'rxjs';
import { DefaultReport, CategoryReport } from '../../../../core/types/report';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { AuthService } from '../../../../auth/utils/auth.service';
import { ErrorHandlingService } from '../../../../core/utils/error-handling.service';

@Injectable({
  providedIn: 'root',
})
export class ReportPageService {
  private baseUrl: string = environment.baseUrl;
  private authService: AuthService;
  constructor(private http: HttpClient, private errorHandlingService: ErrorHandlingService) {
    this.authService = new AuthService(http, errorHandlingService);
  }

  private getReport(startDate?: string, endDate?: string): Observable<DefaultReport[]> {
    let token = this.authService.getAuthorizationToken();
    const headers = { Authorization: `Bearer ${token}` };

    let url = `${this.baseUrl}requests/report`;

    const params: string[] = [];
    if (startDate) {
      params.push(`startDate=${startDate}`);
    }
    if (endDate) {
      params.push(`endDate=${endDate}`);
    }
    if (params.length > 0) {
      url += `?${params.join('&')}`;
    }

    return this.http.get<DefaultReport[]>(url, { headers });
  }

  private getCategoryReport(): Observable<CategoryReport[]> {
    let token = this.authService.getAuthorizationToken();
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<CategoryReport[]>(
      `${this.baseUrl}requests/report/category`,
      { headers: { ...headers } }
    ).pipe(
      catchError((error) => {
        this.errorHandlingService.handleErrorResponse(error);
        return new Observable<never>((observer) => observer.error(error));
      }
    ));
  }

  async getReportList(
    type: 'default' | 'category',
    startDate?: string,
    endDate?: string
  ): Promise<DefaultReport[] | CategoryReport[]> {
    switch (type) {
      case 'default':
        return await lastValueFrom(this.getReport(startDate, endDate));
      case 'category':
        return await lastValueFrom(this.getCategoryReport());
    }
  }
}
export { CategoryReport, DefaultReport };
