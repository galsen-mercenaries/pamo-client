import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RegistrationRoutingModule} from './registration-routing.module';
import {RegistrationComponent} from './pages/registration/registration.component';
import {SwiperModule} from 'ngx-swiper-wrapper';
import {SWIPER_CONFIG} from 'ngx-swiper-wrapper';
import {SwiperConfigInterface} from 'ngx-swiper-wrapper';
import {ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {RegistrationSuccessDialogComponent} from './components/registration-success-dialog/registration-success-dialog.component';
import {MatIconModule} from '@angular/material/icon';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 'auto'
};

@NgModule({
    declarations: [RegistrationComponent, RegistrationSuccessDialogComponent],
    entryComponents: [RegistrationSuccessDialogComponent],
    imports: [
        CommonModule,
        RegistrationRoutingModule,
        SwiperModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatDialogModule
    ],
    providers: [
        {
            provide: SWIPER_CONFIG,
            useValue: DEFAULT_SWIPER_CONFIG
        }
    ]
})
export class RegistrationModule {}
