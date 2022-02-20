import CategoryModel from '../models/categoryModel';


export class CategoryState {
   public categories: CategoryModel[] = []
}

export enum CategoryActionType {
    CategoriesDownloaded = "CategoriesDownloaded"
}

export interface CategoryAction {
    type: CategoryActionType,
    payload: any
}

export function CategoriesDownloadedAction(categories: CategoryModel[]): CategoryAction {
    return { type: CategoryActionType.CategoriesDownloaded, payload: categories};
}


export function categoriesReducer(initialState: CategoryState = new CategoryState(), action: CategoryAction): CategoryState{

    const newState = { ...initialState };

    switch (action.type) {
  
        case CategoryActionType.CategoriesDownloaded:
            newState.categories = action.payload;
            break;
      
    }
    return newState;
}