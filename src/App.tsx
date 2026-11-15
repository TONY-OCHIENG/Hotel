import { Route, Routes } from "react-router-dom"
import Navigation from "./components/Navigation"
import Home from "./pages/Home"
import Room from "./pages/Room"

function App() {
  return (
    <div className="font-serif">   
      <Navigation/>
      <Routes>
       <Route path="/" element={<Home/>}/>
       <Route path="/rooms" element={<Room/>}/>
      </Routes>
    </div>
  )
}

export default App
