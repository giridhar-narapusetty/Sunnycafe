
export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: 'Hot' | 'Cold' | 'Specialty';
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface BillingDetails {
  customerName: string;
  items: CartItem[];
  total: number;
  date: string;
}
