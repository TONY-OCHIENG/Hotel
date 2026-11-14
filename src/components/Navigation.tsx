import { Menu } from "lucide-react"
import { NavLink } from "react-router-dom"

function Navigation() {
   const navigationLinks = [
      {name: "Home",href: "/home"},
      {name: "Rooms",href: "/rooms"},
      {name: "Confrence Room",href: "/confrence"},
      {name: "Dining",href: "/dining"},
      {name: "Gallery",href: "/gallery"},
      {name: "Amenities",href: "/amenities"},
      {name: "Contact",href: "/contact"},
   ]
  return (
    <div className="w-full h-[10vh] bg-[#4d1600] flex items-center">  
     <div className="w-full px-2 md:w-[80%] mx-auto flex items-center justify-between">
      <div className="flex gap-2 items-center">
         <img src="public/Mara Hotel Logo@1x.png" className="h-15 rounded-full w-15" alt="" />
         <div className="flex flex-col">
            <h1 className="text-2xl font-extrabold text-white">Mara</h1>
            <p className="text-white text-gray-300 text-xs">Hotel</p>
         </div>        
      </div>
       <div className="hidden md:block">
            <ul className="flex gap-6 cursor-pointer text-white text-sm font-extrabold">
              {
               navigationLinks.map((item) => (
                  <li className="">
                     <NavLink 
                     
                     className={({isActive }) => (isActive ? "my-active-class" : "hover:border-b-amber-100 hover:border-b hover:text-amber-500")}
                      to={item.href}>{item.name}</NavLink>
                  </li>
               ))
              }
            </ul>
            
         </div>
         <button className="hidden md:block py-2 px-8 bg-white rounded-full text-amber-950 cursor-pointer">Book Now</button>
         <Menu className="md:hidden text-amber-50 text-xl"/>
     </div>    
    </div>
  )
}

export default Navigation
