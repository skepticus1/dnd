import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx"
import RegisterPage from "./pages/RegisterPage.jsx";
import HomePage from "./pages/HomePage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import LogoutPage from "./pages/LogoutPage.jsx"
import InfoPage from "./pages/InfoPage.jsx";
import CreateCharacterPage from "./pages/CreateCharacterPage.jsx"
import EditCharacterPage from "./pages/EditCharacterPage.jsx"



 
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: "register",
                element: <RegisterPage />
            },
            {
                path: "login",
                element: <LoginPage />
            },
            {
                path: "logout",
                element: <LogoutPage />
            },
            {
                path:"info",
                element: <InfoPage />
            },
            {
                path:"createCharacter",
                element: <CreateCharacterPage />
            },
            {
                path: "editCharacter/:characterId",
                element: <EditCharacterPage />
            },
        ]
    }
])

export default router; 