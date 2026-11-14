import { useEffect, useState } from "react"

const backgroundImages = [
    {image: "public/images/christian-lambert-vmIWr0NnpCQ-unsplash.jpg"},
    {image: "public/images/point3d-commercial-imaging-ltd-oxeCZrodz78-unsplash.jpg"},
    {image: "public/images/valeriia-bugaiova-_pPHgeHz1uk-unsplash.jpg"}
]
function Home() {
    const [slideIndex,setslideIndex] = useState<number>(0)
    const nextSlide = () => {
        if (slideIndex < backgroundImages.length - 1) {
            setslideIndex((prev) => prev + 1)
        } else {
            setslideIndex(0)
        }
    }
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide()
        },5000)
        return () => clearInterval(interval)
    },[nextSlide])
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImages[slideIndex].image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: "-10px"
      }}
    className="relative h-[100vh] w-full transition-all duration-300">
        <div className="absolute z-[-1px] w-full h-full bg-black opacity-60"></div>
        <div className=" flex items-center md:mx-auto h-[100vh] md:w-[80%] w-full px-2">
          <section className="z-10">
            <h1 className="text-amber-50 font-extrabold text-4xl md:text-6xl">Your Escape to Comfort <br /> & Calm at Mara Hotel</h1>
            <p className="text-gray-200 text-sm mt-4 max-w-xl">
                Wake up to warm hospitality, spacious rooms, and an atmosphere designed
                for rest. Whether you're visiting for business, a weekend getaway, or a
                family stay, Mara Hotel offers the comfort, service, and attention to
                detail that make every visit feel like coming home.
            </p>
            <button className="mt-10 py-3 rounded-md px-8 bg-amber-50 text-black font-extrabold
            cursor-pointer">Enquire on whatsapp</button>
            <p className="text-amber-400 text-xs mt-10">Over 1000+ satisfied clients</p>
          </section>
        </div>
        {/* About section*/}
        <div className="w-full bg-amber-50">
          <div className="md:w-[80%] w-full px-2 mx-auto py-16">
            <section className="about">
              <h2 className="text-center font-extrabold text-3xl text-gray-900">About Mara Hotel</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
                <div>
                    <p>
                      Mara Hotel is a welcoming home away from home, created for travelers who
                      value comfort, convenience, and genuine hospitality. From the moment you
                      arrive, our team is committed to making your stay smooth, relaxing, and
                      memorable.
                    </p>
                    <p>
                      Our rooms are thoughtfully designed with clean, comfortable interiors,
                      restful bedding, and modern amenities to help you unwind after a long day
                      of travel or work.
                    </p>
                </div>
                <div>
                  <img src="public/images/valeriia-bugaiova-_pPHgeHz1uk-unsplash.jpg" className="rounded-md" alt="" />
                </div>
              </div>
            </section>
          </div>
        </div>
    </div>
  )
}

export default Home
