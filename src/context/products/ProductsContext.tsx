import { createContext } from 'react';

import { IProduct } from '../../interfaces';

type ProductsContextProps = {
    loadProducts:    () => Promise<IProduct[]>;
    loadProductByID: (productID: string) => Promise<IProduct>;
}

export const ProductsContext = createContext({} as ProductsContextProps);