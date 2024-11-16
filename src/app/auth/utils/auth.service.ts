import { Injectable } from '@angular/core';
import { Credentials } from '../types/credentials';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /*user = {
    'name': 'Leonardo Salgado',
    'email': 'leosalgado2004@gmail.com',
    'password': '1234'
  }

  employee = {
    'name': 'Alisson Gabriel Santos',
    'email': 'alisson.gab.santos@gmail.com',
    'password': '1234'
  }*/

  constructor(private http: HttpClient) {}

  private baseUrl = 'http://localhost:8080/service/v1/auth'

  public getCurrentUser(): Credentials {
    const user = sessionStorage.getItem('credentials');
    if (user == null ){
      throw Error("Nenhuma sessão ativa");
    }
    return JSON.parse(user);
  }

  /*login(email: string, password: string): Credentials {
    if(email == this.user.email && password == this.user.password){
      const credentials: Credentials = {'name': this.user.name, 'profile': 'Customer'}
      sessionStorage.setItem('credentials', JSON.stringify(credentials));
      return credentials;
    }
    if(email == this.employee.email && password == this.employee.password){
      const credentials: Credentials = {'name': this.employee.name, 'profile': "Employee"}
      sessionStorage.setItem('credentials', JSON.stringify(credentials));
      return credentials;
    }
    throw Error("Usuário ou senha inválidos");
  }*/

  login(email: string,password: string): Observable<Credentials>{
    const params= { email, password };
    return this.http.post<Credentials>(`${this.baseUrl}/login`,null, {params});
  }

  logout() {
    sessionStorage.removeItem('credentials');
  }
}
