import Amenities from '../components/Amenities'

function AmenitiesPage() {
  return (
    <div>
         <div
      style={{
        backgroundImage: `url(/images/antonio-araujo-mo7VksgvBrY-unsplash.jpg)`,
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
            Amenities
          </p>
          <h1 className="mb-4 text-4xl font-extrabold">
            Everything You Need for a Comfortable Stay
          </h1>
          <p className="max-w-md text-sm leading-relaxed text-amber-100/80">
            From free Wi-Fi and secure parking to a welcoming restaurant and
            round-the-clock reception, Mara Hotel is set up so you can relax,
            work, and enjoy your stay with ease.
          </p>
        </div>
      </header>
    </div>
    <Amenities/>
    </div>
  )
}

export default AmenitiesPage
