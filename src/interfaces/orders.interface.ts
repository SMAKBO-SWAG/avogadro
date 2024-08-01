interface Order {
  name: string;
  number: string;
  paymentMethod: string;
  totalPrice: number;
  orders: Product[];
}

interface Product {
  name: string;
  type: string;
  price: number;
  size: string;
  amount: number;
}

export { Order, Product };
