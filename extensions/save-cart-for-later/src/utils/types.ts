export interface SelectedItemType {
    productId: string;
    productVariantId: string;
    title: string;
    quantity: number;
}

export interface SaveCartRequestType {
    userId: string;
    shopId: string;
    selectedItems: SelectedItemType[];
}

export interface ProductInCartType {
    id: string;
    quantity: number;
    merchandise: {
        id: string;
        title: string;
        product: {
            id: string;
        };
    };
};