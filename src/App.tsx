import { Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ToastMessage } from "./components/UI";
import { authRoutes, pageRoutes } from "./router";
import AppMain from "./components/Page/AppMain";
import AppData from "./components/Page/AppMain/AppData";
import AppAuth from "./components/Page/AppMain/AppAuth";
import ProtectedRoute from "./components/Page/ProtectedRoute";
import "./style/main.scss";

function App() {
  return (
    <Fragment>
      <AppData>
        <Router>
          <AppAuth>
            <AppMain>
              {authRoutes.map((route) => (
                <Route key={route.id} path={route.path} element={route.element} />
              ))}
              {pageRoutes.map((route) => (
                <Route
                  key={route.id}
                  path={route.path}
                  element={<ProtectedRoute>{route.element}</ProtectedRoute>}
                />
              ))}
            </AppMain>
          </AppAuth>
        </Router>
      </AppData>
      <ToastMessage />
    </Fragment>
  );
}

export default App;
