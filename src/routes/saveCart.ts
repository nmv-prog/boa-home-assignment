import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { SaveCartRequestType } from "../utils/types.js";

const router = Router();
const prisma = new PrismaClient();

router.post("/save-cart", async (req, res) => {
    try {
        const { userId, shopId, selectedItems }: SaveCartRequestType = req.body;

        const cartItems = await Promise.all(
            selectedItems.map(async (item) => {
                const existingItem = await prisma.cartItem.findFirst({
                    where: {
                        userId,
                        shopId,
                        productId: item.productId,
                        productVariantId: item.productVariantId,
                    },
                });

                if (existingItem) {
                    return prisma.cartItem.update({
                        where: { id: existingItem.id },
                        data: { quantity: existingItem.quantity + item.quantity },
                    });
                } else {
                    return prisma.cartItem.create({
                        data: {
                            userId,
                            productId: item.productId,
                            productVariantId: item.productVariantId,
                            title: item.title,
                            quantity: item.quantity,
                            shopId,
                            createdAt: new Date(),
                        },
                    });
                }
            })
        );

        res.status(201).json({ message: "Cart updated successfully", cartItems });
    } catch (error) {
        console.error("Error saving cart:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;