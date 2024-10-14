import { useDispatch, useSelector } from "react-redux"
import { Link, Navigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import InViewAnimation from "../../components/InViewAnimation";
import { IoBagHandleOutline } from "react-icons/io5";
import InViewRight from "../../components/InViewRight";
import { removeSavedItem } from "../../redux/features/saveForLater/saveForLater";



const SaveForLater = () => {

    const dispatch = useDispatch();
    const savedItems = useSelector((state) => state.saveForLater.savedItems)
    if (!savedItems) {
        return <Navigate to='/' />
    }

    const handleRemoveSavedItem = (wishList) => {
        dispatch(removeSavedItem(wishList));
    }

    return (
        <div>
            <Navbar />
            {savedItems.length === 0 ? (
                <InViewAnimation>
                    <div className="py-32 flex flex-col items-center justify-center gap-5">
                        <IoBagHandleOutline size={70} className="text-lightGreen" />
                        <h1 className="text-6xl text-white font-bold lg:px-28 px-0 text-center lg:text-left">Your saved items is empty</h1>
                        <h3 className="text-md text-white/60 lg:px-28 px-0 text-center lg:text-left">Please add more plants inside</h3>
                        <Link to='/allProducts'>
                            <button className="btn-green-rounded text-xl py-3 px-5 rounded-full">Start Shopping</button>
                        </Link>
                    </div>
                </InViewAnimation>
            ) : (
                <div className="py-32">
                    <InViewAnimation>
                        <h1 className="text-6xl text-white font-bold pb-10 lg:px-28 px-0 text-center lg:text-left">Saved Items ({savedItems.length})</h1>
                    </InViewAnimation>
                    <InViewRight>
                        <section
                            className="">
                            {/* after:contents-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3 after:top-0 after:right-0 after:bg-gray-50 */}
                            <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto relative z-10">
                                {/* grid grid-cols-12 */}
                                <div className="flex flex-col xl:flex-row">
                                    <div className="col-span-12 xl:col-span-8 lg:pr-8 pt-14 pb-8 lg:py-24 w-full max-xl:max-w-3xl max-xl:mx-auto">
                                        {/* Cart items header */}
                                        <div className="grid grid-cols-12 mt-8 max-md:hidden pb-6 border-b border-paste">
                                            <div className="col-span-12 md:col-span-7">
                                                <p className="font-normal text-lg leading-8 text-paste">Product Details</p>
                                            </div>

                                        </div>

                                        {/* Cart Items */}
                                        {savedItems?.map((cartItem) => (
                                            <div
                                                key={cartItem?._id}
                                                className="flex flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6  border-b border-paste group">
                                                <div className="w-full md:max-w-[126px]">
                                                    <img src={cartItem?.image} alt="perfume bottle image"
                                                        className="mx-auto" />
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-4 w-full">
                                                    <div className="md:col-span-2">
                                                        <div className="flex flex-col max-[500px]:items-center gap-3">
                                                            <h6 className="font-semibold text-base leading-7 text-white">{cartItem?.title}</h6>
                                                            <h6 className="font-normal text-sm leading-7 text-white/80">{cartItem?.category}</h6>
                                                            <h6 className="font-medium text-base leading-7 text-lightGreen transition-all duration-300 group-hover:text-lightGreen/80">${cartItem?.price}</h6>
                                                            <button className="btn-green-rounded bg-red hover:bg-red/80 w-20 text-xs"
                                                                onClick={() => handleRemoveSavedItem(cartItem)}
                                                            >Remove</button>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        ))}
                                    </div>


                                </div>
                            </div>
                        </section>

                    </InViewRight>
                </div>
            )}
            <Footer />
        </div>
    )
}

export default SaveForLater