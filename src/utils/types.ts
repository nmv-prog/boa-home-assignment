interface SelectedItemType {
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