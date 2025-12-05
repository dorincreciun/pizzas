import type {FC, ImgHTMLAttributes, RefObject} from "react";
import {cn} from "@shared/lib/cn";

interface ProductImageProps extends ImgHTMLAttributes<HTMLImageElement>{
    ref?: RefObject<HTMLImageElement>
    imageUrl?: string
    title?: string
}

export const ProductImage: FC<ProductImageProps> = ({ref, imageUrl, title, className, ...rest}) => {
    return (
        <div className={"bg-image-bg rounded-2xl aspect-square"}>
            <img
                className={cn("size-full p-7", className)}
                ref={ref}
                src={imageUrl ?? "/fallback-image.jpg"}
                alt={title ?? "Image not found"}
                {...rest}
            />
        </div>
    )
}