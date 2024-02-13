import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SpinnerComponent } from '@components/spinner/spinner.component';
import { User } from '@interfaces';
import { UsersService } from '@services/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [RouterLink, SpinnerComponent],
  templateUrl: './table.component.html',
})
export class TableComponent {
  @Input({ required: true }) Users: User[] = [];
  private httpSvc = inject(UsersService);
  private toastr = inject(ToastrService);
  private toastOptions = {
    closeButton: true,
    timeOut: 2000,
    positionClass: 'toast-bottom-right',
    tapToDismiss: true,
    progressBar: true,
  };
  delete(id: number) {
    if (id === -1) return;
    this.httpSvc.deleteUser(id).subscribe(
      () => {
        this.toastr.info('Se eliminó el usuario', 'Borrado', this.toastOptions);
        this.Users = this.Users.filter(u => u.id !== id);
      },
      () => {
        this.toastr.error('Ha ocurrido un error inesperado', 'Error', this.toastOptions);
      }
    );
  }
}
