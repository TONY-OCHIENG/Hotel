import Contact from "./Contact"


function ContactPage() {
  return (
    <div>
         <div
      style={{
        backgroundImage: `url(/images/markus-winkler-48CkLuEGgWU-unsplash.jpg)`,
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
            Contact Us
          </p>
          <h1 className="mb-4 text-4xl font-extrabold">
            We'd Love to Hear From You
          </h1>
          <p className="max-w-md text-sm leading-relaxed text-amber-100/80">
            Planning a stay, an event, or just have a question? Send us a
            message or give us a call, and our friendly team will get back to
            you as soon as possible.
          </p>
        </div>
      </header>
    </div>
    <Contact/>      
    </div>
  )
}

export default ContactPage
