import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BreadcrumbsModule } from '../../../../@fury/shared/breadcrumbs/breadcrumbs.module';
import { ListModule } from '../../../../@fury/shared/list/list.module';
import { MaterialModule } from '../../../../@fury/shared/material-components.module';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { CustomerCreateUpdateModule } from './customer-create-update/customer-create-update.module';
import { FurySharedModule } from '../../../../@fury/fury-shared.module';
import { CustomerService } from './shared/customer.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from '../../../store/reducers/customer.reducer';
import { CustomerEffects } from 'src/app/store/effects/customer.effects';

@NgModule({
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    MaterialModule,
    FurySharedModule,

    // Core
    ListModule,
    CustomerCreateUpdateModule,
    BreadcrumbsModule,
    StoreModule.forRoot({
      customers: reducer
    }),
    EffectsModule.forRoot([CustomerEffects])
  ],
  declarations: [CustomerComponent],
  exports: [CustomerComponent],
  providers: [CustomerService]
})
export class CustomerModule {
}
