import { Action } from '@ngrx/store';
import { Customer } from '../../pages/tables/customer/shared/customer.model';

export const GET_CUSTOMERS = '[ALL] Customers';
export const GET_CUSTOMERS_SUCCESS = '[ALL] Customers Success';
export const GET_CUSTOMERS_ERROR = '[ALL] Customers Error';

export const GET_CUSTOMER = '[GET] Customer';
export const GET_CUSTOMER_SUCCESS = '[GET] Customers Success';
export const GET_CUSTOMER_ERROR = '[GET] Customers Error';

export const CREATE_CUSTOMER = '[CREATE] Customer';
export const CREATE_CUSTOMER_SUCCESS = '[CREATE] Customer Success';
export const CREATE_CUSTOMER_ERROR = '[CREATE] Customer Error';

export const DELETE_CUSTOMER = '[DELETE] Customer';
export const DELETE_CUSTOMER_SUCCESS = '[DELETE] Customer Success';
export const DELETE_CUSTOMER_ERROR = '[DELETE] Customer Error';

export const UPDATE_CUSTOMER = '[UPDATE] Customer';
export const UPDATE_CUSTOMER_SUCCESS = '[UPDATE] Customer Success';
export const UPDATE_CUSTOMER_ERROR = '[UPDATE] Customer Error';

/****************************************
 * GET all the Customers
 ****************************************/
export class GetAllCustomers implements Action {
  readonly type = GET_CUSTOMERS;
}

export class GetAllCustomersSuccess implements Action {
  readonly type = GET_CUSTOMERS_SUCCESS;

  constructor(public payload: Customer[]) {
  }
}

export class GetAllCustomersError implements Action {
  readonly type = GET_CUSTOMERS_ERROR;

  constructor(public payload: Error) {
  }
}

/****************************************
 * GET Customer by id
 ****************************************/
export class GetCustomer implements Action {
  readonly type = GET_CUSTOMER;

  constructor(public payload: number) {
  }
}

export class GetCustomerSuccess implements Action {
  readonly type = GET_CUSTOMER_SUCCESS;

  constructor(public payload: Customer) {
  }
}

export class GetCustomerError implements Action {
  readonly type = GET_CUSTOMER_ERROR;

  constructor(public payload: Error) {
  }
}

/****************************************
 * ADD new Customer
 ****************************************/
export class AddCustomer implements Action {
  readonly type = CREATE_CUSTOMER;

  constructor(public payload: Customer) {
  }
}

export class AddCustomerSuccess implements Action {
  readonly type = CREATE_CUSTOMER_SUCCESS;

  constructor(public payload: number) {
  }
}

export class AddCustomerError implements Action {
  readonly type = CREATE_CUSTOMER_ERROR;

  constructor(public payload: Error) {
  }
}

/****************************************
 * REMOVE a Customer by id
 ****************************************/
export class RemoveCustomer implements Action {
  readonly type = DELETE_CUSTOMER;

  constructor(public payload: number) {
  }
}

export class RemoveCustomerSuccess implements Action {
  readonly type = DELETE_CUSTOMER_SUCCESS;

  constructor(public payload: Customer) {
  }
}

export class RemoveCustomerError implements Action {
  readonly type = DELETE_CUSTOMER_ERROR;

  constructor(public payload: Error) {
  }
}

/****************************************
 * UPDATE Customer by id
 ****************************************/
export class UpdateCustomer implements Action {
  readonly type = UPDATE_CUSTOMER;

  constructor(public payload: Customer) {
  }
}

export class UpdateCustomerSuccess implements Action {
  readonly type = UPDATE_CUSTOMER_SUCCESS;
}

export class UpdateCustomerError implements Action {
  readonly type = UPDATE_CUSTOMER_ERROR;

  constructor(public payload: Error) {
  }
}
