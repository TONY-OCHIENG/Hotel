import { Route, Routes } from "react-router-dom"
import Navigation from "./components/Navigation"
import Home from "./pages/Home"
import Room from "./pages/Room"
import Footer from "./components/Footer"
import ScrollToTop from "./components/ScrollToTop"
import Confrence from "./pages/Confrence"
import Dining from "./pages/Dining"
import Gallery from "./pages/Gallery"
import ContactPage from "./components/ContactPage"

function App() {
  return (
    <div className="font-serif">   
      <Navigation/>
      <Routes>
       <Route path="/" element={<Home/>}/>
       <Route path="/rooms" element={<Room/>}/>
       <Route path="/confrence" element={<Confrence/>}/>
       <Route path="/dining" element={<Dining/>}/>
       <Route path="/gallery" element={<Gallery/>}/>
       <Route path="/contact" element={<ContactPage/>}/>
      </Routes>
      <Footer/>
      <ScrollToTop/>
    </div>
  )
}

export default App
