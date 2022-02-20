export class ProductState {
    constructor() {
        this.products = [];
    }
}
export var ProductActionType;
(function (ProductActionType) {
    ProductActionType["ProductsDownloaded"] = "ProductDownloaded";
    ProductActionType["ProductAdded"] = "ProductAdded";
    ProductActionType["ProductRemoved"] = "ProductRemoved";
    ProductActionType["categoriesDownloaded"] = "categoriesDownloaded";
    ProductActionType["productUpdated"] = "productUpdated";
})(ProductActionType || (ProductActionType = {}));
export function productsDownloadedAction(products) {
    return { type: ProductActionType.ProductsDownloaded, payload: products };
}
export function productAddedAction(product) {
    return { type: ProductActionType.ProductAdded, payload: product };
}
export function productDeletedAction(id) {
    return { type: ProductActionType.ProductRemoved, payload: id };
}
export function productUpdatedAction(product) {
    return { type: ProductActionType.productUpdated, payload: product };
}
export function productsReducer(initialState = new ProductState(), action) {
    const newState = Object.assign({}, initialState);
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
//# sourceMappingURL=Products.js.map