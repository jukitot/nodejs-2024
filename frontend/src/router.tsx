import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import PizzasPage from "./Pages/PizzasPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";

const router = createBrowserRouter([
  {
    path:'',element:<MainLayout/>,children:[
      {index:true, element:<Navigate to={'login'}/>},
      {path:'pizzas', element:<PizzasPage/>},
      {path:'login', element:<LoginPage/>},
      {path:'register', element:<RegisterPage/>}
    ]
  }
]);
export{
  router
}