import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from "./Layout/Home.jsx";
import Navbar from "./Component/Navbar.jsx";
import Banner from "./Component/Banner.jsx";
import HomeAi from "./Component/HomeAi.jsx";
import AboutAi from "./Component/AboutAi.jsx";
import Register from "./Component/Register.jsx";
import Footer from "./Component/Footer.jsx";
import Login from "./Layout/Login.jsx";
import Modals from "./Layout/Modals.jsx";
import CreateModal from "./Layout/CreateModal.jsx";
import MyPurchase from "./Layout/MyPurchase.jsx";
import Roots from "./Component/Roots.jsx";
import AegAuth from "./Layout/AegAuth.jsx";
import AuthProvider from "./Auth/AuthProvider.jsx";
import PrivateRoutes from "./Auth/PrivateRoutes.jsx";
import Details from "./Layout/Details.jsx";
import MyModals from "./Layout/MyModals.jsx";
import UpdateModel from "./Component/UpdateModel.jsx";
import Error from "./Layout/Error.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Roots,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "*",
        Component: Error,
      },
      {
        path: "/",
        Component: Navbar,
      },
      {
        path: "/",
        Component: Banner,
      },
      {
        path: "/",
        Component: HomeAi,
      },
      {
        path: "/",
        Component: AboutAi,
      },
      {
        path: "/",
        Component: Register,
      },
      {
        path: "/",
        Component: Footer,
      },
      {
        path: "/models",
        element: (
          <PrivateRoutes>
            <Modals></Modals>
          </PrivateRoutes>
        ),
      },
      {
        path: "/add-model",
        element: (
          <PrivateRoutes>
            <CreateModal></CreateModal>
          </PrivateRoutes>
        ),
      },
      {
        path: "/purchase",
        element: (
          <PrivateRoutes>
            <MyPurchase></MyPurchase>
          </PrivateRoutes>
        ),
      },
      {
        path: "/details/:id",
        loader: async ({ params }) => {
          const response = await fetch(
            `http://localhost:5000/models/${params.id}`
          );
          if (!response.ok) throw new Error("Error fetching data");
          return response.json();
        },
        element: (
          <PrivateRoutes>
            <Details></Details>
          </PrivateRoutes>
        ),
      },
      {
        path: "/mymodals",
        element: (
          <PrivateRoutes>
            <MyModals></MyModals>
          </PrivateRoutes>
        ),
      },
      {
        path: "/updataModal",
        element: (
          <PrivateRoutes>
            <UpdateModel></UpdateModel>
          </PrivateRoutes>
        ),
      },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: AegAuth,
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />,
    </AuthProvider>
  </StrictMode>
);
