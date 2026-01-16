import './App.css'
import {Route, Routes} from "react-router";
import MainLayout from "./layout/Main/MainLayout.tsx";
import NotFoundPage from "./pages/common/NotFoundPage.tsx";
import UserHomePage from "./pages/user/UserHomePage";
import RegisterPage from "./pages/account/RegisterPage.tsx";
import LoginPage from "./pages/account/LoginPage.tsx";
// import CreateRecipePage from './pages/recipe/CreateRecipePage.tsx';
import RecipesPage from './pages/recipe/RecipesPage.tsx';

function App() {

    return (
        <>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<UserHomePage/>} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/recipes" element={<RecipesPage />} />
                </Route>

                <Route path="*" element={<NotFoundPage/>} />
            </Routes>
        </>
    )
}

export default App
