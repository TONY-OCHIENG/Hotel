import Gallery from "../components/Gallery";

export default function GalleryPage() {
  return (
    <div>
    <div
      style={{
        backgroundImage: `url(/images/valeriia-bugaiova-_pPHgeHz1uk-unsplash.jpg)`,
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
            Gallery
          </p>
          <h1 className="mb-4 text-4xl font-extrabold">
            A Look Inside Mara Hotel
          </h1>
          <p className="max-w-md text-sm leading-relaxed text-amber-100/80">
            Browse photos of our comfortable rooms, welcoming restaurant,
            conference spaces, and peaceful grounds, and picture yourself
            staying with us.
          </p>
        </div>
      </header>
      
    </div>
    <Gallery/>
    </div>
  );
}