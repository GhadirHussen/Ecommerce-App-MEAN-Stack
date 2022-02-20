class ProductModel {
    static convertToFormData(product) {
        const myFormData = new FormData();
        myFormData.append("name", product.name);
        myFormData.append("price", product.price.toString());
        myFormData.append("stock", product.stock.toString());
        myFormData.append("categoryId", product.categoryId);
        if (product.image)
            myFormData.append("image", product.image.item(0));
        return myFormData;
    }
}
export default ProductModel;
//# sourceMappingURL=product.Model.js.map