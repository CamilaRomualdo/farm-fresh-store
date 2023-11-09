export type CartItems = { 
  [productID: string]: number 
};

export interface CartState {
  items: { [productID: string]: number };
  checkoutState: CheckoutState;
  errorMessage: string;
}

export type CheckoutResponse = { 
  success: boolean; 
  error?: string 
};

export type CheckoutState = "LOADING" | "READY" | "ERROR";

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageURL: string;
  imageAlt: string;
}

export interface ProductsState {
  products: { 
    [id: string]: Product 
  }
}
