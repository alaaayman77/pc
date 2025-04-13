// App.jsx
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Home from "./Components/Home/Home";
import Builder from "./Components/Builder/Builder";
import Guides from "./Components/Guides/Guides";
import Community from "./Components/Community/Community";
import BrowseComponents from "./Components/BrowseComponents/BrowseComponents";
import Layout from "./Components/Layout/Layout";
import NotFound from "./Components/NotFound/NotFound";
import Profile from "./Components/Profile/Profile";
import Login from "./Components/Login/login";
import Signup from "./Components/Signup/Signup";
import AIAssistant from "./Components/AIAssistant/AIAssistant";
import { SavedComponentsProvider } from "./Context/SavedComponentContext"; // Import the provider

let x = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "builder", element: <Builder /> },
      { path: "guides", element: <Guides /> },
      { path: "community", element: <Community /> },
      {
        path: "browsecomponents",
        children: [
          { index: true, element: <Navigate to="all" replace /> },
          { path: ":type", element: <BrowseComponents /> },
        ],
      },
      { path: "profile", element: <Profile /> },
      { path: "ai_assistant", element: <AIAssistant /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  { path: "login", element: <Login /> },
  { path: "signup", element: <Signup /> },
]);

function App() {
  return (
    <>
      <div>
        <SavedComponentsProvider>
          <RouterProvider router={x}></RouterProvider>
        </SavedComponentsProvider>
      </div>
    </>
  );
}

export default App;
