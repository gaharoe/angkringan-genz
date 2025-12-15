import {Routes, Route} from "react-router-dom"
import Menu from "./pages/Menu"
import PilihMeja from "./pages/PilihMeja"
import Status from "./pages/Status"
import "./App.css"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PilihMeja />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/status" element={<Status />} />
    </Routes>
  )
}