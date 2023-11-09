import { Product, CartItems, CheckoutResponse } from "../types";
import { sleep } from "../utils";

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch("/products.json");
    if (!response.ok) throw new Error("Network response was not ok.");
    return response.json();
  } catch (error) {
    console.error("There was a problem fetching the products:", error);
    throw error;
  }
}

export async function checkout(items: CartItems): Promise<CheckoutResponse> {
  try {
    // Add delay to simulate API call slowness.
    await sleep(500);
    // Determine the right endpoint based on items presence
    const endpoint = Object.keys(items).length > 0 ? "success" : "error";
    const response = await fetch(`/checkout-${endpoint}.json`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(items),
    });

    if (!response.ok) throw new Error("Network response was not ok.");

    const data: CheckoutResponse = await response.json();
    if (!data.success) {
      throw new Error(data.error || "Unknown error occurred during checkout.");
    }

    return data;
  } catch (error) {
    console.error("Checkout failed:", error);
    throw error;
  }
}