// CoinContext.tsx
import React, {createContext, useContext, useState, ReactNode} from 'react';

interface CoinContextProps {
  coinValue: number;
  setCoinValue: (value: number) => void;
}

const CoinContext = createContext<CoinContextProps | undefined>(undefined);

interface CoinProviderProps {
  children: ReactNode;
}

export const CoinProvider: React.FC<CoinProviderProps> = ({children}) => {
  const [coinValue, setCoinValue] = useState<number>(0);

  return (
    <CoinContext.Provider value={{coinValue, setCoinValue}}>
      {children}
    </CoinContext.Provider>
  );
};

export const useCoinContext = () => {
  const context = useContext(CoinContext);
  if (!context) {
    throw new Error('useCoinContext must be used within a CoinProvider');
  }
  return context;
};
