import { Menu, X } from "lucide-react"
import { useState } from "react"
import { NavLink } from "react-router-dom"

const navigationLinks = [
  { name: "Home", href: "/" },
  { name: "Rooms", href: "/rooms" },
  { name: "Confrence Room", href: "/confrence" },
  { name: "Dining", href: "/dining" },
  { name: "Gallery", href: "/gallery" },
  { name: "Amenities", href: "/amenities" },
  { name: "Contact", href: "/contact" },
]

const linkClass = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? "my-active-class"
    : "hover:border-b-amber-100 hover:border-b hover:text-amber-500"

function Brand() {
  return (
    <div className="flex items-center gap-2">
      <img
        src="/Mara Hotel Logo@1x.png"
        className="h-10 w-10 shrink-0 rounded-full sm:h-14 sm:w-14"
        alt="Mara Hotel logo"
      />
      <div className="flex flex-col">
        <h1 className="text-xl font-extrabold text-white sm:text-2xl">Mara</h1>
        <p className="text-xs text-gray-300">Hotel</p>
      </div>
    </div>
  )
}

function Navigation() {
  const [openNavigation, setopenNavigation] = useState<boolean>(false)

  return (
    <div className="fixed z-50 flex h-[10vh] min-h-16 w-full items-center bg-[#4d1600]">
      <div className="mx-auto flex w-full items-center justify-between px-4 lg:w-[92%] lg:px-2 xl:w-[80%]">
        <Brand />

        {/* Desktop navigation */}
        <div className="hidden lg:block">
          <ul className="flex cursor-pointer gap-4 text-sm font-extrabold whitespace-nowrap text-white xl:gap-6">
            {navigationLinks.map((item) => (
              <li key={item.href}>
                <NavLink className={linkClass} to={item.href}>
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <button className="hidden cursor-pointer rounded-full bg-white px-6 py-2 whitespace-nowrap text-amber-950 lg:block xl:px-8">
          Book Now
        </button>

        <button
          type="button"
          onClick={() => setopenNavigation(!openNavigation)}
          aria-label={openNavigation ? "Close menu" : "Open menu"}
          aria-expanded={openNavigation}
          className="relative z-10 text-amber-50 transition-all duration-300 lg:hidden"
        >
          {openNavigation ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile and tablet navigation */}
      <div
        onClick={() => setopenNavigation(false)}
        aria-hidden="true"
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 lg:hidden ${
          openNavigation ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        aria-hidden={!openNavigation}
        className={`fixed top-0 left-0 h-dvh w-[75%] max-w-xs overflow-y-auto bg-[#4d1600] p-4 transition-all duration-300 lg:hidden ${
          openNavigation ? "translate-x-0" : "invisible -translate-x-full"
        }`}
      >
        <Brand />

        <ul className="mt-12 ml-4 cursor-pointer text-sm font-extrabold text-white">
          {navigationLinks.map((item) => (
            <li className="mb-8" key={item.href}>
              <NavLink
                className={linkClass}
                to={item.href}
                onClick={() => setopenNavigation(false)}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Navigation
