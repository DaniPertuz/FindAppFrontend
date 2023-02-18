import { createContext } from 'react';

import { IProduct } from '../../interfaces';

type ProductsContextProps = {
    products:        IProduct[];
    loadProducts:    () => Promise<void>;
    loadProductByID: (productID: string) => Promise<IProduct>;
    addProduct:      (product: IProduct) => Promise<void>;
    updateProduct:   (productID: string, product: IProduct) => Promise<void>;
    deleteProduct:   (productID: string) => Promise<void>;
}

export const ProductsContext = createContext({} as ProductsContextProps);