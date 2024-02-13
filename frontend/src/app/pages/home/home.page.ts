import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TableComponent } from '@components/table/table.component';
import { User } from '@interfaces';
import { UsersService } from '@services/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TableComponent, RouterLink],
  templateUrl: './home.page.html',
})
export class HomePage implements OnInit {
  httpSvc = inject(UsersService);
  toastr = inject(ToastrService);
  Users: User[] = [];
  private toastOptions = {
    closeButton: true,
    timeOut: 2000,
    positionClass: 'toast-bottom-right',
    tapToDismiss: true,
    progressBar: true,
  };
  ngOnInit(): void {
    this.httpSvc.getUsers().subscribe(
      users => {
        this.Users = users;
      },
      () => {
        this.toastr.error('Error al obtener los usuarios', 'Error de conexión', this.toastOptions);
      }
    );
  }
}
