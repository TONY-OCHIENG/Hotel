function Room() {
  return (
    <div
      style={{
        backgroundImage: `url(/images/point3d-commercial-imaging-ltd-oxeCZrodz78-unsplash.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="relative flex h-[70vh] w-full items-center"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Text sits above the overlay */}
      <header className="relative z-10 w-full px-5 py-16 text-center text-amber-50 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-orange-300">
            Rooms and Suites
          </p>
          <h1 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            Find the Perfect Room for Your Stay
          </h1>
          <p className="mx-auto max-w-2xl leading-relaxed text-amber-100/80">
            Every room at Mara Hotel is designed for rest, with comfortable
            bedding, clean interiors, and friendly service. Choose the space
            that suits your trip, whether you're travelling alone, as a couple,
            or with the whole family.
          </p>
        </div>
      </header>
    </div>
  );
}

export default Room;