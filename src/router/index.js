import { createWebHashHistory, createRouter } from "vue-router";
import MainPage from "../components/MainPage";
import MovieDetail from "../components/MovieDetail";
import SeatPage from "../components/SeatPage";
import UserIndo from "../components/UserIndo"



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
        path: "/seatpage",
        name: "SeatPage",
        component: SeatPage
    }
    , 
    {
        path: "/userinfo",
        name: "UserIndo",
        component: UserIndo
    }

];
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router;