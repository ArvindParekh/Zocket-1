import "./App.css";
import CanvasComponent from "./app/canvasComponent";
import InputComponent from "./app/createAd";


function App() {
  return <main className="w-[100vw] h-[100vh] flex items-center justify-center border">
    <CanvasComponent />
    <InputComponent />
  </main>;
}

export default App;
