import React from "react";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";

import {
  getTotalPrice,
  removeFromCart,
  updateQuantity,
  checkoutCart,
} from "../../redux/features/cartSlice";
import { AppDispatch, RootState } from "../../redux/store";

import styles from "./Cart.module.css";

export function Cart() {
  const dispatch: AppDispatch = useDispatch();

  const products = useSelector((state: RootState) => state.products.products);
  const items = useSelector((state: RootState) => state.cart.items);
  const totalPrice = useSelector(getTotalPrice);
  const checkoutState = useSelector((state: RootState) => state.cart.checkoutState);
  const errorMessage = useSelector((state: RootState) => state.cart.errorMessage);

  function onQuantityChanged(e: React.FocusEvent<HTMLInputElement>, id: string) {
    const quantity = Number(e.target.value) || 0;
    dispatch(updateQuantity({ id, quantity }));
  }

  function onCheckout(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(checkoutCart());
  }

  const tableClasses = classNames(styles.table, {
    [styles.checkoutError]: checkoutState === "ERROR",
    [styles.checkoutLoading]: checkoutState === "LOADING",
  });

  return (
    <main className="page">
      <h2>Shopping Cart</h2>
      <table className={tableClasses}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(items).map(([id]) => (
            <tr key={id}>
              <td>{products[id].name}</td>
              <td>
                <input
                  type="text"
                  className={styles.input}
                  onBlur={(e) => onQuantityChanged(e, id)}
                />
              </td>
              <td>${products[id].price.toFixed(2)}</td>
              <td>
                <button
                  onClick={() => dispatch(removeFromCart(id))}
                  aria-label={`Remove ${products[id].name} from Shopping Cart`}
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td></td>
            <td className={styles.total}>${totalPrice}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
      <form onSubmit={onCheckout}>
        {checkoutState === "ERROR" && errorMessage && (
          <div className={styles.errorBox}>
            <span>{errorMessage}</span>
          </div>
          
        )}
        <button className={styles.button} type="submit">
          Checkout
        </button>
      </form>
    </main>
  );
}