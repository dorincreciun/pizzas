import { cn } from "@shared/lib/cn";
import { ProductSearchItem } from "@entities/product";

export const SearchResult = () => {
    return (
        <>
            {/* Overlay */}
            <div
                className={cn(
                    "fixed inset-0 z-40",
                    "bg-black/60",
                    "will-change-[opacity,filter]",
                    "[animation:fade-blur-in_.45s_cubic-bezier(0.16,1,0.3,1)_both]"
                )}
            />

            {/* Results panel */}
            <div
                className={cn(
                    "relative z-50",
                    "w-full bg-white rounded-xl shadow-xl py-3"
                )}
            >
                <div className="flex flex-col space-y-2">
                    <ProductSearchItem
                        id={1}
                        name="Test Product"
                        imageUrl={"/fallback-image.jpg"}
                        basePrice={500}
                    />
                    <ProductSearchItem
                        id={2}
                        name="Test Product"
                        imageUrl={"/fallback-image.jpg"}
                        basePrice={500}
                    />
                    <ProductSearchItem
                        id={3}
                        name="Test Product"
                        imageUrl={"/fallback-image.jpg"}
                        basePrice={500}
                    />
                </div>
            </div>
        </>
    );
};
