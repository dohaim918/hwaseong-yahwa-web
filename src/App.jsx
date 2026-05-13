import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/main/MainPage";
import ProgramsPage from "./pages/programs/ProgramsPage";


export default function App() {

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/programs" element={<ProgramsPage />} />
    </Routes>
  )
}
