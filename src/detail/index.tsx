import { Dispatch, SetStateAction } from "react";

export interface IDetailScreenProps {
    setDetailUrl: Dispatch<SetStateAction<string|null>>
    detailUrl: string;
}

export interface IDetailScreenState {
    data: IGetProductDetail
}

export interface IGetProductDetail {
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

