import ProductModel from '../models/product.Model';

export class ProductState {
   public products: ProductModel[] = []!
}

export enum ProductActionType {
    ProductsDownloaded = "ProductDownloaded",
    ProductAdded = "ProductAdded",
    ProductRemoved = "ProductRemoved",
    categoriesDownloaded = "categoriesDownloaded",
    productUpdated = "productUpdated"
}

export interface ProductAction {
    type: ProductActionType,
    payload: any
}

export function productsDownloadedAction(products: ProductModel[]): ProductAction {
    return { type: ProductActionType.ProductsDownloaded, payload: products };
}
export function productAddedAction(product: ProductModel): ProductAction {
    return { type: ProductActionType.ProductAdded, payload: product };
}
export function productDeletedAction(id: string): ProductAction {
    return { type: ProductActionType.ProductRemoved, payload: id };
}

export function productUpdatedAction(product: ProductModel): ProductAction {
    return { type: ProductActionType.productUpdated, payload: product };
}


export function productsReducer(initialState: ProductState = new ProductState(), action: ProductAction): ProductState{

    const newState = { ...initialState };

    switch (action.type) {
        case ProductActionType.ProductsDownloaded:
            newState.products = action.payload;
            break;

        case ProductActionType.ProductAdded:
            newState.products = action.payload;
            break;
        case ProductActionType.productUpdated: { 
            const index = newState.products.findIndex(p => p.id === action.payload.id);
            newState.products[index] = action.payload;
            break;
        }
    }
    return newState;
}