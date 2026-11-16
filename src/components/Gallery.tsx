import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

type Category = "Rooms" | "Dining" | "Conference" | "Hotel";

type GalleryImage = {
  id: number;
  src: string;
  alt: string;
  category: Category;
};

const images: GalleryImage[] = [
  { id: 1, src: "/images/standard.jpg", alt: "Standard Room with a queen bed", category: "Rooms" },
  { id: 2, src: "/images/delux.jpeg", alt: "Deluxe Room with a sitting area", category: "Rooms" },
  { id: 3, src: "/images/executive.jpeg", alt: "Executive Room lounge and work desk", category: "Rooms" },
  { id: 4, src: "/images/family.jpg", alt: "Family Room with a king bed and twin beds", category: "Rooms" },
  { id: 5, src: "/images/breakfirst.jpeg", alt: "Breakfast buffet spread", category: "Dining" },
  { id: 6, src: "/images/diningarea.jpg", alt: "The Mara Restaurant dining area", category: "Dining" },
  { id: 7, src: "/images/balazs-7ors4WLn8_U-unsplash.jpg", alt: "Garden Bar in the evening", category: "Dining" },
  { id: 8, src: "/images/boardroom.jpeg", alt: "Boardroom set for a meeting", category: "Conference" },
  { id: 9, src: "/images/hall3.jpeg", alt: "Mara Hall set up for a workshop", category: "Conference" },
  { id: 10, src: "/images/ballroom.jpg", alt: "Grand Ballroom set for an event", category: "Conference" },
  { id: 11, src: "/images/valeriia-bugaiova-_pPHgeHz1uk-unsplash.jpg", alt: "Mara Hotel exterior", category: "Hotel" },
  { id: 12, src: "/images/dylan-calluy-8BYahZcwYgI-unsplash.jpg", alt: "Mara Hotel reception and lobby", category: "Hotel" },
];

const categories: ("All" | Category)[] = [
  "All",
  "Rooms",
  "Dining",
  "Conference",
  "Hotel",
];

export default function Gallery() {
  const [active, setActive] = useState<"All" | Category>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  const visible = useMemo(
    () => (active === "All" ? images : images.filter((i) => i.category === active)),
    [active]
  );

  const isOpen = lightboxIndex !== null;
  const current = lightboxIndex !== null ? visible[lightboxIndex] : null;

  const openLightbox = (index: number) => {
    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    setLightboxIndex(index);
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    lastFocusedRef.current?.focus();
  }, []);

  const showPrev = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? i : (i - 1 + visible.length) % visible.length
    );
  }, [visible.length]);

  const showNext = useCallback(() => {
    setLightboxIndex((i) => (i === null ? i : (i + 1) % visible.length));
  }, [visible.length]);

  // Keyboard controls, scroll lock, and focus while the lightbox is open
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, closeLightbox, showPrev, showNext]);

  const handleFilter = (category: "All" | Category) => {
    setActive(category);
    setLightboxIndex(null);
  };

  return (
    <section id="gallery" className="bg-stone-100 px-5 py-20 text-stone-900">
      <div className="mx-auto mb-8 max-w-2xl text-center">
        <h2 className="mb-3 text-3xl font-bold sm:text-4xl">Our gallery</h2>
        <p className="leading-relaxed text-stone-600">
          Take a look around Mara Hotel, from our rooms and restaurant to our
          conference spaces and grounds.
        </p>
      </div>

      {/* Category filter */}
      <div
        className="mx-auto mb-8 flex max-w-6xl flex-wrap justify-center gap-2"
        role="group"
        aria-label="Filter gallery by category"
      >
        {categories.map((category) => {
          const selected = active === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => handleFilter(category)}
              aria-pressed={selected}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900 ${
                selected
                  ? "bg-orange-700 text-white"
                  : "bg-white text-stone-700 hover:bg-orange-100"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Image grid */}
      <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {visible.map((image, index) => (
          <li key={image.id}>
            <button
              type="button"
              onClick={() => openLightbox(index)}
              aria-label={`View larger: ${image.alt}`}
              className="group relative block aspect-[4/3] w-full overflow-hidden rounded-lg bg-stone-200 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700"
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/40 group-hover:opacity-100 group-focus-visible:bg-black/40 group-focus-visible:opacity-100">
                <ZoomIn className="text-white" size={28} aria-hidden="true" />
              </span>
            </button>
          </li>
        ))}
      </ul>

      {/* Lightbox */}
      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4"
          onClick={closeLightbox}
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeLightbox}
            aria-label="Close image viewer"
            className="absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          >
            <X size={24} aria-hidden="true" />
          </button>

          {visible.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showPrev();
                }}
                aria-label="Previous image"
                className="absolute left-2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white sm:left-6"
              >
                <ChevronLeft size={26} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                aria-label="Next image"
                className="absolute right-2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white sm:right-6"
              >
                <ChevronRight size={26} aria-hidden="true" />
              </button>
            </>
          )}

          <figure
            className="flex max-h-full max-w-5xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={current.src}
              alt={current.alt}
              className="max-h-[78vh] w-auto max-w-full rounded-lg object-contain"
            />
            <figcaption className="mt-3 text-center text-sm text-stone-200">
              {current.alt}
              <span className="ml-2 text-stone-400">
                {(lightboxIndex ?? 0) + 1} / {visible.length}
              </span>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
