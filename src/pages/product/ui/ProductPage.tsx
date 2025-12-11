import { useParams } from "react-router";
import {
    ProductDescription,
    ProductImage,
    ProductTitle, useProduct,
} from "@entities/product";
import { Button, SegmentedControl } from "@shared/ui";

// const addons = [
//     {
//         image: "/test-pizza-2.png",
//         name: "Сливочная моцарелла",
//         price: 79,
//         isActive: true,
//     },
//     {
//         image: "/test-pizza.png",
//         name: "Сливочная моцарелла",
//         price: 79,
//         isActive: false,
//     },
//     {
//         image: "/test-pizza-3.png",
//         name: "Сливочная моцарелла",
//         price: 79,
//         isActive: false,
//     },
//     {
//         image: "/test-pizza-4.png",
//         name: "Сливочная моцарелла",
//         price: 79,
//         isActive: false,
//     },
// ];

const selectorSize = [
    { label: "Маленькая", value: "small" },
    { label: "Средняя", value: "medium" },
    { label: "Большая", value: "large" },
] as const;

const selectorDough = [
    { label: "Традиционное", value: "traditional" },
    { label: "Тонкое", value: "thin" },
] as const;

export const ProductPage = () => {
    const { id } = useParams<{ id: string }>();
    const {product, isLoading, error} = useProduct(Number(id))

    console.dir(product)

    if (isLoading) return <div>Loading…</div>;
    if (error) return <div>Eroare: {error}</div>;
    if (!product) return <div>Produsul nu a fost găsit</div>;

    return (
        <div className="container mx-auto">
            <div className="grid grid-cols-12 gap-10 items-stretch mt-10">
                <div className="col-span-5">
                    {/* Pizza image */}
                    <ProductImage />
                </div>
                <div className="col-span-7 h-full">
                    <div className="flex h-full flex-col justify-between gap-10">
                        {/* Pizza description */}
                        <div className="flex flex-1 flex-col gap-6">
                            <div>
                                <ProductTitle>{product.name}</ProductTitle>
                                {product.description && (
                                    <ProductDescription>
                                        {product.description}
                                    </ProductDescription>
                                )}
                            </div>

                            <div className="flex flex-col gap-2.5">
                                {selectorSize && (
                                    <SegmentedControl
                                        className="max-w-[420px]"
                                        options={selectorSize}
                                    />
                                )}
                                {selectorDough && (
                                    <SegmentedControl
                                        className="max-w-[420px]"
                                        options={selectorDough}
                                    />
                                )}
                            </div>
                        </div>

                        <Button size="large" className={"max-w-max"}>
                            Добавить в корзину за 799₽
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
