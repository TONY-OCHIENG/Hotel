import React from 'react'
import DiningReservation from '../components/DiningReservation'

function Dining() {
  return (
    <div>
    <div
      style={{
        backgroundImage: `url(/images/rachel-park-hrlvr2ZlUNk-unsplash.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="relative flex h-[70vh] w-full items-center"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Text sits above the overlay */}
      <header className="relative z-10 mx-auto w-full px-5 py-16 text-amber-50 sm:py-20 md:w-[80%]">
        <div className="max-w-3xl">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-orange-300">
            Dining
          </p>
          <h1 className="mb-4 text-4xl font-extrabold">
            Good Food, Warmly Served at Mara Hotel
          </h1>
          <p className="max-w-md text-sm leading-relaxed text-amber-100/80">
            From a slow morning breakfast to a relaxed dinner and an evening
            drink, enjoy fresh local favorites and international dishes, made
            with care and served with a smile, all without leaving the hotel.
          </p>
        </div>
      </header>
    </div>
    {/* Dining reservation */}
    <DiningReservation/>
      
    </div>
  )
}

export default Dining
