import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastMessage } from "./components/UI";
import { authRoutes, pageRoutes } from "./router";
import AppMain from "./components/Page/AppMain";
import AppData from "./components/Page/AppMain/AppData";
import AppAuth from "./components/Page/AppMain/AppAuth";
import useAuthStore from "./store/AuthStore";
import "./style/main.scss";

function App() {
  const auth = useAuthStore((state) => state.auth);

  const { isAuth } = auth;

  const renderPage = () => {
    if (!isAuth) {
      return (
        <Routes>
          {authRoutes.map((route) => (
            <Route key={route.id} path={route.path} element={route.element} />
          ))}
        </Routes>
      );
    }

    return (
      <AppMain>
        {pageRoutes.map((route) => (
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
