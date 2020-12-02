import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ListColumn } from '../../../../@fury/shared/list/list-column.model';
import { CustomerCreateUpdateComponent } from './customer-create-update/customer-create-update.component';
import { Customer } from './shared/customer.model';
import { fadeInRightAnimation } from '../../../../@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from '../../../../@fury/animations/fade-in-up.animation';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import * as customerActions from 'src/app/store/actions/customer.actions';
import * as customerReducer from '../../../store/reducers/customer.reducer';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'fury-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class CustomerComponent implements OnInit, AfterViewInit, OnDestroy {

  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<Customer[]> = new ReplaySubject<Customer[]>(1);
  data$: Observable<Customer[]> = this.subject$.asObservable();
  customers: Customer[];

  @Input()
  columns: ListColumn[] = [
    { name: 'ID', property: 'id', visible: true, isModelProperty: true },
    { name: 'Nombre', property: 'name', visible: true, isModelProperty: true },
    { name: 'Teléfono', property: 'phone', visible: true, isModelProperty: true },
    { name: 'Cumpleaños', property: 'birthDay', visible: true, isModelProperty: true },
    { name: 'Dirección', property: 'street', visible: true, isModelProperty: true },
    { name: 'Ciudad', property: 'city', visible: true, isModelProperty: true },
    { name: 'Actions', property: 'actions', visible: true },
  ] as ListColumn[];
  pageSize = 10;
  dataSource: MatTableDataSource<Customer> | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private dialog: MatDialog,
              private store: Store<AppState>,
              private snackbar: MatSnackBar) {
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  ngOnInit() {

    this.store.dispatch(new customerActions.GetAllCustomers());

    this.store.select(customerReducer.getCustomersError).subscribe((error) => this.showSnack(error, "Error Obteniendo la lista de clientes"));
    this.store.select(customerReducer.isDeleted).subscribe((done) => {
      this.showSnack(done, 'El cliente fue eliminado con éxito!!!');
    });
    this.store.select(customerReducer.getDeleteError).subscribe((error) => {
      this.showSnack(error, 'Error Eliminando al cliente');
    });
    this.store.select(customerReducer.isUpdated).subscribe((done) => {
      this.showSnack(done, 'El cliente fue modificado con éxito!!!');
    });
    this.store.select(customerReducer.getUpdateError).subscribe((error) => {
      this.showSnack(error, 'Error modificando al cliente');
    });
    this.store.select(customerReducer.isCreated).subscribe((done) => {
      this.showSnack(done, 'El cliente fue creado con éxito!!!');
    });
    this.store.select(customerReducer.getCreateError).subscribe((error) => {
      this.showSnack(error, 'Error creando el nuevo cliente');
    });

    this.store.select(customerReducer.getAllCustomers).subscribe(customers => {
      this.subject$.next(customers);
    });

    this.dataSource = new MatTableDataSource();

    this.data$.pipe(
      filter(Boolean)
    ).subscribe((customers) => {
      this.customers = customers;
      this.dataSource.data = customers;
    });
  }

  showSnack(done, msg){
    if (done) {
      this.snackbar.open(msg, 'CLOSE', {
        duration: 3000,
        horizontalPosition: 'right'
      });
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  createCustomer() {
    this.dialog.open(CustomerCreateUpdateComponent).afterClosed().subscribe((customer: Customer) => {
      /**
       * Customer is the updated customer (if the Customer pressed Save - otherwise it's null)
       */
      if (customer) {
        this.store.dispatch(new customerActions.AddCustomer(customer));
      }
    });
  }

  updateCustomer(customer) {
    this.dialog.open(CustomerCreateUpdateComponent, {
      data: customer
    }).afterClosed().subscribe((customer) => {
      /**
       * Customer is the updated customer (if the Customer pressed Save - otherwise it's null)
       */
      if (customer) {
        this.store.dispatch(new customerActions.UpdateCustomer(customer));
      }
    });
  }

  deleteCustomer(customer) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    this.store.dispatch(new customerActions.RemoveCustomer(customer.id));
  }

  onFilterChange(value) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  ngOnDestroy() {
  }
}
