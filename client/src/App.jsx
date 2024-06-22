import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import { Toaster } from "react-hot-toast"

export default function App() {
    return (
        <>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/cart' element={<CartPage />} />
                <Route path='/:categorySlug' element={<CategoryPage />} />
            </Routes>
            <Toaster />
        </>
    )
}