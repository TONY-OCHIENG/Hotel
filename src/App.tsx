import { Route, Routes } from "react-router-dom"
import Navigation from "./components/Navigation"
import Home from "./pages/Home"
import Room from "./pages/Room"
import Footer from "./components/Footer"
import ScrollToTop from "./components/ScrollToTop"

function App() {
  return (
    <div className="font-serif">   
      <Navigation/>
      <Routes>
       <Route path="/" element={<Home/>}/>
       <Route path="/rooms" element={<Room/>}/>
      </Routes>
      <Footer/>
      <ScrollToTop/>
    </div>
  )
}

export default App
