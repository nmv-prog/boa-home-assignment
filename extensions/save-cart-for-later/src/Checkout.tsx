import {
  Banner,
  BlockStack,
  Button,
  Checkbox,
  reactExtension,
  View,
} from "@shopify/ui-extensions-react/checkout";
import { useState } from "react";
import useCartSaver from "./utils/cartRequests";
import { ProductInCartType, SelectedItemType } from "./utils/types";

export default reactExtension("purchase.checkout.block.render", () => (
  <Extension />
));

function Extension() {

  const [selectedItems, setSelectedItems] = useState<SelectedItemType[]>([]);

  const { saveCart, isSaved, isHidden, user_id, productsInCart } = useCartSaver();

  const handleCheckboxChange = (product: ProductInCartType) => {
    setSelectedItems((prev) => {
      const exists = prev.some((item) => item.productId === product.merchandise.product.id);
      return exists
        ? prev.filter((item) => item.productId !== product.merchandise.product.id)
        : [...prev, {
          productId: product.merchandise.product.id,
          productVariantId: product.merchandise.id,
          title: product.merchandise.title,
          quantity: product.quantity,
        }];
    });
  };

  return (
    <>
      <BlockStack border={"dotted"} padding={"tight"} borderRadius={"large"} display={isHidden ? 'none' : 'auto'} >

        {!user_id &&
          <Banner status="warning" >
            If you want to save products, please log in to your account.
          </Banner>
        }

        {!isSaved ? <Banner status="info" title="Save your cart" >
          {productsInCart.map((product) => (
            <View key={product.id} padding={"extraTight"}>
              <Checkbox disabled={!user_id}
                onChange={() => handleCheckboxChange(product)}
              >
                {product.merchandise.title}
              </Checkbox>
            </View>
          ))}
          <View padding={"extraTight"} >
            <Button
              disabled={!user_id}
              onPress={() => saveCart({ selectedItems })}
            >
              Save
            </Button>
          </View>
        </Banner> :

          <Banner status="success"  >
            Products was sucsessfully saved!
          </Banner>
        }
      </BlockStack>

    </>
  );
}
