import { Wifi, Projector, Car, Mic } from "lucide-react";
import ConferenceHalls from "../components/ConfrenceHall";

const features = [
  { icon: Wifi, name: "High-speed Wi-Fi", detail: "Reliable and free for all guests" },
  { icon: Projector, name: "Projector and screen", detail: "Clear display for presentations" },
  { icon: Car, name: "Ample parking", detail: "Safe space for all attendees" },
  { icon: Mic, name: "Microphones", detail: "Sound system for every hall" },
];
function Confrence() {
  return (
    <div>   
     <div
      style={{
        backgroundImage: `url(/images/hall2.jpeg)`,
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
     {/*Features */}
        <div className="w-full bg-amber-950 p-8">
            <div className="mx-auto grid w-full grid-cols-2 gap-6 px-2 text-amber-50 md:w-[80%] md:grid-cols-4 md:gap-0">
                {features.map(({ icon: Icon, name, detail }) => (
                <div
                    key={name}
                    className="md:border-r md:border-amber-800 md:px-6 md:first:pl-0 md:last:border-r-0"
                >
                    <Icon size={24} className="mb-2 text-orange-300" aria-hidden="true" />
                    <h2 className="text-lg font-semibold">{name}</h2>
                    <p className="mt-1 text-sm text-amber-100/70">{detail}</p>
                </div>
                ))}
            </div>
        </div>
        {/* Confrence hall section */}
        <ConferenceHalls/>
    </div>
  )
}

export default Confrence
