import { Route } from "react-router-dom";
import AppWrapper from "./components/Page/AppWrapper";
import routes from "./router";
import "./style/main.scss";

function App() {
  return (
    <AppWrapper>
      {routes.map((route) => (
        <Route key={route.id} path={route.path} element={route.element} />
      ))}
    </AppWrapper>
  );
}

export default App;
