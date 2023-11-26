import React, { createContext, useContext, useState } from 'react';

const ProductContext = createContext();

export const useProductContext = () => {
  return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
  const [ownedProducts, setOwnedProducts] = useState([]);

  const addProductToOwned = (product) => {
    setOwnedProducts((prevOwnedProducts) => [...prevOwnedProducts, product]);
  };

  const removeProductFromOwned = (productTitle) => {
    setOwnedProducts((prevOwnedProducts) =>
      prevOwnedProducts.filter((product) => product.title !== productTitle)
    );
  };

  return (
    <ProductContext.Provider value={{ ownedProducts, addProductToOwned, removeProductFromOwned }}>
      {children}
    </ProductContext.Provider>
  );
};
