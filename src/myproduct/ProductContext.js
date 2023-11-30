import React, {createContext, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductContext = createContext();

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider = ({children}) => {
  const [ownedProducts, setOwnedProducts] = useState([]);

  useEffect(() => {
    const loadOwnedProducts = async () => {
      try {
        const savedOwnedProducts = await AsyncStorage.getItem('ownedProducts');
        if (savedOwnedProducts !== null) {
          setOwnedProducts(JSON.parse(savedOwnedProducts));
        }
      } catch (error) {
        console.error('Error loading ownedProducts from AsyncStorage:', error);
      }
    };

    loadOwnedProducts();
  }, []);

  const addProductToOwned = product => {
    setOwnedProducts([...ownedProducts, product]);
  };

  const removeProductFromOwned = (productName, quantityToRemove) => {
    setOwnedProducts(prevOwnedProducts => {
      const updatedProducts = [...prevOwnedProducts];
      const indexToRemove = updatedProducts.findIndex(
        p => p.title === productName,
      );

      if (indexToRemove !== -1) {
        updatedProducts.splice(indexToRemove, quantityToRemove);
      }

      return updatedProducts;
    });
  };

  useEffect(() => {
    const saveOwnedProducts = async () => {
      try {
        await AsyncStorage.setItem(
          'ownedProducts',
          JSON.stringify(ownedProducts),
        );
      } catch (error) {
        console.error('Error saving ownedProducts to AsyncStorage:', error);
      }
    };

    saveOwnedProducts();
  }, [ownedProducts]);

  return (
    <ProductContext.Provider
      value={{ownedProducts, addProductToOwned, removeProductFromOwned}}>
      {children}
    </ProductContext.Provider>
  );
};
