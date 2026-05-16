import { Route, Routes } from "react-router-dom"
import Layout from "@/components/layout/Layout"
import MainPage from "@/pages/main/MainPage"
import ProgramsPage from "@/pages/programs/ProgramsPage"
// import BookingPage from '@/pages/booking/BookingPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/programs" element={<ProgramsPage />} />
        {/* 예약 페이지 */}
        {/* <Route path="/booking"    element={<BookingPage />} /> */}

        {/* 404 — 메인으로 리다이렉트 */}
        <Route path="*" element={<MainPage />} />
      </Route>
    </Routes>
  )
}
