import * as fromCustomer from './reducers/customer.reducer';

export interface AppState {
  customers: fromCustomer.State;
}