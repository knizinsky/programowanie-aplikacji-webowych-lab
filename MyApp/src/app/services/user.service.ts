import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'devops' | 'developer'; // Dodano pole roli
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly users: User[] = [
    { id: '1', firstName: 'John', lastName: 'Doe', role: 'admin' },
    { id: '2', firstName: 'Jane', lastName: 'Smith', role: 'developer' },
    { id: '3', firstName: 'Alice', lastName: 'Johnson', role: 'devops' }
  ];

  private readonly userSubject = new BehaviorSubject<User>(this.users[0]); // Domyślnie zalogowany admin

  getUser(): Observable<User> {
    return this.userSubject.asObservable();
  }

  getUsers(): User[] {
    return this.users; // Zwraca listę użytkowników
  }
}