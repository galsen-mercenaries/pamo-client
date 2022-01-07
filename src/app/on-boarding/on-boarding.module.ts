import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OnBoardingRoutingModule} from './on-boarding-routing.module';
import {OnBoardingPageComponent} from './pages/on-boarding-page/on-boarding-page.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SwiperConfigInterface, SwiperModule, SWIPER_CONFIG} from 'ngx-swiper-wrapper';
import {NewsCardItemComponent} from './components/news-card-item/news-card-item.component';
import {LoginFormDialogComponent} from './components/login-form-dialog/login-form-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 'auto'
};

@NgModule({
    declarations: [OnBoardingPageComponent, NewsCardItemComponent, LoginFormDialogComponent],
    entryComponents: [LoginFormDialogComponent],
    imports: [
        CommonModule,
        OnBoardingRoutingModule,
        MatIconModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        SwiperModule,
        MatDialogModule,
        MatProgressSpinnerModule
    ],
    providers: [
        {
            provide: SWIPER_CONFIG,
            useValue: DEFAULT_SWIPER_CONFIG
        }
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class OnBoardingModule {}
