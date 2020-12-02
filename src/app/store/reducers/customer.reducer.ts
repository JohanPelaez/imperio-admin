import * as customerActions from '../actions/customer.actions';
import { AppAction } from '../app.action';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Customer } from 'src/app/pages/tables/customer/shared/customer.model';
import { ConditionalExpr } from '@angular/compiler';

export interface State {
    data: Customer[];
    selected: Customer;
    action: string;
    done: boolean;
    error?: Error;
}

const initialState: State = {
    data: [],
    selected: null,
    action: null,
    done: false,
    error: null
};

export function reducer(state = initialState, action: AppAction): State{
    console.log(action);
    // ...state create immutable state object
    switch (action.type) {
        /*************************
        * GET all Customers actions
        ************************/
        case customerActions.GET_CUSTOMERS:
            return {
                ...state,
                action: customerActions.GET_CUSTOMERS,
                done: false,
                selected: null,
                error: null
            };
        case customerActions.GET_CUSTOMERS_SUCCESS:
            return {
                ...state,
                data: action.payload,
                done: true,
                selected: null,
                error: null
            };
        case customerActions.GET_CUSTOMERS_ERROR:
            return {
                ...state,
                done: true,
                selected: null,
                error: action.payload
            };

        /*************************
        * GET Customer by id actions
        ************************/
        case customerActions.GET_CUSTOMER:
            return {
                ...state,
                action: customerActions.GET_CUSTOMER,
                done: false,
                selected: null,
                error: null
            };
        case customerActions.GET_CUSTOMER_SUCCESS:
            return {
                ...state,
                selected: action.payload,
                done: true,
                error: null
            };
        case customerActions.GET_CUSTOMER_ERROR:
            return {
                ...state,
                selected: null,
                done: true,
                error: action.payload
            };

        /*************************
        * CREATE Customer actions
        ************************/
        case customerActions.CREATE_CUSTOMER:
            return {
                ...state,
                selected: action.payload,
                action: customerActions.CREATE_CUSTOMER,
                done: false,
                error: null
            };
        case customerActions.CREATE_CUSTOMER_SUCCESS:
            {
                const newCustomer = {
                    ...state.selected,
                    id: action.payload
                };
                const data = [
                    ...state.data,
                    newCustomer
                ];
                return {
                    ...state,
                    data,
                    selected: null,
                    error: null,
                    done: true
                };
            }
        case customerActions.CREATE_CUSTOMER_ERROR:
            return {
                ...state,
                selected: null,
                done: true,
                error: action.payload
            };

        /*************************
        * UPDATE Customer actions
        ************************/
        case customerActions.UPDATE_CUSTOMER:
            return {
                ...state,
                selected: action.payload,
                action: customerActions.UPDATE_CUSTOMER,
                done: false,
                error: null
            };
        case customerActions.UPDATE_CUSTOMER_SUCCESS:
            {
                const index = state
                    .data
                    .findIndex(h => h.id === state.selected.id);
                if (index >= 0) {
                    const data = [
                    ...state.data.slice(0, index),
                    state.selected,
                    ...state.data.slice(index + 1)
                    ];
                    return {
                    ...state,
                    data,
                    done: true,
                    selected: null,
                    error: null
                    };
                }
                return state;
            }
        case customerActions.UPDATE_CUSTOMER_ERROR:
            return {
                ...state,
                done: true,
                selected: null,
                error: action.payload
            };

        /*************************
        * DELETE Customer actions
        ************************/
        case customerActions.DELETE_CUSTOMER:
            {
                const selected = state.data.find(h => h.id === action.payload);
                return {
                    ...state,
                    selected,
                    action: customerActions.DELETE_CUSTOMER,
                    done: false,
                    error: null
                };
            }
        case customerActions.DELETE_CUSTOMER_SUCCESS:
            {
                const data = state.data.filter(h => h.id !== state.selected.id);
                return {
                    ...state,
                    data,
                    selected: null,
                    error: null,
                    done: true
                };
            }
        case customerActions.DELETE_CUSTOMER_ERROR:
            return {
                ...state,
                selected: null,
                done: true,
                error: action.payload
            };
    }
    return state;
}

/*************************
 * SELECTORS
 ************************/
export const getCustomersState = createFeatureSelector < State > ('customers');
export const getAllCustomers = createSelector(getCustomersState, (state: State) => state.data);
export const getCustomer = createSelector(getCustomersState, (state: State) => {
    if (state.action === customerActions.GET_CUSTOMER && state.done) {
        return state.selected;
    } else {
        return null;
    }

});
export const isDeleted = createSelector(getCustomersState, (state: State) =>
    state.action === customerActions.DELETE_CUSTOMER && state.done && !state.error);
export const isCreated = createSelector(getCustomersState, (state: State) =>
    state.action === customerActions.CREATE_CUSTOMER && state.done && !state.error);
export const isUpdated = createSelector(getCustomersState, (state: State) =>
    state.action === customerActions.UPDATE_CUSTOMER && state.done && !state.error);

export const getDeleteError = createSelector(getCustomersState, (state: State) => {
    return state.action === customerActions.DELETE_CUSTOMER
        ? state.error
    : null;
});
export const getCreateError = createSelector(getCustomersState, (state: State) => {
    return state.action === customerActions.CREATE_CUSTOMER
        ? state.error
    : null;
});
export const getUpdateError = createSelector(getCustomersState, (state: State) => {
    return state.action === customerActions.UPDATE_CUSTOMER
        ? state.error
    : null;
});
export const getCustomersError = createSelector(getCustomersState, (state: State) => {
    return state.action === customerActions.GET_CUSTOMER
        ? state.error
    : null;
});
export const getCustomerError = createSelector(getCustomersState, (state: State) => {
    return state.action === customerActions.GET_CUSTOMER
        ? state.error
    : null;
});
