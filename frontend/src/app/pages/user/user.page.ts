import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerComponent } from '@components/spinner/spinner.component';
import { User } from '@interfaces';
import { UsersService } from '@services/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ReactiveFormsModule, SpinnerComponent, DatePipe],
  templateUrl: './user.page.html',
})
export class UserPage implements OnInit {
  private fb = inject(FormBuilder);
  private toastr = inject(ToastrService);
  private httpSvc = inject(UsersService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private toastOptions = {
    closeButton: true,
    timeOut: 2000,
    positionClass: 'toast-bottom-right',
    tapToDismiss: true,
    progressBar: true,
  };
  userForm = this.fb.group({
    fullName: ['', [Validators.required]],
    cc: ['', [Validators.required, Validators.pattern(/\d+/)]],
  });
  loading = false;
  userId: string | undefined = undefined;
  currentUser: User | null = null;
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? undefined;
    this.userId = id;
    if (id !== undefined) {
      this.loading = true;
      this.httpSvc.getUser(Number(id)).subscribe(
        user => {
          this.currentUser = user;
          console.log(user);

          this.userForm.patchValue({
            fullName: user.fullName,
            cc: user.cc.toString(),
          });
          this.loading = false;
        },
        (e: HttpErrorResponse) => {
          if (e.status === 404) {
            this.toastr.error('El usuario no exite', 'Error', this.toastOptions);
            this.loading = false;
            this.router.navigate(['/users']);
          } else {
            this.toastr.error('No se ha podido obtener el usuario', 'Error', this.toastOptions);
            this.loading = false;
            this.router.navigate(['/users']);
          }
        }
      );
    }
  }
  onSubmit() {
    if (this.userForm.invalid) {
      this.toastr.error('Completa todos los campos', 'Error', this.toastOptions);
      return;
    }
    this.loading = true;
    const newUser: User = {
      fullName: this.userForm.get('fullName')?.value ?? '',
      cc: Number(this.userForm.get('cc')?.value),
    };
    if (this.currentUser) {
      this.httpSvc.updateUser(newUser, Number(this.currentUser.id)).subscribe(
        user => {
          this.toastr.info(`Usuario ${user.fullName} ha sido actualizado`, 'Exito', this.toastOptions);
          this.userForm.reset();
          this.router.navigate(['/users']);
        },
        e => {
          console.log(e);
          this.toastr.error('Ha ocurrido un error inesperado', 'Error', this.toastOptions);
          this.loading = false;
        }
      );
    } else {
      this.httpSvc.createUser(newUser).subscribe(
        user => {
          this.toastr.success(`Usuario ${user.fullName} ha sido creado`, 'Exito', this.toastOptions);
          this.userForm.reset();
          this.router.navigate(['/users']);
        },
        () => {
          this.toastr.error('No se ha podido crear el usuario', 'Error', this.toastOptions);
          this.loading = false;
        }
      );
    }
  }
}
