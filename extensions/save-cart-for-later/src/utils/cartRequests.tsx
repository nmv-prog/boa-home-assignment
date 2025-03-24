import { Dispatch, SetStateAction, useState } from "react";
import { extractDomain } from "./helpers";
import { SaveCartRequestType, SelectedItemType } from "./types";
import { useApi } from "@shopify/ui-extensions-react/checkout";

interface Props {
    selectedItems: SelectedItemType[],
}

const useCartSaver = () => {
    const [isSaved, setIsSaved] = useState(false);
    const [isHidden, setIsHidden] = useState(false);

    const api = useApi();
    const base_url = api.extension?.scriptUrl;
    const user_id = api.buyerIdentity.customer.current?.id || '';
    const shop_id = api.shop?.id || '';
    const productsInCart = api.lines?.current || [];

    const saveCart = async ({ selectedItems }: Props) => {
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

    return { saveCart, isSaved, isHidden, user_id, productsInCart };
    
};

export default useCartSaver;