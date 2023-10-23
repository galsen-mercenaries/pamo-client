import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PrestatairesStructuresMapRoutingModule} from './prestataires-structures-map-routing.module';
import {StructuresByPrestatairesComponent} from './pages/structures-by-prestataires/structures-by-prestataires.component';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {TableModule} from 'primeng/table';

@NgModule({
    declarations: [StructuresByPrestatairesComponent],
    exports: [StructuresByPrestatairesComponent],
    entryComponents: [StructuresByPrestatairesComponent],
    imports: [CommonModule, PrestatairesStructuresMapRoutingModule, AutoCompleteModule, FormsModule, MatIconModule, TableModule]
})
export class PrestatairesStructuresMapModule {}
