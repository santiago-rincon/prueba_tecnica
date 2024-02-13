import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '@interfaces';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  MAIN_URL = 'http://127.0.0.1:8000/users';
  HTTP_OPTIONS = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  private readonly httpClient = inject(HttpClient);
  getUsers() {
    return this.httpClient.get<User[]>(this.MAIN_URL);
  }
  getUser(id: number) {
    return this.httpClient.get<User>(`${this.MAIN_URL}/${id}`);
  }
  createUser(user: User) {
    return this.httpClient.post<User>(this.MAIN_URL, user, this.HTTP_OPTIONS);
  }
  updateUser(user: User, id: number) {
    return this.httpClient.put<User>(`${this.MAIN_URL}/${id}`, user, this.HTTP_OPTIONS);
  }
  deleteUser(id: number) {
    return this.httpClient.delete(`${this.MAIN_URL}/${id}`, this.HTTP_OPTIONS);
  }
}
