import DeluxeRoom from "../components/DeluxeRoom";
import ExecutiveRoom from "../components/ExecuteveRoom";
import StandardRoom from "../components/StandardRoom";

type RoomType = {
  name: string;
  price: number;
};

const rooms: RoomType[] = [
  { name: "Standard Room", price: 8500 },
  { name: "Deluxe Room", price: 11000 },
  { name: "Executive Room", price: 15000 },
  { name: "Family Room", price: 18000 },
];
const formatPrice = (price: number) => `KES ${price.toLocaleString("en-KE")}`;
function Room() {
  return (
   <div>
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
      <header className="relative z-10 w-full px-5 py-16 md:w-[80%] mx-auto text-amber-50 sm:py-20">
        <div className=" max-w-3xl">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-orange-300">
            Rooms and Suites
          </p>
          <h1 className="mb-4 text-4xl font-extrabold">
            Find the Perfect Room for Your Stay
          </h1>
          <p className="max-w-md text-sm leading-relaxed text-amber-100/80">
            Every room at Mara Hotel is designed for rest, with comfortable
            bedding, clean interiors, and friendly service. Choose the space
            that suits your trip, whether you're travelling alone, as a couple,
            or with the whole family.
          </p>
        </div>
      </header>
    </div>
    {/* Room types banner */}
     <div className="w-full bg-amber-950 p-8">
        <div className="mx-auto grid w-full grid-cols-2 gap-6 px-2 text-amber-50 md:w-[80%] md:grid-cols-4 md:gap-0">
          {rooms.map((item) => (
            <div
              key={item.name}
              className="md:border-r md:border-amber-800 md:px-6 md:first:pl-0 md:last:border-r-0"
            >
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="mt-1 text-sm text-orange-300">
                From {formatPrice(item.price)}{" "}
                <span className="text-amber-100/70">per night</span>
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Standard room section */}
      <StandardRoom/>
      {/* Deluce room section */}
      <DeluxeRoom/>
      {/* Executive room section */}
      <ExecutiveRoom/>
   </div>
  )
}

export default Room;