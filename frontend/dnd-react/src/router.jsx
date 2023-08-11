import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx"
import RegisterPage from "./pages/RegisterPage.jsx";
import HomePage from "./pages/HomePage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import LogoutPage from "./pages/LogoutPage.jsx"
import InfoPage from "./pages/InfoPage.jsx";
import CreateCharacterPage from "./pages/CreateCharacterPage.jsx"
import { UserProvider } from "./context/UserContext.jsx";



 
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
            }
            
        ]
    }
])

export default router; 

// export default function AppRouter() {
//     return (
//         <UserProvider>
//             <Router>
//                 <Routes>
//                     <Route path='/' element={<App />}>
//                         <Route index element={<HomePage />} />
//                         <Route path="register" element={<RegisterPage />} />
//                         <Route path="login" element={<LoginPage />} />
//                         <Route path="logout" element={<LogoutPage />} />
//                         <Route path="info" element={<InfoPage />} />
//                     </Route>
//                 </Routes>
//             </Router>
//         </UserProvider>
//     )
// }