import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Request } from '../types/request';
import { RequestItem } from '../types/request-item';
import { AuthService } from '../../auth/utils/auth.service';
import { CustomerService } from './customer.service';
import { ErrorHandlingService } from './error-handling.service';
import { requestUpdate } from '../types/request-update';
import { RequestCreate } from '../types/request-create';

@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  private baseUrl: string = environment.baseUrl;
  private authService: AuthService;
  private customerService: CustomerService;

  constructor(private http: HttpClient) {
    this.authService = new AuthService(this.http);
    this.customerService = new CustomerService(this.http);
  }

  // Método assíncrono para listar as requisições com seus detalhes
  listRequests(): Observable<RequestItem[]> {
    let token = this.authService.getAuthorizationToken();
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<RequestItem[]>(this.baseUrl + 'requests', { headers })
      .pipe(
        map((requests: RequestItem[]) => {
          for (let request of requests) {
            request.status = request.status.toLowerCase() as any;
            request.image = `assets/images/status/img-${request.status}.svg`;
            this.customerService.getCustomer(request.client.id).then((customer) => {
              request.client = customer;
            });
          }
          return requests;
        }),
        catchError((error: HttpErrorResponse) => {
          ErrorHandlingService.handleErrorResponse(error);
          return new Observable<never>((observer) => observer.error(error));
        })
      );
  }

  getRequestById(requestId: number) {
    let token = this.authService.getAuthorizationToken();
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<Request>(this.baseUrl + "requests/" + requestId, { headers })
      .pipe(
        map((request) => {

          for (let status of request.status) {
            status.dateTime = new Date(status.dateTime);
          }

          return request;
        }),
        catchError((error: HttpErrorResponse) => {
          ErrorHandlingService.handleErrorResponse(error);
          return new Observable<never>((observer) => observer.error(error));
        })
      );
  }

  createRequest(request: RequestCreate): Observable<string> {
    let token = this.authService.getAuthorizationToken();
    const headers = { Authorization: `Bearer ${token}` };
    request.customerId = Number.parseInt(this.authService.getCurrentUser().sub);
    return this.http.post<{ message: string }>(this.baseUrl + "requests", request, { headers }).pipe(
      map((response) => {
        return response.message;
      })
    );
  }

  updateRequestStatus(update: requestUpdate){
    update.userType = this.authService.getCurrentUser().profile;
    let token = this.authService.getAuthorizationToken();
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.put<{ message: string }>(this.baseUrl+"requests/"+update.requestId, update, { headers }).pipe(
      map((response) => {
        console.log(response.message);
      })
    );
  }
}