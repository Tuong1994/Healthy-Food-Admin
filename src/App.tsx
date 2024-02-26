import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastMessage } from "./components/UI";
import { routerPaths } from "./common/constant/url";
import AppMain from "./components/Page/AppMain";
import AppData from "./components/Page/AppMain/AppData";
import AppAuth from "./components/Page/AppMain/AppAuth";
import Auth from "./pages/auth";
import useAuthStore from "./store/AuthStore";
import routes from "./router";
import "./style/main.scss";

const { AUTH } = routerPaths;

function App() {
  const auth = useAuthStore((state) => state.auth);

  const { isAuth } = auth;

  const renderPage = () => {
    if (!isAuth) {
      return (
        <Routes>
          <Route path={AUTH} element={<Auth />} />
        </Routes>
      );
    }

    return (
      <AppMain>
        {routes.map((route) => (
          <Route key={route.id} path={route.path} element={route.element} />
        ))}
      </AppMain>
    );
  };

  return (
    <Fragment>
      <AppData>
        <Router>
          <AppAuth>{renderPage()}</AppAuth>
        </Router>
      </AppData>
      <ToastMessage />
    </Fragment>
  );
}

export default App;
