import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, tap } from 'rxjs/operators';
import { UserModel } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/user-service/users.service';
import { MatDialog } from '@angular/material/dialog';
import { EditFicheMedicalComponent } from 'src/app/shared/components/edit-fiche-medical/edit-fiche-medical.component';
import { FicheMedicalModel } from 'src/app/models/fiche-medical.model';
import { throwError } from 'rxjs';

@Component( {
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
} )
export class ListUsersComponent implements OnInit {
  displayedColumns: string[] = ['image', 'prenom', 'nom', 'adresse', 'actions'];
  dataSource = new MatTableDataSource<UserModel>( [] );
  length = 0;
  pageSize = 5;
  @ViewChild( MatPaginator ) paginator: MatPaginator;
  gSanguins: {label: string, value: string}[] = [
    {value: 'A+', label: 'A+'},
    {value: 'A-', label: 'A-'},
    {value: 'B+', label: 'B+'},
    {value: 'B-', label: 'B-'},
    {value: 'AB+', label: 'AB+'},
    {value: 'AB-', label: 'AB-'},
    {value: 'O+', label: 'O+'},
    {value: 'O-', label: 'O-'}
  ];

  genres: {label: string, value: string}[] = [
    {value: 'MASCULIN', label: 'Masculin'},
    {value: 'FEMININ', label: 'Feminin'},
  ];
  filterInfos: { filterType: 'gSanguin' | 'genre' | 'poids' | 'birthdate' | null, value: string } = {
    filterType: null,
    value: ''
  }
  @ViewChild('filter') filter: ElementRef;
  isLoading: boolean;
  constructor( private userService: UsersService, private cd: ChangeDetectorRef, private matDialog: MatDialog ) { }

  ngOnInit(): void {
    this.getUserCount();
    this.fetchUsers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.filter.nativeElement.hidden = true;
  }

  goTo( event: PageEvent ) {
    console.log( 'event', event );
    console.log( 'event length', this.length );

  }

  getUserCount() {
    this.userService.getUsersCount().pipe(
      tap( ( res: { count: number } ) => {
        this.length = res.count;
      } )
    ).subscribe();
  }

  fetchUsers() {
    this.isLoading = true;
    this.userService.getUsers().pipe(
      tap( ( res: UserModel[] ) => {
        this.isLoading = false;
        this.dataSource.data = res;
      } ),
      catchError((err) => {
        this.isLoading = false;
        return throwError(err)
      })
    ).subscribe();
  }

  fetchFicheMedicales(filterOptions?: {filterType: 'gSanguin' | 'genre' | 'poids' | 'birthdate', value: any} ) {
    this.isLoading = true;
    this.userService.getUsersByFilter(filterOptions).pipe(
      tap( ( res: UserModel[] ) => {
        this.isLoading = false;
        this.dataSource.data = res;
      } ),
      catchError((err) => {
        this.isLoading = false;
        return throwError(err)
      })
    ).subscribe();
  }

  editFicheMedical( item: UserModel, index: number ) {
    this.matDialog
      .open( EditFicheMedicalComponent, {
        data: { ficheMedical: item?.fichemedicale, update: !!item?.fichemedicale, isMedecin: true, userId: item?.userId },
        width: '450px'
      } )
      .afterClosed()
      .subscribe( ( res: FicheMedicalModel ) => {
        if ( res ) {
          this.dataSource.data[index].fichemedicale = res;
        }
      } );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyAdvancedFilter() {
    if(this.filterInfos.filterType) this.fetchFicheMedicales(this.filterInfos);
  }

  clearFilter() {
    this.filterInfos = {filterType: null, value: null};
    this.fetchUsers();
  }
}
