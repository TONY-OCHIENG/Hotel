import { Menu, X } from "lucide-react"
import { useState } from "react"
import { NavLink } from "react-router-dom"

function Navigation() {
   const [openNavigation, setopenNavigation] = useState<Boolean>(false)
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
    <div className="fixed w-full h-[10vh] bg-[#4d1600] flex items-center">  
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
         <div onClick={() => setopenNavigation(!openNavigation)} className="transition-all duration-300">
            {
               openNavigation ? <X className="md:hidden text-amber-50 text-xl"/> :
               <Menu className="md:hidden text-amber-50 text-xl"/>
            }
          
         </div>
     </div>  
       {/* Mobile responsive navigation bar */}
       <div className={`absolute fixed h-[100vh] md:hidden transition-all duration-300 inset-0 bg-[#4d1600] w-[70%] ${openNavigation ? 'left-[0px] ' : 'left-[-100%]'} p-4`}>
        <div className="flex gap-2 items-center">
         <img src="public/Mara Hotel Logo@1x.png" className="h-15 rounded-full w-15" alt="" />
         <div className="flex flex-col">
            <h1 className="text-2xl font-extrabold text-white">Mara</h1>
            <p className="text-white text-gray-300 text-xs">Hotel</p>
         </div>        
        </div>
         <ul className="ml-4 mt-20 cursor-pointer text-white text-sm font-extrabold">
              {
               navigationLinks.map((item) => (
                  <li className="mb-8">
                     <NavLink 
                     
                     className={({isActive }) => (isActive ? "my-active-class" : "hover:border-b-amber-100 hover:border-b hover:text-amber-500")}
                      to={item.href}>{item.name}</NavLink>
                  </li>
               ))
              }
            </ul>
            
       </div>
    </div>
  )
}

export default Navigation
