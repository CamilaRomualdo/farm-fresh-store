import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { receivedProducts } from "../../redux/features/productsSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { getProducts } from "../../services/API";

import styles from "./Products.module.css";
import { addToCart } from "../../redux/features/cartSlice";

export function Products() {
  const dispatch: AppDispatch = useDispatch();

  const products = useSelector((state: RootState) => state.products.products);

  useEffect(() => {
    getProducts().then((products) => {
      dispatch(receivedProducts(products));
    });
  }, []);

  return (
    <main>
      <ul className={styles.products}>
        {Object.values(products).map((product) => (
          <li key={product.id}>
            <article className={styles.product}>
              <figure>
                <img src={product.imageURL} alt={product.imageAlt} />
                
              </figure>
              <div>
                <h1>{product.name}</h1>
                <p>{product.description}</p>
                <p>${product.price}</p>
                <button className={styles.addButton} onClick={() => dispatch(addToCart(product.id))}>
                  Add to Cart 🛒
                </button>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </main>
  );
}
