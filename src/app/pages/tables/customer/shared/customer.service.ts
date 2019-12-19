import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from './customer.model';

@Injectable()
export class CustomerService {
  protected URL = 'http://api.manantialdeinnovaciones.com/customer';

  constructor(protected http: HttpClient) {
  }

  /**
   * Find an object by its identifier
   * @param id the object identifier
   * @returns gets the object found
   */
  public findById(id: any): Observable<Customer> {
    return this.http.get<Customer>(this.URL + '/' + id);
  }

  /**
   * Find all the elements
   * @returns gets the list of objects found
   */
  public findAll(params?): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.URL, {params});
  }

  /**
   * Delete an object by its identifier field
   * @param id the object identifier
   * @returns gets the response
   */
  public delete(id): Observable<Customer> {
    return this.http.delete<Customer>(this.URL + '/' + id);
  }

  /**
   * Insert the data
   * @param data the object containing the data to be inserted
   * @returns gets the response
   */
  public insert(data: Customer): Observable<Customer> {
    let headers = new HttpHeaders();
    
    headers = headers.set('Content-Type', 'text/plain; charset=utf-8');
    console.log(data);

    return this.http.post<Customer>(this.URL, data, {headers});
  }

  /**
   * Update specific object into DB
   * @param game the object to be updated
   * @returns gets the response
   */
  public update(customer: Customer): Observable<Customer> {
    let headers = new HttpHeaders();
    
    headers = headers.set('Content-Type', 'text/plain; charset=utf-8');

    return this.http.put<Customer>(this.URL + '/' + customer.id, customer, {headers});
  }
}
