import React from 'react';
import findAPI from '../../api/findapi';

import { Categories, IProduct, IPlace, NumericRate } from '../../interfaces';
import { ProductsContext } from './ProductsContext';

export interface ProductsState {
    name: string;
    description: string;
    category: Categories;
    observation: string;
    price: number;
    place: IPlace | string;
    rate: NumericRate;
    img: string;
}

export const ProductsProvider = ({ children }: any) => {

    const loadProducts = async (): Promise<IProduct[]> => {
        try {
            const { data } = await findAPI.get<IProduct[]>('/products');
            return data;
        } catch (error) {
            throw new Error(`${error}`);
        }
    };

    const loadProductByID = async (productID: string): Promise<IProduct> => {
        try {
            const { data } = await findAPI.get<IProduct>(`/products/${productID}`);
            return data;
        } catch (error) {
            throw new Error(`${error}`);
        }
    };

    return (
        <ProductsContext.Provider value={{
            loadProducts,
            loadProductByID
        }}
        >
            {children}
        </ProductsContext.Provider>
    );
};