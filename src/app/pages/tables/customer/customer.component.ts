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
import { CustomerService } from './shared/customer.service';

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
              private customerData: CustomerService) {
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  /**
   * Example on how to get data and pass it to the table - usually you would want a dedicated service with a HTTP request for this
   * We are simulating this request here.
   */
  getData() {
    return this.customerData.findAll();
  }

  ngOnInit() {
    this.getData().subscribe(customers => {
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

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  createCustomer() {
    this.dialog.open(CustomerCreateUpdateComponent).afterClosed().subscribe((customer: Customer) => {
      /**
       * Customer is the updated customer (if the user pressed Save - otherwise it's null)
       */
      if (customer) {
        this.customerData.insert(customer).subscribe(newCustomer => {
          if (newCustomer) {
            this.customers.unshift(new Customer(newCustomer));
            this.subject$.next(this.customers);
          } else {
            alert('pailas');
          }
        })
      }
    });
  }

  updateCustomer(customer) {
    this.dialog.open(CustomerCreateUpdateComponent, {
      data: customer
    }).afterClosed().subscribe((customer) => {
      /**
       * Customer is the updated customer (if the user pressed Save - otherwise it's null)
       */
      if (customer) {
        this.customerData.update(customer).subscribe(newCustomer => {
          if (newCustomer) {
            const index = this.customers.findIndex((existingCustomer) => existingCustomer.id === newCustomer.id);
            this.customers[index] = new Customer(newCustomer);
            this.subject$.next(this.customers);
          } else {
            alert('pailas');
          }
        })
        const index = this.customers.findIndex((existingCustomer) => existingCustomer.id === customer.id);
        this.customers[index] = new Customer(customer);
        this.subject$.next(this.customers);
      }
    });
  }

  deleteCustomer(customer) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    this.customers.splice(this.customers.findIndex((existingCustomer) => existingCustomer.id === customer.id), 1);
    this.subject$.next(this.customers);
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
