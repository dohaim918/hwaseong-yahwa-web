import { lazy } from "react"
import { Route, Routes } from "react-router-dom"
import Layout from "@/components/layout/Layout"
import ErrorBoundary from "@/components/layout/ErrorBoundary"

// ── 라우트 코드 스플릿 (초기 번들 슬림화)
//    Suspense fallback 은 Layout 안 <Outlet/> 자리에서만 그려진다
//    (Layout 자체는 항상 마운트 → CustomCursor / NavBar 안 사라짐)
const MainPage = lazy(() => import("@/pages/main/MainPage"))
const ProgramsPage = lazy(() => import("@/pages/programs/ProgramsPage"))
const NotFound = lazy(() => import("@/pages/NotFound"))
const BookingPage = lazy(() => import("@/pages/booking/BookingPage"))

export default function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/booking" element={<BookingPage />} />

          {/* 404 — NotFound 페이지 */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  )
}
