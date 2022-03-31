import { createWebHashHistory, createRouter } from "vue-router";
import MainPage from "../components/MainPage";
import MovieDetail from "../components/MovieDetail";
import SeatPage from "../components/SeatPage";
import UserInfo from "../components/UserInfo"
import OrderList from "../components/OrderList"
import OrderDetail from "../components/OrderDetail"



const routes = [
    {
        path: "/",
        name: "MainPage",
        component: MainPage
    }, 
    {
        path: "/moviedetail",
        name: "MovieDetail",
        component: MovieDetail
    }, 
    {
        path: "/seats",
        name: "SeatPage",
        component: SeatPage
    }, 
    {
        path: "/userinfo",
        name: "UserInfo",
        component: UserInfo
    }, 
    {
        /// need to include a dynamic param id
        path: "/userinfo/1/orders",
        name: "OrderList",
        component: OrderList
    },
    {
        /// need to include a dynamic param id
        path: "/userinfo/1/orders/1",
        name: "OrderDetail",
        component: OrderDetail
    }

];
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router;