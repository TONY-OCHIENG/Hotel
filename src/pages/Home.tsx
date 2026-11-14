import { useEffect, useState } from "react"
import { BedDouble, Users, Wifi, Coffee, Maximize } from "lucide-react";

type Room = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  guests: number;
  beds: string;
  size: string;
  perks: string[];
};

const rooms: Room[] = [
  {
    id: 1,
    name: "Standard Room",
    description:
      "A quiet, comfortable room with a plush bed, a work desk, and a private bathroom. Ideal for solo travelers and business stays.",
    price: 8500,
    image: "public/images/standard.jpg",
    guests: 2,
    beds: "1 Queen bed",
    size: "22 m²",
    perks: ["Free Wi-Fi", "Breakfast included"],
  },
  {
    id: 2,
    name: "Deluxe Room",
    description:
      "More space and a sitting area with garden views. A good fit for couples and weekend getaways who want extra room to relax.",
    price: 12500,
    image: "public/images/delux.jpeg",
    guests: 3,
    beds: "1 King bed",
    size: "32 m²",
    perks: ["Free Wi-Fi", "Breakfast included"],
  },
  {
    id: 3,
    name: "Family Suite",
    description:
      "Two bedrooms and a lounge, set up for families and small groups. Plenty of space to spread out and stay together.",
    price: 18500,
    image: "public/images/family.jpg",
    guests: 5,
    beds: "1 King + 2 Single beds",
    size: "55 m²",
    perks: ["Free Wi-Fi", "Breakfast included"],
  },
];

const formatPrice = (price: number) => `KES ${price.toLocaleString("en-KE")}`;

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
           <div className="mt-10 flex gap-4 md:flex-row flex-col max-w-md">
             <button className="py-4 rounded-md md:w-[60%] bg-amber-50 text-black font-extrabold
            cursor-pointer">Enquire on whatsapp</button>
             <button className="py-4 md:w-[60%] rounded-md  text-amber-50 border font-extrabold
            cursor-pointer">Book Now</button>
           </div>
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
        {/* Top rooms */}
         <section id="rooms" className="bg-stone-100 px-5 py-16 text-gray-900">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <h2 className="mb-3 text-3xl font-bold sm:text-4xl">Our Top Rooms</h2>
              <p className="leading-relaxed text-stone-600">
                Three ways to stay at Mara Hotel, each with clean interiors, restful
                bedding, and friendly service.
              </p>
            </div>

            <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rooms.map((room) => (
                <article
                  key={room.id}
                  className="flex flex-col overflow-hidden rounded-xl bg-white shadow-md"
                >
                  <img
                    src={room.image}
                    alt={`${room.name} at Mara Hotel`}
                    loading="lazy"
                    className="aspect-[4/3] w-full bg-stone-200 object-cover"
                  />

                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="mb-2 text-xl font-semibold">{room.name}</h3>
                    <p className="mb-4 leading-relaxed text-stone-600">
                      {room.description}
                    </p>

                    <ul className="mb-5 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                      <li className="flex items-center gap-1.5">
                        <Users size={16} aria-hidden="true" />
                        Up to {room.guests} guests
                      </li>
                      <li className="flex items-center gap-1.5">
                        <BedDouble size={16} aria-hidden="true" />
                        {room.beds}
                      </li>
                      <li className="flex items-center gap-1.5">
                        <Maximize size={16} aria-hidden="true" />
                        {room.size}
                      </li>
                      <li className="flex items-center gap-1.5">
                        <Wifi size={16} aria-hidden="true" />
                        {room.perks[0]}
                      </li>
                      <li className="flex items-center gap-1.5">
                        <Coffee size={16} aria-hidden="true" />
                        {room.perks[1]}
                      </li>
                    </ul>

                    <div className="mt-auto flex items-center justify-between gap-4 border-t border-stone-200 pt-4">
                      <p className="text-sm text-stone-600">
                        <strong className="block text-lg text-stone-900">
                          {formatPrice(room.price)}
                        </strong>
                        per night
                      </p>
                      <a
                        href={`/book?room=${room.id}`}
                        className="rounded-lg bg-amber-900 px-4 py-2.5 font-semibold text-white transition-colors hover:bg-orange-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900"
                      >
                        Book this room
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
    </div>
  )
}

export default Home
