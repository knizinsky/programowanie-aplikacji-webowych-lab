import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { supabase } from '../supabase.client';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly userSubject = new BehaviorSubject<User | null>(null);

  constructor() {
    this.fetchInitialUser();
  }

  getUser(): Observable<User | null> {
    return this.userSubject.asObservable();
  }

  async fetchInitialUser(): Promise<void> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .limit(1)
      .single();
    if (!error && data) {
      this.userSubject.next(this.mapUser(data));
    } else {
      console.error('Failed to load initial user', error);
    }
  }

  async setUserById(userId: string): Promise<void> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (!error && data) {
      this.userSubject.next(this.mapUser(data));
    } else {
      console.error('User not found', error);
    }
  }

  async getUsers(): Promise<User[]> {
    const { data, error } = await supabase.from('users').select('*');
    if (error) {
      console.error('Failed to fetch users', error.message);
      return [];
    }

    return data.map((user) => this.mapUser(user));
  }

  private mapUser(dbUser: any): User {
    return {
      id: dbUser.id,
      firstName: dbUser.first_name,
      lastName: dbUser.last_name,
      role: dbUser.role,
    };
  }
}
