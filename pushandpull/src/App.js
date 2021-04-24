import logo from "./logo.svg";
import "./App.css";
import LongPulling from "./components/longPolling";
import ShortPulling from "./components/shortPolling";
import BroadCast from "./components/WS_broadcast";
import PTP from "./components/WS_specific";
import Group from "./components/WS_groups";
function App() {
  return (
    <div className="App">
      <PTP />
    </div>
  );
}

export default App;
