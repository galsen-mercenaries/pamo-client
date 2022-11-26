import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FilterService } from 'primeng-lts/api';
import { Table } from 'primeng-lts/table';
import { tap } from 'rxjs/operators';
import { StructureSanitaireModel } from 'src/app/models/structure-sanitaire.model';
import { StructuresSanitairesService, TypePrestataire } from 'src/app/services/structures-sanitaires/structures-sanitaires.service';

@Component({
  selector: 'app-pharmacie-garde',
  templateUrl: './pharmacie-garde.component.html',
  styleUrls: ['./pharmacie-garde.component.scss']
})
export class PharmacieGardeComponent implements OnInit {
  displayedColumns: string[] = ['nom', 'adresse', 'email', 'disponibilité'];
  length = 0;
  pageSize = 5;
  listStructures: StructureSanitaireModel[] = [];
  filterInfos: { filterType: string, value: string } = {
    filterType: null,
    value: ''
  };
  isLoading: boolean;
  cols : any[] = [
    { field: 'nom', header: 'Nom' },
    { field: 'adresse', header: 'Adresse' },
    { field: 'email', header: 'Email' },
    { field: 'periodicityType', header: 'Disponibilité' }
  ]
  totalRecords: number;
  @ViewChild('dt') primeTable: Table;


  constructor(private structureService: StructuresSanitairesService, private cd: ChangeDetectorRef, private filterService: FilterService) { }

  ngOnInit(): void {
    this.fetchCount();
  }

  fetchPharmacie(event?: any) {
    console.log('event',event);

    this.pageSize = event?.rows || 5;
    const first = event?.first || 0;
    this.isLoading = true;
    const filterName = event?.filters?.nom?.value;
    const filterAdresse = event?.filters?.adresse?.value;
    if(!event) {
      this.fetchCount();
    }
    this.structureService.getStructureSanitairesByType(TypePrestataire.PHARMACIE, first, this.pageSize, filterName, filterAdresse).subscribe(
      (res) => {
        this.isLoading = false;
        this.listStructures = res;
      },
      (err) => {
        this.isLoading = false;
        console.log('err', err);

      }
    )
  }

  fetchCount() {
    this.structureService.getStructureCountByType(TypePrestataire.PHARMACIE).pipe(
        tap((countReponse: any) => {
            this.totalRecords = countReponse.count
        })
      ).subscribe()
  }
  clear() {
    this.primeTable.clear();
  }


seeOnMap(event: any) {}

}
