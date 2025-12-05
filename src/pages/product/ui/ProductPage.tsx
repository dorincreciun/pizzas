import {useParams} from "react-router";
import {ProductDescription, ProductImage, ProductTitle} from "@entities/product";

export const ProductPage = () => {
    const {id} = useParams<{ id: string }>();
    console.dir(id)
    return (
        <div className="container mx-auto">
            <div className="grid grid-cols-12 gap-10 mt-10">
                <div className="col-span-5">
                    <ProductImage />
                </div>
                <div className="col-span-7 bg-green-500/10">
                    <div>
                        <ProductTitle className={"mb-3.5"}>Пепперони фреш</ProductTitle>
                        <ProductDescription>25 см, традиционное тесто 25, 380 г</ProductDescription>
                    </div>
                </div>
            </div>
        </div>
    )
}