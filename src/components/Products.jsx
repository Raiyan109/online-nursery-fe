import { useGetProductQuery } from "@/redux/features/productApi";
import InViewAnimation from "./InViewAnimation"
import InViewRight from "./InViewRight";
import Product from "./Product";
import Loading from "./Loading";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";

const Products = () => {
    const { data, isLoading } = useGetProductQuery(undefined)
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage] = useState(5)


    let filters = ["Outdoor plants", "Blooms", "Orchids", "House plants", "Pet friendly plants", "Decorating plant"];



    const handleFilterButtonClick = (selectedCategory) => {
        if (selectedFilters.includes(selectedCategory)) {
            let filters = selectedFilters.filter((el) => el !== selectedCategory);
            setSelectedFilters(filters);
        } else {
            setSelectedFilters([...selectedFilters, selectedCategory]);
        }
    };

    useEffect(() => {
        filterItems();
    }, [selectedFilters, data]);

    const filterItems = () => {
        if (selectedFilters.length > 0) {
            let tempItems = data?.data?.filter((item) =>
                item.category.some((cat) => selectedFilters.includes(cat))
            );
            setFilteredItems(tempItems);
        } else {
            setFilteredItems(data?.data || []);
        }
    };

    const lastPostIndex = currentPage * postPerPage
    const firstPostIndex = lastPostIndex - postPerPage
    const currentResults = filteredItems.slice(firstPostIndex, lastPostIndex);

    if (isLoading) {
        return <div>
            <Loading />
        </div>
    }

    return (
        <div className="py-32" id="products">
            <InViewAnimation>
                <h1 className="text-6xl text-white font-bold pb-10 lg:px-28 px-0 text-center lg:text-left">Plants</h1>
            </InViewAnimation>
            {/* Filter buttons */}
            <div className="buttons-container">
                {filters.map((category, idx) => (
                    <button
                        onClick={() => handleFilterButtonClick(category)}
                        className={`button ${selectedFilters?.includes(category) ? "active" : ""
                            }`}
                        key={`filters-${idx}`}
                    >
                        {category}
                    </button>
                ))}
            </div>
            <InViewRight>
                <div className="py-10 flex justify-center items-center">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-14">
                        {/* data?.data?.slice(0, 5) */}
                        {currentResults?.map((item) => (
                            <Product key={item?._id} item={item} />
                        ))}
                    </div>

                </div>
            </InViewRight>
            <Pagination totalPosts={data?.data?.length} postsPerPage={postPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
    )
}

export default Products