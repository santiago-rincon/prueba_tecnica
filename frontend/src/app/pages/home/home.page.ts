import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TableComponent } from '@components/table/table.component';
import { User } from '@interfaces';
import { UsersService } from '@services/users.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TableComponent, RouterLink],
  templateUrl: './home.page.html',
})
export class HomePage implements OnInit {
  httpSvc = inject(UsersService);
  Users: User[] = [];
  ngOnInit(): void {
    this.httpSvc
      .getUsers()
      .pipe(catchError(this.handleError))
      .subscribe(users => {
        this.Users = users;
      });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      this.Users = [];
      console.error('An error occurred:', error.error);
    } else {
      this.Users = [];
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return [];
  }
}
