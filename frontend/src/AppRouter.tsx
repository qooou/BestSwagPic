import { BrowserRouter, Route, Routes } from "react-router-dom";
import NoMatch from "./pages/NoMatch.tsx";
import StatsPage from "./pages/StatsPage.tsx";
import ChoicePage from "./pages/ChoicePage.tsx";

function AppRouter(){
  return <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route index element={<ChoicePage />}/>
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/*" element={<NoMatch />} />
      </Route>
    </Routes>
  </BrowserRouter>
}

export default AppRouter;