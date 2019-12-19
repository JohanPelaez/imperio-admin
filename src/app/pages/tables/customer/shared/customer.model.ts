export class Customer {
  id: number;
  name: string;
  phone: string;
  street: string;
  birthDay: string;
  city: string;

  constructor(customer) {
    this.id = customer.id || null;
    this.name = customer.name;
    this.phone = customer.phone;
    this.street = customer.street;
    this.birthDay = customer.birthDay;
    this.city = customer.city;
  }
}
