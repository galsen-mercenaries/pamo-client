import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { tap } from 'rxjs/operators';
import { UserModel } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/user-service/users.service';
import {MatDialog} from '@angular/material/dialog';
import { EditFicheMedicalComponent } from 'src/app/shared/components/edit-fiche-medical/edit-fiche-medical.component';
import { FicheMedicalModel } from 'src/app/models/fiche-medical.model';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  displayedColumns: string[] = ['image', 'prenom', 'nom', 'adresse', 'actions'];
  dataSource = new MatTableDataSource<UserModel>([]);
  length = 0;
  pageSize = 5;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private userService: UsersService, private cd: ChangeDetectorRef, private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.getUserCount();
    this.fetchUsers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  goTo(event: PageEvent) {
    console.log('event', event);
    console.log('event length', this.length);

  }

  getUserCount() {
    this.userService.getUsersCount().pipe(
      tap((res: {count: number}) => {
        this.length = res.count;
      } )
    ).subscribe();
  }

  fetchUsers() {
    this.userService.getUsers().pipe(
      tap((res: UserModel[]) => {
        this.dataSource.data = res;
      })
    ).subscribe();
  }

  editFicheMedical(item: UserModel, index: number) {
    this.matDialog
        .open(EditFicheMedicalComponent, {
            data: { ficheMedical: item?.fichemedicale, update: !!item?.fichemedicale, isMedecin: true, userId: item?.userId},
            width: '450px'
        })
        .afterClosed()
        .subscribe((res: FicheMedicalModel) => {
          console.log('rres', res);
            if (res) {
              this.dataSource.data[index].fichemedicale = res;
            }
        });
}
}
