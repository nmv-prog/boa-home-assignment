import { Dispatch, SetStateAction } from "react";
import { extractDomain } from "./helpers";
import { SaveCartRequestType, SelectedItemType } from "./types";

interface Props {
    selectedItems: SelectedItemType[],
    base_url: string,
    user_id: string,
    shop_id: string,
    setIsSaved: Dispatch<SetStateAction<boolean>>
    setIsHidden: Dispatch<SetStateAction<boolean>>
}

export const saveCart = async ({ selectedItems, base_url, user_id, shop_id, setIsSaved, setIsHidden }: Props) => {
    try {
        const response = await fetch(`${extractDomain(base_url)}/api/save-cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: user_id,
                shopId: shop_id,
                selectedItems,
            } as SaveCartRequestType),
        });

        const data = await response.json();
        if (response.ok) {
            setIsSaved(true);
            setTimeout(() => {
                setIsHidden(true);
            }, 3000);
            console.log('Cart saved successfully:', data);
        } else {
            console.error('Error saving cart:', data.error);
        }
    } catch (error) {
        console.error('Error sending request:', error);
    }
};