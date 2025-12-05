import {cn} from "@shared/lib/cn";

interface IProductTitleProps {
    children: string
    className?: string
}

export const ProductTitle = ({children, className}: IProductTitleProps) => {
    return <h2 className={cn("text-[22px] font-bold text-black", className)}>{children}</h2>
}