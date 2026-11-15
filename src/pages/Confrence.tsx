
function Confrence() {
  return (
    <div>   
     <div
      style={{
        backgroundImage: `url(/images/hall.jpeg)`,
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
            Conferences and Events
          </p>
          <h1 className="mb-4 text-4xl font-extrabold">
            Meetings and Events Made Easy at Mara Hotel
          </h1>
          <p className="max-w-md text-sm leading-relaxed text-amber-100/80">
            From board meetings and trainings to weddings and large
            celebrations, our conference spaces come with reliable equipment,
            catering, and a dedicated team that takes care of the details, so
            you can focus on your guests.
          </p>
        </div>
      </header>
    </div>   
    </div>
  )
}

export default Confrence
