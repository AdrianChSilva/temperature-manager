import { ZonesBoard } from "@/widgets/ZonesBoard";
import { RealtimeButton } from "../shared/ui/RealtimeButton";
function App() {
  return (
    <>
      <div className="app-container">
        <main className="container">
          <ZonesBoard />
          <RealtimeButton />
        </main>
      </div>
    </>
  );
}

export default App;
