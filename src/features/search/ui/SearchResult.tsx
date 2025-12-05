import { cn } from "@shared/lib/cn";
import { type IProduct, ProductSearchItem } from "@entities/product";

export const SearchResult = ({ searchResults }: { searchResults: IProduct[] }) => {
    if (!searchResults || searchResults.length === 0) {
        return null;
    }

    return (
        <div className="absolute left-10 right-10 top-full mt-2 z-50">
            <div
                className={cn(
                    "w-full bg-white rounded-xl shadow-xl py-3"
                )}
            >
                <div className="flex flex-col space-y-2">
                    {searchResults.map((product) => (
                        <ProductSearchItem
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            imageUrl={product.imageUrl ?? "/fallback-image.jpg"}
                            basePrice={product.basePrice ?? "0.00"}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
