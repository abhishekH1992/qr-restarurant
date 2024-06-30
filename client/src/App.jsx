import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import SuccessPage from "./pages/SuccessPage";
import { Toaster } from "react-hot-toast"
import ViewCartBtn from "./components/ui/ViewCartBtn";
import Header from "./components/Header";

export default function App() {
    return (
        <>
            <div id="content">
                <Header />
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/cart' element={<CartPage />} />
                    <Route path='/checkout' element={<CheckoutPage />} />
                    <Route path='/success/:order_id' element={<SuccessPage />} />
                    <Route path='/:categorySlug' element={<CategoryPage />} />
                </Routes>
            </div>
            <ViewCartBtn />
            <Toaster />
        </>
    )
}