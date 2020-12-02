import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as customerActions from '../actions/customer.actions';
import {
  AddCustomer,
  AddCustomerError,
  AddCustomerSuccess,
  GetAllCustomersError,
  GetAllCustomersSuccess,
  GetCustomer,
  GetCustomerError,
  GetCustomerSuccess,
  RemoveCustomer,
  RemoveCustomerError,
  RemoveCustomerSuccess,
  UpdateCustomer,
  UpdateCustomerError,
  UpdateCustomerSuccess
} from '../actions/customer.actions';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { CustomerService } from '../../pages/tables/customer/shared/customer.service';
import { Customer } from '../../pages/tables/customer/shared/customer.model';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable()
export class CustomerEffects {
  constructor(private actions$: Actions,
              private svc: CustomerService) {
  }

  @Effect()
  getAllCustomers$: Observable<Action> = this.actions$.pipe(
    ofType(customerActions.GET_CUSTOMERS),
    switchMap(() => this.svc.findAll()),
    map(customer => new GetAllCustomersSuccess(customer)),
    catchError((err) => [new GetAllCustomersError(err)])
  );

  @Effect()
  getCustomer$ = this.actions$.pipe(
    ofType(customerActions.GET_CUSTOMER),
    map((action: GetCustomer) => action.payload),
    switchMap(id => this.svc.findById(id)),
    map(customer => new GetCustomerSuccess(customer)),
    catchError((err) => [new GetCustomerError(err)])
  );


  @Effect()
  updateCustomer$ = this.actions$.pipe(
    ofType(customerActions.UPDATE_CUSTOMER),
    map((action: UpdateCustomer) => action.payload),
    switchMap(customer => this.svc.update(customer)),
    map(() => new UpdateCustomerSuccess()),
    catchError((err) => [new UpdateCustomerError(err)])
  );

  @Effect()
  createCustomer$ = this.actions$.pipe(
    ofType(customerActions.CREATE_CUSTOMER),
    map((action: AddCustomer) => action.payload),
    switchMap(newCustomer => this.svc.insert(newCustomer)),
    map((response) => new AddCustomerSuccess(response.id)),
    catchError((err) => [new AddCustomerError(err)])
  );

  @Effect()
  removeCustomer$ = this.actions$.pipe(
    ofType(customerActions.DELETE_CUSTOMER),
    map((action: RemoveCustomer) => action.payload),
    switchMap(id => this.svc.delete(id)),
    map((customer: Customer) => new RemoveCustomerSuccess(customer)),
    catchError((err) => [new RemoveCustomerError(err)])
  );
}
