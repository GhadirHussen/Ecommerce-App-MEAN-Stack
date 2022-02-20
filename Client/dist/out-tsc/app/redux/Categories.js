export class CategoryState {
    constructor() {
        this.categories = [];
    }
}
export var CategoryActionType;
(function (CategoryActionType) {
    CategoryActionType["CategoriesDownloaded"] = "CategoriesDownloaded";
})(CategoryActionType || (CategoryActionType = {}));
export function CategoriesDownloadedAction(categories) {
    return { type: CategoryActionType.CategoriesDownloaded, payload: categories };
}
export function categoriesReducer(initialState = new CategoryState(), action) {
    const newState = Object.assign({}, initialState);
    switch (action.type) {
        case CategoryActionType.CategoriesDownloaded:
            newState.categories = action.payload;
            break;
    }
    return newState;
}
//# sourceMappingURL=Categories.js.map