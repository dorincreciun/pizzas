import type {IProduct} from "../model/product.types";
import {Link} from "react-router";

type TProduct = Pick<IProduct, "id" | "imageUrl" | "name" | "basePrice">;

export const ProductSearchItem = ({id, imageUrl, name, basePrice}: TProduct) => {
    return (
        <Link
            to={`/product/${id}`}
            className="w-full relative py-2.5 px-5 hover:bg-primary/5"
        >
            <div className="flex items-center gap-4 relative z-20">
                <div className="size-7.5">
                    <img
                        className="size-full"
                        src={imageUrl ?? "/fallback-image.jpg"}
                        alt={name}
                    />
                </div>

                <span>{name}</span>
                <span className="text-muted">{basePrice}</span>
            </div>
        </Link>
    );
};
