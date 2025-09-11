import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "@/pages/Home";
import { ZoneDetailPage } from "@/pages/ZoneDetail";
import { NotFoundPage } from "@/pages/NotFound";
import { RealtimeButton } from "@/shared/ui/RealtimeButton";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <main className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/zone/:zoneId" element={<ZoneDetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <RealtimeButton />
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
