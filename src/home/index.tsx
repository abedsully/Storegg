import {Dispatch, SetStateAction} from 'react';

export interface IHomeScreenProps {
  setDetailUrl: Dispatch<SetStateAction<string | null>>;
}

export interface IGetProduct {
  id: number;
  title: string;
  price: string;
  description: string;
  category: string;
  image: string;
  rating: IGetProductResponse[];
}

export interface IGetProductResponse {
  rate: number;
  count: number;
}
