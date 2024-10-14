import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import ProductDetails from "../components/ProductDetails";
import AllProducts from "../pages/AllProducts";
import Dashboard from "../pages/Dashboard";
import ProductTable from "../components/ProductTable";
import AddProduct from "../components/AddProduct";
import Cart from "../pages/Cart";
import OrderSummary from "../pages/OrderSummary";
import Success from "../pages/Success";
import SaveForLater from "../pages/saveForLater/SaveForLater";


const routes = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/:id',
        element: <ProductDetails />
    },
    {
        path: '/allProducts',
        element: <AllProducts />
    },
    {
        path: '/dashboard',
        element: <Dashboard />,
        children: [
            {
                path: '/dashboard',
                element: <ProductTable />,
            },
            {
                path: 'addProduct',
                element: <AddProduct />,
            }
        ]
    },
    {
        path: '/cart',
        element: <Cart />
    },
    {
        path: '/order',
        element: <OrderSummary />
    },
    {
        path: '/success',
        element: <Success />
    },
    {
        path: '/save-for-later',
        element: <SaveForLater />
    },
])

export default routes