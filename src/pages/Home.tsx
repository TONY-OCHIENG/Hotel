import { useEffect, useState } from "react"
import { BedDouble, Users, Wifi, Coffee, Mic,
  Car,  Projector,  Check, Maximize,Utensils, Wine, Clock, HeartHandshake,Star } from "lucide-react";
import Footer from "../components/Footer";


type Hall = {
  id: number;
  name: string;
  capacity: string;
  setup: string;
  description: string;
  image: string;
};

const halls: Hall[] = [
  {
    id: 1,
    name: "Boardroom",
    capacity: "Up to 15 people",
    setup: "Boardroom table",
    description:
      "A private, quiet room for executive meetings, interviews, and small team sessions.",
    image: "/images/boardroom.jpeg",
  },
  {
    id: 2,
    name: "Mara Hall",
    capacity: "Up to 60 people",
    setup: "Theatre, classroom, or U-shape",
    description:
      "A flexible hall suited to workshops, trainings, seminars, and company events.",
    image: "/images/hall2.jpeg",
  },
  {
    id: 3,
    name: "Grand Ballroom",
    capacity: "Up to 150 people",
    setup: "Banquet, theatre, or cocktail",
    description:
      "Our largest space for conferences, weddings, receptions, and large celebrations.",
    image: "/images/ballroom.jpg",
  },
];

const amenities = [
  { icon: Projector, label: "Projector and screen" },
  { icon: Wifi, label: "High-speed Wi-Fi" },
  { icon: Mic, label: "Sound system and microphones" },
  { icon: Coffee, label: "Tea, coffee, and catering" },
  { icon: Car, label: "Ample parking" },
  { icon: Users, label: "On-site events support" },
];

type DiningOption = {
  id: number;
  name: string;
  description: string;
  hours: string;
  image: string;
  icon: typeof Coffee;
  dishes: string[];
};

const options: DiningOption[] = [
  {
    id: 1,
    name: "Breakfast Buffet",
    description:
      "Start the day with fresh fruit, eggs made to order, pastries, and hot Kenyan tea and coffee.",
    hours: "6:30 AM – 10:30 AM",
    image: "/images/breakfirst.jpeg",
    icon: Coffee,
    dishes: ["Fresh tropical fruit", "Eggs your way", "Mandazi and pastries"],
  },
  {
    id: 2,
    name: "The Mara Restaurant",
    description:
      "Lunch and dinner with local favorites and international dishes, cooked fresh and served with a smile.",
    hours: "12:00 PM – 10:00 PM",
    image: "/images/lunch.jpg",
    icon: Utensils,
    dishes: ["Nyama choma", "Pilau and kachumbari", "Grilled fish and ugali"],
  },
  {
    id: 3,
    name: "Garden Bar",
    description:
      "Unwind with a cold drink, a cocktail, or a light snack in a relaxed outdoor setting.",
    hours: "4:00 PM – 11:00 PM",
    image: "/images/lightbites.jpeg",
    icon: Wine,
    dishes: ["Signature cocktails", "Local beers and wines", "Light bites"],
  },
];



type Testimonial = {
  id: number;
  name: string;
  location: string;
  stay: string;
  rating: number;
  quote: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Wanjiru K.",
    location: "Nairobi",
    stay: "Deluxe Room",
    rating: 5,
    quote:
      "The room was spotless and the bed was so comfortable I slept better than I have in months. The staff greeted us by name by the second day.",
  },
  {
    id: 2,
    name: "James O.",
    location: "Mombasa",
    stay: "Standard Room",
    rating: 5,
    quote:
      "I was in town for work and everything was easy: quick check-in, fast Wi-Fi, and a quiet desk to get things done. I'll book here again.",
  },
  {
    id: 3,
    name: "The Hassan Family",
    location: "Kisumu",
    stay: "Family Suite",
    rating: 4,
    quote:
      "We stayed as a family of five and the suite gave everyone enough space. The kids loved breakfast, and the team was patient and helpful.",
  },
];

const highlights = [
  {
    icon: BedDouble,
    title: "Restful rooms",
    text: "Clean, comfortable interiors with quality bedding and modern amenities.",
  },
  {
    icon: Utensils,
    title: "Good food",
    text: "Meals prepared with care, from a hearty breakfast to a relaxed dinner.",
  },
  {
    icon: HeartHandshake,
    title: "Warm service",
    text: "A friendly team that anticipates what you need before you ask.",
  },
  {
    icon: Wifi,
    title: "Stay connected",
    text: "Free Wi-Fi throughout the hotel for work, streaming, and staying in touch.",
  },
];


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
    image: "/images/standard.jpg",
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
    image: "/images/delux.jpeg",
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
    image: "/images/family.jpg",
    guests: 5,
    beds: "1 King + 2 Single beds",
    size: "55 m²",
    perks: ["Free Wi-Fi", "Breakfast included"],
  },
];

const formatPrice = (price: number) => `KES ${price.toLocaleString("en-KE")}`;

const backgroundImages = [
    {image: "/images/christian-lambert-vmIWr0NnpCQ-unsplash.jpg"},
    {image: "/images/point3d-commercial-imaging-ltd-oxeCZrodz78-unsplash.jpg"},
    {image: "/images/valeriia-bugaiova-_pPHgeHz1uk-unsplash.jpg"}
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
          <div className="md:w-[80%] w-full px-2 mx-auto py-20">
              <section id="about" className=" px-5 text-stone-900">
                  <h2 className="mb-4 text-3xl text-center font-bold sm:text-4xl">
                        About Mara Hotel
                      </h2>
                  <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
                    <div className="relative">
                      <img
                        src="/images/valeriia-bugaiova-_pPHgeHz1uk-unsplash.jpg"
                        alt="Mara Hotel exterior"
                        loading="lazy"
                        className="aspect-[4/3] w-full rounded-xl bg-stone-200 object-cover shadow-md"
                      />
                    </div>

                    <div>
                    
                      <p className="mb-4 leading-relaxed text-stone-600">
                        Mara Hotel is a welcoming home away from home, created for
                        travelers who value comfort, convenience, and genuine hospitality.
                        From the moment you arrive, our team is committed to making your
                        stay smooth, relaxing, and memorable.
                      </p>
                      <p className="mb-8 leading-relaxed text-stone-600">
                        Whether you're here for business, a family holiday, or a romantic
                        getaway, we pay attention to the details: a warm greeting, a
                        spotless room, and service that makes you want to come back.
                      </p>

                      <ul className="grid gap-5 sm:grid-cols-2">
                        {highlights.map(({ icon: Icon, title, text }) => (
                          <li key={title} className="flex gap-3">
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-700">
                              <Icon size={20} aria-hidden="true" />
                            </span>
                            <div>
                              <h3 className="font-semibold">{title}</h3>
                              <p className="text-sm leading-relaxed text-stone-600">
                                {text}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>
          </div>
        </div>
        {/* Dining section */}
           <section id="dining" className="bg-white px-5 py-16 text-stone-900">
              <div className="mx-auto mb-10 max-w-2xl text-center">
                <h2 className="mb-3 text-3xl font-bold sm:text-4xl">
                  Dining at Mara Hotel
                </h2>
                <p className="leading-relaxed text-stone-600">
                  From a slow morning breakfast to an evening drink, enjoy good food
                  and friendly service without leaving the hotel.
                </p>
              </div>

              <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
                {options.map(({ id, name, description, hours, image, icon: Icon, dishes }) => (
                  <article
                    key={id}
                    className="flex flex-col overflow-hidden rounded-xl bg-stone-50 shadow-md"
                  >
                    <img
                      src={image}
                      alt={`${name} at Mara Hotel`}
                      loading="lazy"
                      className="aspect-[4/3] w-full bg-stone-200 object-cover"
                    />

                    <div className="flex flex-1 flex-col p-5">
                      <div className="mb-2 flex items-center gap-2">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-100 text-orange-700">
                          <Icon size={18} aria-hidden="true" />
                        </span>
                        <h3 className="text-xl font-semibold">{name}</h3>
                      </div>

                      <p className="mb-4 leading-relaxed text-stone-600">
                        {description}
                      </p>

                      <ul className="mb-5 space-y-1 text-sm text-stone-700">
                        {dishes.map((dish) => (
                          <li key={dish} className="flex items-center gap-2">
                            <span
                              aria-hidden="true"
                              className="h-1.5 w-1.5 rounded-full bg-orange-600"
                            />
                            {dish}
                          </li>
                        ))}
                      </ul>

                      <p className="mt-auto flex items-center gap-2 border-t border-stone-200 pt-4 text-sm font-medium text-stone-700">
                        <Clock size={16} aria-hidden="true" />
                        {hours}
                      </p>
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-10 text-center">
                <a
                  href="/book"
                  className="inline-block rounded-lg bg-[#4d1600] px-6 py-3 font-semibold text-white transition-colors hover:bg-orange-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900"
                >
                  Reserve a table
                </a>
              </div>
    </section>
        {/* Top rooms */}
         <section id="rooms" className="bg-gray-50 px-5 py-16 text-gray-900">
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
          {/* confrence section */}
            <section id="conference" className="bg-stone-100 px-5 py-16 text-stone-900">
                <div className="mx-auto mb-10 max-w-2xl text-center">
                  <h2 className="mb-3 text-3xl font-bold sm:text-4xl">
                    Conferences and events
                  </h2>
                  <p className="leading-relaxed text-stone-600">
                    Host your next meeting, training, or celebration at Mara Hotel, with
                    comfortable spaces, reliable equipment, and a team that handles the
                    details.
                  </p>
                </div>

                <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {halls.map((hall) => (
                    <article
                      key={hall.id}
                      className="flex flex-col overflow-hidden rounded-xl bg-white shadow-md"
                    >
                      <img
                        src={hall.image}
                        alt={`${hall.name} at Mara Hotel`}
                        loading="lazy"
                        className="aspect-[4/3] w-full bg-stone-200 object-cover"
                      />
                      <div className="flex flex-1 flex-col p-5">
                        <h3 className="mb-1 text-xl font-semibold">{hall.name}</h3>
                        <p className="mb-3 flex items-center gap-2 text-sm font-medium text-orange-700">
                          <Users size={16} aria-hidden="true" />
                          {hall.capacity}
                        </p>
                        <p className="mb-4 leading-relaxed text-stone-600">
                          {hall.description}
                        </p>
                        <p className="mt-auto border-t border-stone-200 pt-4 text-sm text-stone-700">
                          <span className="font-semibold">Setup:</span> {hall.setup}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="mx-auto mt-12 max-w-6xl rounded-xl bg-white p-6 shadow-md sm:p-8">
                  <h3 className="mb-5 text-xl font-semibold">What's included</h3>
                  <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {amenities.map(({ icon: Icon, label }) => (
                      <li key={label} className="flex items-center gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-700">
                          <Icon size={20} aria-hidden="true" />
                        </span>
                        <span className="text-stone-700">{label}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-stone-200 pt-6 sm:flex-row sm:items-center">
                    <p className="flex items-center gap-2 text-stone-700">
                      <Check size={18} className="text-orange-700" aria-hidden="true" />
                      Custom packages for half-day, full-day, and residential events.
                    </p>
                    <a
                      href="mailto:events@marahotel.com?subject=Conference%20enquiry"
                      className="rounded-lg bg-[#4d1600] px-6 py-3 font-semibold text-white transition-colors hover:bg-orange-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900"
                    >
                      Request a quote
                    </a>
                  </div>
                </div>
              </section>
          {/* Testimonials section */}
            <section id="testimonials" className="bg-stone-100 px-5 py-16 text-stone-900">
                <div className="mx-auto mb-10 max-w-2xl text-center">
                  <h2 className="mb-3 text-3xl font-bold sm:text-4xl">
                    What our guests say
                  </h2>
                  <p className="leading-relaxed text-stone-600">
                    Honest words from people who have stayed with us.
                  </p>
                </div>

                <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {testimonials.map((t) => (
                    <figure
                      key={t.id}
                      className="flex flex-col rounded-xl bg-white p-6 shadow-md"
                    >
                      <div
                        className="mb-4 flex gap-1"
                        role="img"
                        aria-label={`${t.rating} out of 5 stars`}
                      >
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={18}
                            aria-hidden="true"
                            className={
                              i < t.rating
                                ? "fill-orange-500 text-orange-500"
                                : "text-stone-300"
                            }
                          />
                        ))}
                      </div>

                      <blockquote className="mb-6 leading-relaxed text-stone-700">
                        “{t.quote}”
                      </blockquote>

                      <figcaption className="mt-auto flex items-center gap-3 border-t border-stone-200 pt-4">
                        <span
                          aria-hidden="true"
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 font-semibold text-orange-700"
                        >
                          {t.name.charAt(0)}
                        </span>
                        <div>
                          <p className="font-semibold">{t.name}</p>
                          <p className="text-sm text-stone-600">
                            {t.location} · {t.stay}
                          </p>
                        </div>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </section>
              <Footer/>   
    </div>
  )
}

export default Home
