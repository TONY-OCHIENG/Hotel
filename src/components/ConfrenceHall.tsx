import { useMemo, useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Users, LayoutGrid, Check } from "lucide-react";

type Hall = {
  id: string;
  name: string;
  capacity: number;
  setups: string[];
  description: string;
  image: string;
  halfDay: number;
  fullDay: number;
};

const halls: Hall[] = [
  {
    id: "boardroom",
    name: "Boardroom",
    capacity: 15,
    setups: ["Boardroom table"],
    description:
      "A private, quiet room for executive meetings, interviews, and small team sessions.",
    image: "/images/boardroom.jpeg",
    halfDay: 15000,
    fullDay: 25000,
  },
  {
    id: "mara-hall",
    name: "Mara Hall",
    capacity: 60,
    setups: ["Theatre", "Classroom", "U-shape"],
    description:
      "A flexible hall suited to workshops, trainings, seminars, and company events.",
    image: "/images/hall2.jpeg",
    halfDay: 35000,
    fullDay: 55000,
  },
  {
    id: "grand-ballroom",
    name: "Grand Ballroom",
    capacity: 150,
    setups: ["Banquet", "Theatre", "Cocktail"],
    description:
      "Our largest space for conferences, weddings, receptions, and large celebrations.",
    image: "/images/ballroom.jpg",
    halfDay: 70000,
    fullDay: 110000,
  },
];

const eventTypes = [
  "Meeting",
  "Training or workshop",
  "Conference or seminar",
  "Wedding or reception",
  "Other",
];

type FormState = {
  name: string;
  organisation: string;
  email: string;
  phone: string;
  eventType: string;
  hallId: string;
  date: string;
  duration: "halfDay" | "fullDay";
  attendees: number;
  setup: string;
  catering: boolean;
  notes: string;
};

const initialForm: FormState = {
  name: "",
  organisation: "",
  email: "",
  phone: "",
  eventType: eventTypes[0],
  hallId: halls[1].id,
  date: "",
  duration: "fullDay",
  attendees: 20,
  setup: halls[1].setups[0],
  catering: false,
  notes: "",
};

const formatPrice = (price: number) => `KES ${price.toLocaleString("en-KE")}`;
const today = () => new Date().toISOString().split("T")[0];

const inputClass =
  "w-full rounded-lg border border-stone-300 bg-white px-3 py-2.5 text-stone-900 placeholder:text-stone-400 focus:border-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-700/30";

export default function ConferenceHalls() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const hall = useMemo(
    () => halls.find((h) => h.id === form.hallId) ?? halls[0],
    [form.hallId]
  );
  const estimate = hall[form.duration];

  const selectHall = (id: string) => {
    const next = halls.find((h) => h.id === id) ?? halls[0];
    setForm((prev) => ({
      ...prev,
      hallId: next.id,
      setup: next.setups[0],
      attendees: Math.min(prev.attendees, next.capacity),
    }));
    setError("");
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "hallId") {
      selectHall(value);
      return;
    }

    if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: e.target.value }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: name === "attendees" ? Number(value) : value,
    }));
    setError("");
  };

  const handleBookHall = (id: string) => {
    selectHall(id);
    setSubmitted(false);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.attendees < 1) {
      setError("Please enter the number of attendees.");
      return;
    }
    if (form.attendees > hall.capacity) {
      setError(
        `The ${hall.name} holds up to ${hall.capacity} people. Choose a larger hall or reduce attendees.`
      );
      return;
    }

    // TODO: send `form` to your backend, email service, or booking API here.
    console.log("Conference booking request:", {
      ...form,
      hall: hall.name,
      estimate,
    });
    setSubmitted(true);
  };

  const handleReset = () => {
    setForm(initialForm);
    setSubmitted(false);
    setError("");
  };

  return (
    <section id="conference-halls" className="bg-stone-100 px-5 py-16 text-stone-900">
      {/* Halls */}
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <h2 className="mb-3 text-3xl font-bold sm:text-4xl">Our conference halls</h2>
        <p className="leading-relaxed text-stone-600">
          Pick the space that fits your group, then send us your details and
          we'll confirm availability.
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
        {halls.map((h) => (
          <article
            key={h.id}
            className="flex flex-col overflow-hidden rounded-xl bg-white shadow-md"
          >
            <img
              src={h.image}
              alt={`${h.name} at Mara Hotel`}
              loading="lazy"
              className="aspect-[4/3] w-full bg-stone-200 object-cover"
            />
            <div className="flex flex-1 flex-col p-5">
              <h3 className="mb-2 text-xl font-semibold">{h.name}</h3>
              <ul className="mb-3 space-y-1 text-sm text-stone-700">
                <li className="flex items-center gap-2">
                  <Users size={16} aria-hidden="true" />
                  Up to {h.capacity} people
                </li>
                <li className="flex items-center gap-2">
                  <LayoutGrid size={16} aria-hidden="true" />
                  {h.setups.join(", ")}
                </li>
              </ul>
              <p className="mb-4 leading-relaxed text-stone-600">{h.description}</p>

              <div className="mt-auto border-t border-stone-200 pt-4">
                <p className="mb-3 text-sm text-stone-600">
                  Half day{" "}
                  <strong className="text-stone-900">{formatPrice(h.halfDay)}</strong>
                  <span className="mx-2 text-stone-400">|</span>
                  Full day{" "}
                  <strong className="text-stone-900">{formatPrice(h.fullDay)}</strong>
                </p>
                <button
                  type="button"
                  onClick={() => handleBookHall(h.id)}
                  className="w-full rounded-lg bg-orange-700 px-4 py-2.5 font-semibold text-white transition-colors hover:bg-orange-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900"
                >
                  Book this hall
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Booking form */}
      <div ref={formRef} id="conference-booking" className="mx-auto mt-14 max-w-3xl scroll-mt-6">
        <div className="rounded-xl bg-white p-6 shadow-md sm:p-8">
          {submitted ? (
            <div role="status" className="py-6 text-center">
              <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-orange-700">
                <Check size={28} aria-hidden="true" />
              </span>
              <h3 className="mb-2 text-xl font-semibold">Booking request sent</h3>
              <p className="mb-6 leading-relaxed text-stone-600">
                Thank you, {form.name}. We've received your request for the{" "}
                {hall.name} and will confirm availability and a final quote at{" "}
                {form.email} shortly.
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="rounded-lg border border-orange-700 px-5 py-2.5 font-semibold text-orange-700 transition-colors hover:bg-orange-50"
              >
                Make another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <h3 className="text-2xl font-semibold">Book a conference hall</h3>
                <p className="text-sm text-stone-600">
                  Tell us about your event and we'll send a final quote.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="conf-name" className="mb-1 block text-sm font-medium">
                    Full name
                  </label>
                  <input
                    id="conf-name"
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
                  <label htmlFor="conf-org" className="mb-1 block text-sm font-medium">
                    Organisation <span className="text-stone-500">(optional)</span>
                  </label>
                  <input
                    id="conf-org"
                    name="organisation"
                    type="text"
                    autoComplete="organization"
                    value={form.organisation}
                    onChange={handleChange}
                    placeholder="Company or group name"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="conf-email" className="mb-1 block text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="conf-email"
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
                  <label htmlFor="conf-phone" className="mb-1 block text-sm font-medium">
                    Phone
                  </label>
                  <input
                    id="conf-phone"
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
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="conf-event" className="mb-1 block text-sm font-medium">
                    Event type
                  </label>
                  <select
                    id="conf-event"
                    name="eventType"
                    value={form.eventType}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    {eventTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="conf-hall" className="mb-1 block text-sm font-medium">
                    Hall
                  </label>
                  <select
                    id="conf-hall"
                    name="hallId"
                    value={form.hallId}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    {halls.map((h) => (
                      <option key={h.id} value={h.id}>
                        {h.name} (up to {h.capacity})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="conf-date" className="mb-1 block text-sm font-medium">
                    Event date
                  </label>
                  <input
                    id="conf-date"
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
                  <label htmlFor="conf-duration" className="mb-1 block text-sm font-medium">
                    Duration
                  </label>
                  <select
                    id="conf-duration"
                    name="duration"
                    value={form.duration}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="halfDay">Half day</option>
                    <option value="fullDay">Full day</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="conf-attendees" className="mb-1 block text-sm font-medium">
                    Number of attendees
                  </label>
                  <input
                    id="conf-attendees"
                    name="attendees"
                    type="number"
                    required
                    min={1}
                    max={hall.capacity}
                    value={form.attendees}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="conf-setup" className="mb-1 block text-sm font-medium">
                    Room setup
                  </label>
                  <select
                    id="conf-setup"
                    name="setup"
                    value={form.setup}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    {hall.setups.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <label className="flex items-center gap-3 text-sm font-medium">
                <input
                  type="checkbox"
                  name="catering"
                  checked={form.catering}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-stone-300 accent-orange-700"
                />
                I'd like tea, coffee, and catering for my group
              </label>

              <div>
                <label htmlFor="conf-notes" className="mb-1 block text-sm font-medium">
                  Other requirements <span className="text-stone-500">(optional)</span>
                </label>
                <textarea
                  id="conf-notes"
                  name="notes"
                  rows={3}
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="Equipment, decoration, accommodation for guests, etc."
                  className={inputClass}
                />
              </div>

              <div className="rounded-lg bg-stone-50 p-4 text-sm">
                <div className="flex justify-between text-stone-600">
                  <span>
                    {hall.name} ({form.duration === "halfDay" ? "half day" : "full day"})
                  </span>
                  <span>{formatPrice(estimate)}</span>
                </div>
                <p className="mt-2 border-t border-stone-200 pt-2 text-stone-500">
                  Estimate for the hall only. Catering and extras are quoted
                  separately.
                </p>
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
    </section>
  );
}
