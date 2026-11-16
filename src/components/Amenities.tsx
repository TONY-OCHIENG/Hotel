import {
  Wifi,
  Car,
  Utensils,
  ConciergeBell,
  Waves,
  Dumbbell,
  Shirt,
  Plane,
  Presentation,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Amenity = {
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
  wide?: boolean; // spans two columns on large screens
};

const amenities: Amenity[] = [
  {
    icon: Utensils,
    title: "Restaurant and bar",
    description:
      "Breakfast, lunch, dinner, and evening drinks, made with care and served with a smile.",
    image: "/images/qui-nguyen-S6atLH5Rf0U-unsplash.jpg",
    wide: true,
  },
  {
    icon: Wifi,
    title: "Free Wi-Fi",
    description:
      "Fast, reliable internet throughout the hotel for work and streaming.",
    image: "/images/dreamlike-street-sOdVYQQo4UU-unsplash.jpg",
  },
  {
    icon: Waves,
    title: "Swimming pool",
    description:
      "Cool off and unwind in our pool after a long day of travel or meetings.",
    image: "/images/marcelo-uva-n2v3lTWy74Y-unsplash.jpg",
  },
  {
    icon: Presentation,
    title: "Conference facilities",
    description:
      "Meeting rooms and halls with a projector, screen, sound system, and catering.",
    image: "/images/ballroom.jpg",
    wide: true,
  },
  {
    icon: ConciergeBell,
    title: "24-hour reception",
    description:
      "Our front desk is always open to help with check-in and requests.",
    image: "/images/dylan-calluy-8BYahZcwYgI-unsplash.jpg",
  },
  {
    icon: Car,
    title: "Free parking",
    description:
      "Safe, ample parking for guests, families, and conference attendees.",
    image: "/images/sven-mieke-lOgR82HSQKM-unsplash.jpg",
  },
  {
    icon: Dumbbell,
    title: "Fitness room",
    description:
      "A well-equipped space to keep up your routine while you're away.",
    image: "/images/danielle-cerullo-CQfNt66ttZM-unsplash.jpg",
  },
  {
    icon: Shirt,
    title: "Laundry service",
    description:
      "Same-day laundry and pressing on request, handy for longer stays.",
    image: "/images/oli-woodman-f4jsI88K7ds-unsplash.jpg",
  },
  {
    icon: Plane,
    title: "Airport transfers",
    description:
      "Pickup and drop-off arranged on request, so you arrive stress-free.",
    image: "/images/rocker-sta-RSYBi_1fhfM-unsplash.jpg",
  },
];

export default function Amenities() {
  return (
    <section id="amenities" className="bg-stone-100 px-5 py-16 text-stone-900">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <h2 className="mb-3 text-3xl font-bold sm:text-4xl">
          Hotel amenities
        </h2>
        <p className="leading-relaxed text-stone-600">
          Everything you need for a comfortable stay, whether you're here for
          business, a family holiday, or a quiet weekend away.
        </p>
      </div>

      <ul className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {amenities.map(({ icon: Icon, title, description, image, wide }) => (
          <li
            key={title}
            className={`group relative h-72 overflow-hidden rounded-xl bg-stone-800 shadow-md ${
              wide ? "lg:col-span-2" : ""
            }`}
          >
            <img
              src={image}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Gradient keeps the text readable on any photo */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />

            <span className="absolute top-4 left-4 flex h-11 w-11 items-center justify-center rounded-full bg-orange-700 text-white shadow-md">
              <Icon size={22} aria-hidden="true" />
            </span>

            <div className="absolute inset-x-0 bottom-0 p-5 text-amber-50">
              <h3 className="mb-1 text-xl font-semibold">{title}</h3>
              <p className="max-w-md text-sm leading-relaxed text-amber-100/85">
                {description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
