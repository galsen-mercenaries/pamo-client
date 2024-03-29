import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {SwiperComponent, SwiperConfigInterface} from 'ngx-swiper-wrapper';
import {switchMap, tap} from 'rxjs/operators';
import {MedecinFiltersEnum} from 'src/app/enums/medecin-filters.enum';
import {MedecinModel} from 'src/app/models/medecin.model';
import {SpecializationModel} from 'src/app/models/specialization.model';
import {MedecinService} from 'src/app/services/medecin-service/medecin.service';

@Component({
    selector: 'app-search-medecin-dialog',
    templateUrl: './search-medecin-dialog.component.html',
    styleUrls: ['./search-medecin-dialog.component.scss']
})
export class SearchMedecinDialogComponent implements OnInit {
  doctors: MedecinModel[] = [];
  filteredDoctors: MedecinModel[] = [];
  specialities: SpecializationModel[] = [];
  swiperConfig: SwiperConfigInterface = {
    keyboard: false,
    mousewheel: false,
    scrollbar: false,
    navigation: false,
    pagination: false,
    autoplay: false,
    loop: false,
    slidesPerView: 1,
  };
  @ViewChild("swiper", { static: false }) swiper: SwiperComponent;
  currentTabIndex = 0;
  constructor(
    private medecinService: MedecinService,
    private matDialog: MatDialogRef<SearchMedecinDialogComponent>
  ) {}

    ngOnInit() {
        this.getSpecialitiesAndDoctors();
    }

  getSpecialitiesAndDoctors() {
    const medecinFilters = [
      MedecinFiltersEnum.USER,
      MedecinFiltersEnum.STRUCTURE,
      MedecinFiltersEnum.SPECIALITES,
    ];
    this.medecinService
      .getAllSpecialities()
      .pipe(
        tap((specialities) => {
          this.specialities = specialities;
        }),
        switchMap(() => {
          return this.medecinService.getAllMedecins(medecinFilters).pipe(
            tap((medecins) => {
              this.doctors = medecins;
              this.filterDoctorsByCurrentSpecialization();
            })
          );
        })
      )
      .subscribe();
  }

  filterDoctorsByCurrentSpecialization() {
    const currentSpecialization = this.specialities[this.currentTabIndex];
    this.filteredDoctors = this.doctors.filter((doctor) => {
      return doctor?.specialisations
        ?.map((spec) => spec.specialisationId)
        ?.includes(currentSpecialization.specialisationId);
    });
  }

  goTab(index: number) {
    this.currentTabIndex = index;
    this.swiper.directiveRef.setIndex(index);
    this.filterDoctorsByCurrentSpecialization();
  }

  onIndexChanged(event) {
    this.currentTabIndex = event;
    this.filterDoctorsByCurrentSpecialization();
  }

    chooseMedecin(medecin) {
        this.matDialog.close({medecin});
    }
}
