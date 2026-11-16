import { useMemo, useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Coffee, Utensils, Wine, Clock, Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Venue = {
  id: string;
  name: string;
  description: string;
  image: string;
  icon: LucideIcon;
  dishes: string[];
  opens: string; // 24h "HH:MM"
  closes: string; // 24h "HH:MM"
  hoursLabel: string;
  maxGuests: number;
};

const venues: Venue[] = [
  {
    id: "breakfast",
    name: "Breakfast Buffet",
    description:
      "Start the day with fresh fruit, eggs made to order, pastries, and hot Kenyan tea and coffee.",
    image: "/images/breakfirst.jpeg",
    icon: Coffee,
    dishes: ["Fresh tropical fruit", "Eggs your way", "Mandazi and pastries"],
    opens: "06:30",
    closes: "10:30",
    hoursLabel: "6:30 AM – 10:30 AM",
    maxGuests: 10,
  },
  {
    id: "restaurant",
    name: "The Mara Restaurant",
    description:
      "Lunch and dinner with local favorites and international dishes, cooked fresh and served with a smile.",
    image: "/images/lunch.jpg",
    icon: Utensils,
    dishes: ["Nyama choma", "Pilau and kachumbari", "Grilled fish and ugali"],
    opens: "12:00",
    closes: "22:00",
    hoursLabel: "12:00 PM – 10:00 PM",
    maxGuests: 12,
  },
  {
    id: "bar",
    name: "Garden Bar",
    description:
      "Unwind with a cold drink, a cocktail, or a light snack in a relaxed outdoor setting.",
    image: "/images/lightbites.jpeg",
    icon: Wine,
    dishes: ["Signature cocktails", "Local beers and wines", "Light bites"],
    opens: "16:00",
    closes: "23:00",
    hoursLabel: "4:00 PM – 11:00 PM",
    maxGuests: 10,
  },
];

const occasions = [
  "Just dining",
  "Birthday",
  "Anniversary",
  "Business meal",
  "Family gathering",
  "Other",
];

type FormState = {
  name: string;
  email: string;
  phone: string;
  venueId: string;
  date: string;
  time: string;
  guests: number;
  occasion: string;
  requests: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  venueId: venues[1].id,
  date: "",
  time: venues[1].opens,
  guests: 2,
  occasion: occasions[0],
  requests: "",
};

const today = () => new Date().toISOString().split("T")[0];

const formatDate = (date: string) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("en-KE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const formatTime = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${suffix}`;
};

const inputClass =
  "w-full rounded-lg border border-stone-300 bg-white px-3 py-2.5 text-stone-900 placeholder:text-stone-400 focus:border-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-700/30";

export default function DiningReservation() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const venue = useMemo(
    () => venues.find((v) => v.id === form.venueId) ?? venues[0],
    [form.venueId]
  );

  const selectVenue = (id: string) => {
    const next = venues.find((v) => v.id === id) ?? venues[0];
    setForm((prev) => ({
      ...prev,
      venueId: next.id,
      time: next.opens,
      guests: Math.min(prev.guests, next.maxGuests),
    }));
    setError("");
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "venueId") {
      selectVenue(value);
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: name === "guests" ? Number(value) : value,
    }));
    setError("");
  };

  const handleReserve = (id: string) => {
    selectVenue(id);
    setSubmitted(false);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.time < venue.opens || form.time > venue.closes) {
      setError(
        `${venue.name} is open ${venue.hoursLabel}. Please choose a time within those hours.`
      );
      return;
    }

    if (form.date === today()) {
      const now = new Date();
      const nowTime = `${String(now.getHours()).padStart(2, "0")}:${String(
        now.getMinutes()
      ).padStart(2, "0")}`;
      if (form.time <= nowTime) {
        setError("Please choose a time later than the current time.");
        return;
      }
    }

    // TODO: send `form` to your backend, email service, or reservation API here.
    console.log("Reservation request:", { ...form, venue: venue.name });
    setSubmitted(true);
  };

  const handleReset = () => {
    setForm(initialForm);
    setSubmitted(false);
    setError("");
  };

  return (
    <section id="dining" className="bg-white px-5 py-16 text-stone-900">
      {/* Dining options */}
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
        {venues.map(
          ({ id, name, description, image, icon: Icon, dishes, hoursLabel }) => (
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

                <div className="mt-auto border-t border-stone-200 pt-4">
                  <p className="mb-3 flex items-center gap-2 text-sm font-medium text-stone-700">
                    <Clock size={16} aria-hidden="true" />
                    {hoursLabel}
                  </p>
                  <button
                    type="button"
                    onClick={() => handleReserve(id)}
                    className="w-full rounded-lg bg-orange-700 px-4 py-2.5 font-semibold text-white transition-colors hover:bg-orange-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900"
                  >
                    Reserve a table
                  </button>
                </div>
              </div>
            </article>
          )
        )}
      </div>

      {/* Reservation form */}
      <div
        ref={formRef}
        id="dining-reservation"
        className="mx-auto mt-14 max-w-3xl scroll-mt-24"
      >
        <div className="rounded-xl bg-stone-100 p-6 shadow-md sm:p-8">
          {submitted ? (
            <div role="status" className="py-6 text-center">
              <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-orange-700">
                <Check size={28} aria-hidden="true" />
              </span>
              <h3 className="mb-2 text-xl font-semibold">
                Reservation request sent
              </h3>
              <p className="mb-6 leading-relaxed text-stone-600">
                Thank you, {form.name}. We've received your request for{" "}
                {form.guests} {form.guests === 1 ? "guest" : "guests"} at{" "}
                {venue.name} on {formatDate(form.date)} at{" "}
                {formatTime(form.time)}. We'll confirm it at {form.email}{" "}
                shortly.
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="rounded-lg border border-orange-700 px-5 py-2.5 font-semibold text-orange-700 transition-colors hover:bg-orange-50"
              >
                Make another reservation
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <h3 className="text-2xl font-semibold">Reserve a table</h3>
                <p className="text-sm text-stone-600">
                  Choose your venue, date, and time, and we'll confirm your
                  reservation.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="dine-name" className="mb-1 block text-sm font-medium">
                    Full name
                  </label>
                  <input
                    id="dine-name"
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
                  <label htmlFor="dine-phone" className="mb-1 block text-sm font-medium">
                    Phone
                  </label>
                  <input
                    id="dine-phone"
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
                <div className="sm:col-span-2">
                  <label htmlFor="dine-email" className="mb-1 block text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="dine-email"
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
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="dine-venue" className="mb-1 block text-sm font-medium">
                    Where would you like to dine?
                  </label>
                  <select
                    id="dine-venue"
                    name="venueId"
                    value={form.venueId}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    {venues.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.name} ({v.hoursLabel})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="dine-guests" className="mb-1 block text-sm font-medium">
                    Guests
                  </label>
                  <select
                    id="dine-guests"
                    name="guests"
                    value={form.guests}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    {Array.from({ length: venue.maxGuests }, (_, i) => i + 1).map(
                      (n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? "guest" : "guests"}
                        </option>
                      )
                    )}
                  </select>
                </div>
                <div>
                  <label htmlFor="dine-date" className="mb-1 block text-sm font-medium">
                    Date
                  </label>
                  <input
                    id="dine-date"
                    name="date"
                    type="date"
                    required
                    min={today()}
                    value={form.date}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="dine-time" className="mb-1 block text-sm font-medium">
                    Time
                  </label>
                  <input
                    id="dine-time"
                    name="time"
                    type="time"
                    required
                    min={venue.opens}
                    max={venue.closes}
                    value={form.time}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="dine-occasion" className="mb-1 block text-sm font-medium">
                  Occasion <span className="text-stone-500">(optional)</span>
                </label>
                <select
                  id="dine-occasion"
                  name="occasion"
                  value={form.occasion}
                  onChange={handleChange}
                  className={inputClass}
                >
                  {occasions.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="dine-requests" className="mb-1 block text-sm font-medium">
                  Dietary needs or special requests{" "}
                  <span className="text-stone-500">(optional)</span>
                </label>
                <textarea
                  id="dine-requests"
                  name="requests"
                  rows={3}
                  value={form.requests}
                  onChange={handleChange}
                  placeholder="Allergies, vegetarian options, high chair, window seat, etc."
                  className={inputClass}
                />
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
                Request reservation
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
