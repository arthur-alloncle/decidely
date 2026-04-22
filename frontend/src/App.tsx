import { Route, Routes } from "react-router-dom"
import Login from "./Pages/Login/Login"
import 'primeflex/primeflex.css'; // flex
import 'primereact/resources/primereact.min.css'; //core css
import 'primereact/resources/themes/md-light-deeppurple/theme.css'; //theme
import 'primeicons/primeicons.css';
// import 'primereact/resources/themes/lara-light-indigo/theme.css'; //theme

import DecisionsDashboard from "./Pages/Decisions/Decisions";
import Signup from "./Pages/Signup/Signup";
export function App() {
  return (
    <>
      <Routes>
        <Route element={<Login />} path="/login" />
        <Route element={<DecisionsDashboard />} path="/decisions" />
        <Route element={<Signup />} path="/signup" />
      </Routes>
    </>
  )
}

export default App