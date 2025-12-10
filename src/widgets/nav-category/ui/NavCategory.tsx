import {useCategory} from "@entities/category";
import {SegmentedControl} from "@shared/ui";
import {createRef} from "react";

export const NavCategory = () => {
    const {isLoading, categories} = useCategory()
    console.dir(categories)

    if (isLoading) return <>se incarca...</>

    const options = categories.map((category: { id: number | string; name: string }) => ({
        label: category.name,
        value: String(category.id),
        ref: createRef()
    }));

    return (
        <div>
            <SegmentedControl options={options} />
        </div>
    )
}