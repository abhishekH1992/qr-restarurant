import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import { Toaster } from "react-hot-toast"
import ViewCartBtn from "./components/ui/ViewCartBtn";

export default function App() {
    return (
        <>
            <div id="content">
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/cart' element={<CartPage />} />
                    <Route path='/:categorySlug' element={<CategoryPage />} />
                </Routes>
            </div>
            <ViewCartBtn />
            <Toaster />
        </>
    )
}