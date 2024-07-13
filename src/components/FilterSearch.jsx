/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTrigger,
} from "@/components/ui/drawer"

import { Label } from "./ui/label";
import { Slider } from "@/components/ui/slider"



const FilterSearch = ({
    searchText,
    handleChange,
    minPrice,
    maxPrice,
    handlePriceChange,
    sortByName,
    sorted,
    renderArrow
}) => {

    return (

        <div className="p-4 text-gray-600 dark:text-gray-300 outline-none focus:outline-none mr-12">
            <div className="relative flex">

                <Drawer>
                    <DrawerTrigger asChild>
                        <Button variant="outline" className="btn-green-rounded rounded-s-2xl">Filter</Button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <div className="mx-auto w-full max-w-2xl">
                            <DrawerHeader>
                                <div className=" py-4">
                                    <div className="flex justify-between items-center gap-10">
                                        <div className="flex-1">
                                            <Label htmlFor="title" className="text-right text-2xl">
                                                Filter by price
                                            </Label>
                                        </div>
                                        <div className="flex-1">
                                            <Slider defaultValue={[minPrice, maxPrice]} max={1000} step={1} onValueChange={handlePriceChange} />
                                        </div>
                                    </div>
                                </div>

                            </DrawerHeader>


                        </div>
                    </DrawerContent>
                </Drawer>
                <input
                    type="search"
                    name="search"
                    value={searchText}
                    onChange={handleChange}
                    placeholder="Search"
                    className="bg-white dark:bg-gray-800 h-10 flex px-5 w-full rounded-r-full text-sm focus:outline-none border-2 border-l-0 border-gray-500 dark:border-gray-600"
                />
                <div >
                    <Button variant="outline" onClick={sortByName} className='gap-3'>Sort by name
                        {sorted.sorted === "title" ? renderArrow() : null}
                    </Button>

                </div>
            </div>
        </div>

    )
}

export default FilterSearch