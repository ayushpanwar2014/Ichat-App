import { Route, Routes } from "react-router-dom";
import HomePage from "./page/HomePage";
import Chatpage from "./page/Chatpage";


function App() {


  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/chats" element={<Chatpage/>}/>
      </Routes>
    </div>
  );
}

export default App;
