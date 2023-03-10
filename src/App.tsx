import { BrowserRouter, Routes as Switch, Route } from "react-router-dom";
import loadable from "@loadable/component";
import { StartScreen} from "./pages";

const Explore = loadable(() => import("./pages/Explore"));


export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" element={<StartScreen />} />
        <Route path="/pokemons/:name" element={<Explore />} />

      </Switch>
    </BrowserRouter>
  );
}
