import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Register from "./Pages/Register"

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes> 
          <Route path="/" element={<Home/>}/>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/Register" element={<Register/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
