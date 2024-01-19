import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./Components/ProtectedRoute";
import { useState } from "react";
import {useSelector} from 'react-redux'
import Loader from './Components/Loader'
function App() {
  const {loader} = useSelector(state=>state.loaderReducer)
  return (
    <div>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      {loader && <Loader />}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
