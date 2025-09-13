import { HashRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "@/pages/Home";
import { NotFoundPage } from "@/pages/NotFound";
import { ZoneDetailPage } from "@/pages/ZoneDetail";
import { RealtimeButton } from "@/shared/ui/RealtimeButton";
import { useRealtimeWS } from "@/shared/api/websocketClient/lib/useRealtimeWS";

function App() {
  const { active, setActive } = useRealtimeWS();
  return (
    <HashRouter>
      <div className="app-container">
        <main className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/zone/:zoneId" element={<ZoneDetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <RealtimeButton isActive={active} setActive={setActive} />
        </main>
      </div>
    </HashRouter>
  );
}

export default App;
