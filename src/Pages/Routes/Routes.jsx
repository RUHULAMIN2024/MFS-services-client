import {
    createBrowserRouter,
  } from "react-router-dom";
import MainDashboard from "../Dashboard/MainDashboard";
import Register from "../Register/Register";
import Login from "../Login/Login";
import DashboardHome from "../Dashboard/DashboardHome";
import UserProfile from "../Dashboard/UserRoutes/UserProfile";
import SendMoney from "../Dashboard/UserRoutes/SendMoney";
import CashOut from "../Dashboard/UserRoutes/CashOut";
  

const router = createBrowserRouter([
    {
      path: "/",
      element: <MainDashboard></MainDashboard>,
      children: [
        {
          path: '/',
          element: <DashboardHome></DashboardHome>,
          children: [
            {
              path: "/",
              element: <UserProfile></UserProfile>
            },
            {
              path: "/dashboard/sendmoney",
              element: <SendMoney></SendMoney>
            },
            {
              path: "/dashboard/cashout",
              element: <CashOut></CashOut>
            },

          ]
        },
      
      ]
    },
    {
      path: '/register',
      element: <Register></Register>
    },
    {
      path: '/login',
      element: <Login></Login>
    },
  ]);

  export default router;