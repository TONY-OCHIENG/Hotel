import { useMemo, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import {
  BedDouble,
  Users,
  Maximize,
  Wifi,
  Coffee,
  Tv,
  ShowerHead,
  Wind,
  Check,
} from "lucide-react";

const ROOM = {
  name: "Standard Room",
  price: 8500,
  maxGuests: 2,
  image: "/images/standard.jpg",
  description:
    "A quiet, comfortable room with a plush queen bed, a work desk, and a private bathroom. It's a good fit for solo travelers, couples, and business stays that call for a calm place to rest.",
};

const facts = [
  { icon: Users, label: "Up to 2 guests" },
  { icon: BedDouble, label: "1 Queen bed" },
  { icon: Maximize, label: "22 m²" },
];

const amenities = [
  { icon: Wifi, label: "Free Wi-Fi" },
  { icon: Coffee, label: "Breakfast included" },
  { icon: Tv, label: "Flat-screen TV" },
  { icon: Wind, label: "Air conditioning" },
  { icon: ShowerHead, label: "Private bathroom" },
  { icon: Check, label: "Work desk" },
];

type FormState = {
  name: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  requests: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  checkIn: "",
  checkOut: "",
  guests: 1,
  requests: "",
};

const formatPrice = (price: number) => `KES ${price.toLocaleString("en-KE")}`;

const today = () => new Date().toISOString().split("T")[0];

const nightsBetween = (checkIn: string, checkOut: string) => {
  if (!checkIn || !checkOut) return 0;
  const ms = new Date(checkOut).getTime() - new Date(checkIn).getTime();
  return Math.max(0, Math.round(ms / (1000 * 60 * 60 * 24)));
};

const inputClass =
  "w-full rounded-lg border border-stone-300 bg-white px-3 py-2.5 text-stone-900 placeholder:text-stone-400 focus:border-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-700/30";

export default function StandardRoom() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const nights = useMemo(
    () => nightsBetween(form.checkIn, form.checkOut),
    [form.checkIn, form.checkOut]
  );
  const total = nights * ROOM.price;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "guests" ? Number(value) : value,
    }));
    setError("");
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (nights < 1) {
      setError("Check-out must be at least one day after check-in.");
      return;
    }

    // TODO: send `form` to your backend or booking API here.
    console.log("Booking request:", { room: ROOM.name, ...form, nights, total });
    setSubmitted(true);
  };

  const handleReset = () => {
    setForm(initialForm);
    setSubmitted(false);
    setError("");
  };

  return (
    <section id="standard-room" className="bg-stone-100 px-5 py-16 text-stone-900">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-5 lg:gap-12">
        {/* Room details */}
        <div className="lg:col-span-3">
          <img
            src={ROOM.image}
            alt={`${ROOM.name} at Mara Hotel`}
            className="aspect-[16/10] w-full rounded-xl bg-stone-200 object-cover shadow-md"
          />

          <div className="mt-6 flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-3xl font-bold">{ROOM.name}</h2>
            <p className="text-stone-600">
              <strong className="text-2xl text-orange-700">
                {formatPrice(ROOM.price)}
              </strong>{" "}
              per night
            </p>
          </div>

          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-stone-700">
            {facts.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2">
                <Icon size={18} aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>

          <p className="mt-5 leading-relaxed text-stone-600">
            {ROOM.description}
          </p>

          <h3 className="mb-4 mt-8 text-xl font-semibold">Room amenities</h3>
          <ul className="grid gap-4 sm:grid-cols-2">
            {amenities.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-700">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <span className="text-stone-700">{label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Booking form */}
        <div className="lg:col-span-2">
          <div className="rounded-xl bg-white p-6 shadow-md lg:sticky lg:top-6">
            {submitted ? (
              <div role="status" className="py-6 text-center">
                <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-orange-700">
                  <Check size={28} aria-hidden="true" />
                </span>
                <h3 className="mb-2 text-xl font-semibold">
                  Booking request sent
                </h3>
                <p className="mb-6 leading-relaxed text-stone-600">
                  Thank you, {form.name}. We've received your request for the{" "}
                  {ROOM.name} and will confirm it at {form.email} shortly.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="rounded-lg border border-orange-700 px-5 py-2.5 font-semibold text-orange-700 transition-colors hover:bg-orange-50"
                >
                  Make another booking
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate={false} className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold">Book this room</h3>
                  <p className="text-sm text-stone-600">
                    Fill in your details and we'll confirm your stay.
                  </p>
                </div>

                <div>
                  <label htmlFor="name" className="mb-1 block text-sm font-medium">
                    Full name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Jane Wanjiru"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-1 block text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="mb-1 block text-sm font-medium">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+254 700 000 000"
                    className={inputClass}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="checkIn" className="mb-1 block text-sm font-medium">
                      Check-in
                    </label>
                    <input
                      id="checkIn"
                      name="checkIn"
                      type="date"
                      required
                      min={today()}
                      value={form.checkIn}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="checkOut" className="mb-1 block text-sm font-medium">
                      Check-out
                    </label>
                    <input
                      id="checkOut"
                      name="checkOut"
                      type="date"
                      required
                      min={form.checkIn || today()}
                      value={form.checkOut}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="guests" className="mb-1 block text-sm font-medium">
                    Guests
                  </label>
                  <select
                    id="guests"
                    name="guests"
                    value={form.guests}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    {Array.from({ length: ROOM.maxGuests }, (_, i) => i + 1).map(
                      (n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? "guest" : "guests"}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div>
                  <label htmlFor="requests" className="mb-1 block text-sm font-medium">
                    Special requests <span className="text-stone-500">(optional)</span>
                  </label>
                  <textarea
                    id="requests"
                    name="requests"
                    rows={3}
                    value={form.requests}
                    onChange={handleChange}
                    placeholder="Late check-in, extra pillows, etc."
                    className={inputClass}
                  />
                </div>

                {/* Price summary */}
                <div className="rounded-lg bg-stone-50 p-4 text-sm">
                  <div className="flex justify-between text-stone-600">
                    <span>
                      {formatPrice(ROOM.price)} × {nights}{" "}
                      {nights === 1 ? "night" : "nights"}
                    </span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <div className="mt-2 flex justify-between border-t border-stone-200 pt-2 text-base font-semibold">
                    <span>Total</span>
                    <span className="text-orange-700">{formatPrice(total)}</span>
                  </div>
                </div>

                {error && (
                  <p role="alert" className="text-sm font-medium text-red-700">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full rounded-lg bg-orange-700 px-5 py-3 font-semibold text-white transition-colors hover:bg-orange-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900"
                >
                  Request booking
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}