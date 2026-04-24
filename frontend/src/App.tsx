import { Route, Routes } from "react-router-dom"
import Login from "./Pages/Login/Login"
import 'primeflex/primeflex.css'; // flex
import 'primereact/resources/primereact.min.css'; //core css
import 'primereact/resources/themes/md-light-deeppurple/theme.css'; //theme
import 'primeicons/primeicons.css';
// import 'primereact/resources/themes/lara-light-indigo/theme.css'; //theme

import DecisionsDashboard from "./Pages/Decisions/Decisions";
import Signup from "./Pages/Signup/Signup";
const wrapperStyle = {
    minHeight: "100vh",
    backgroundColor: "#0B0B0B",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Geist', 'DM Sans', sans-serif",
    width: '100%'
}

export function App() {
  return (
    <div style={wrapperStyle}>
      <Routes>
        <Route element={<Login />} path="/login" />
        <Route element={<DecisionsDashboard />} path="/decisions" />
        <Route element={<Signup />} path="/signup" />
      </Routes>
    </div>
  )
}

export default App