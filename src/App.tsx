import AppContainer from "./components/Page/AppContainer";
import { Route } from "react-router-dom";
import routes from "./router";
import "./style/main.scss";

function App() {
  return (
    <AppContainer>
      {routes.map((route) => (
        <Route key={route.id} path={route.path} element={route.element} />
      ))}
    </AppContainer>
  );
}

export default App;
