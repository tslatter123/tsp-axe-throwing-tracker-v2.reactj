import { Component } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import TopNavBar from "../components/TopNavbar";
import App from "../App";
import RouteTestPage from "./RouteTestPage";
import SignInPage from "./account/SignInPage";
import SignOutPage from "./account/SignOutPage";
import RegisterPage from "./account/RegisterPage";
import UserAxes from "./userAxes/AxesPage";
import UserWatlGames from "./userWatlGames/UserWatlGames";
import UserWatlGameAnalytics from "./userWatlGames/UserWatlGameAnalytics";
import ScoreUserWatlGame from "./userWatlGames/ScoreUserWatlGame";
import EvaluateUserWatlGame from "./userWatlGames/EvaluateUserWatlGame";

class MasterLayout extends Component {
    render() {
        return (
            <Router>
                <TopNavBar />
                <div className="page-container">
                    <Routes>
                        <Route path="/" element={<App />} />
                        <Route path="/route-test" element={<RouteTestPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/sign-in" element={<SignInPage />} />
                        <Route path="/sign-out" element={<SignOutPage />} />
                        <Route path="/axes" element={<UserAxes />} />
                        <Route path="/user-watl-games" element={<UserWatlGames />} />
                        <Route path="/user-watl-games/analytics" element={<UserWatlGameAnalytics />} />
                        <Route path="/user-watl-games/score-watl-game/:id" element={<ScoreUserWatlGame />} />
                        <Route path="/user-watl-games/evaluate-watl-game/:id" element={<EvaluateUserWatlGame />} />
                    </Routes>
                </div>
            </Router>
        )
    }
}

export default MasterLayout;