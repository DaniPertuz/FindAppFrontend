import React, { useEffect, useState } from 'react';
import findAPI from '../../api/findapi';

import { Categories, IProduct, IPlace } from '../../interfaces';
import { ProductsContext } from './ProductsContext';

export interface ProductsState {
    name: string;
    description: string;
    category: Categories;
    observation: string;
    price: number;
    restaurant: IPlace | string;
    rate: number;
    img: string;
}

export const ProductsProvider = ({ children }: any) => {

    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async (): Promise<void> => {
        try {
            const resp = await findAPI.get('/products');
            setProducts([...resp.data.products]);
        } catch (error) {
            throw new Error(`${error}`);
        }
    };

    const loadProductByID = async (productID: string): Promise<IProduct> => {
        try {
            const resp = await findAPI.get<IProduct>(`/orders/${productID}`);
            return resp.data;
        } catch (error) {
            throw new Error(`${error}`);
        }
    };

    const addProduct = async (product: IProduct): Promise<void> => {
        try {
            const resp = await findAPI.post<IProduct>('/products', {
                product
            });

            setProducts([...products, resp.data]);
        } catch (error) {
            throw new Error(`${error}`);
        }
    };

    const updateProduct = async (productID: string, order: IProduct) => {
        try {
            const resp = await findAPI.put<IProduct>(`/products/${productID}`, {
                order
            });

            setProducts(products.map(product => {
                return (product._id === productID) ? resp.data : product;
            }));
        } catch (error) {
            throw new Error(`${error}`);
        }
    };

    const deleteProduct = async (productID: string) => {
        try {
            const resp = await findAPI.put<IProduct>(`/products/${productID}`, {
                id: productID
            });

            setProducts(products.map(product => {
                return (product.status === true) ? resp.data : product;
            }));
        } catch (error) {
            throw new Error(`${error}`);
        }
    };

    return (
        <ProductsContext.Provider value={{
            products,
            loadProducts,
            loadProductByID,
            addProduct,
            updateProduct,
            deleteProduct
        }}
        >
            {children}
        </ProductsContext.Provider>
    );
};