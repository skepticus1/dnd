import {createBrowserRouter} from "react-router-dom"
import App from "./App.jsx"


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
                path: "signup",
                element: <SignUpPage />
            },
            {
                path: "login",
                element: <LoginPage />
            }
        ]
    }
])