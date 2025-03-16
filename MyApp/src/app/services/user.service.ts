import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly userSubject = new BehaviorSubject<User>({
    id: '1',
    firstName: 'John',
    lastName: 'Doe'
  });

  getUser(): Observable<User> {
    return this.userSubject.asObservable();
  }
}