import React from 'react';
import findAPI from '../../api/findapi';

import { ProductsContext } from './ProductsContext';
import { IProduct } from '../../interfaces';

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