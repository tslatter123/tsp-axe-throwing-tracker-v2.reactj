import { Component } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import TopNavBar from "../components/TopNavbar";
import App from "../App";
import RouteTestPage from "./RouteTestPage";
import SignInPage from "./account/SignInPage";
import SignOutPage from "./account/SignOutPage";
import RegisterPage from "./account/RegisterPage";
import UserAxes from "./userAxes/AxesPage";

class MasterLayout extends Component {
    render() {
        return (
            <Router>
                <TopNavBar />
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/route-test" element={<RouteTestPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/sign-in" element={<SignInPage />} />
                    <Route path="/sign-out" element={<SignOutPage />} />
                    <Route path="/axes" element={<UserAxes />} />
                </Routes>
            </Router>
        )
    }
}

export default MasterLayout;