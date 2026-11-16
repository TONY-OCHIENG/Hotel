import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { MapPin, Phone, Mail, Clock, Check } from "lucide-react";

// Paste the "src" URL from Google Maps > Share > Embed a map.
// Leave it empty to show a placeholder instead of a map.
const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d31912.75836903246!2d35.864576!3d-1.0911743999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2ske!4v1794810947282!5m2!1sen!2ske";

const contactDetails = [
  {
    icon: MapPin,
    title: "Visit us",
    lines: ["Your street address", "City, Kenya"],
  },
  {
    icon: Phone,
    title: "Call us",
    lines: ["+254 700 000 000"],
    href: "tel:+254700000000",
  },
  {
    icon: Mail,
    title: "Email us",
    lines: ["info@marahotel.com"],
    href: "mailto:info@marahotel.com",
  },
  {
    icon: Clock,
    title: "Reception hours",
    lines: ["Open 24 hours, every day"],
  },
];

const subjects = [
  "General enquiry",
  "Room booking",
  "Conference or event",
  "Dining reservation",
  "Feedback",
  "Other",
];

type FormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  subject: subjects[0],
  message: "",
};

const inputClass =
  "w-full rounded-lg border border-stone-300 bg-white px-3 py-2.5 text-stone-900 placeholder:text-stone-400 focus:border-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-700/30";

export default function Contact() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.message.trim().length < 10) {
      setError("Please write a message of at least 10 characters.");
      return;
    }

    // TODO: send `form` to your backend or email service here.
    console.log("Contact message:", form);
    setSubmitted(true);
  };

  const handleReset = () => {
    setForm(initialForm);
    setSubmitted(false);
    setError("");
  };

  return (
    <section id="contact" className="bg-stone-100 px-5 py-20 text-stone-900">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <h2 className="mb-3 text-3xl font-bold sm:text-4xl">Get in touch</h2>
        <p className="leading-relaxed text-stone-600">
          Have a question or ready to plan your stay? Send us a message or
          reach us directly, and our team will get back to you.
        </p>
      </div>

      {/* Contact details */}
      <ul className="mx-auto mb-10 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {contactDetails.map(({ icon: Icon, title, lines, href }) => (
          <li
            key={title}
            className="flex items-start gap-4 rounded-xl bg-white p-5 shadow-md"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-700">
              <Icon size={22} aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-semibold">{title}</h3>
              {lines.map((line) =>
                href ? (
                  <a
                    key={line}
                    href={href}
                    className="block text-sm text-stone-600 hover:text-orange-700"
                  >
                    {line}
                  </a>
                ) : (
                  <p key={line} className="text-sm text-stone-600">
                    {line}
                  </p>
                )
              )}
            </div>
          </li>
        ))}
      </ul>

      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
        {/* Contact form */}
        <div className="rounded-xl bg-white p-6 shadow-md sm:p-8">
          {submitted ? (
            <div role="status" className="py-10 text-center">
              <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-orange-700">
                <Check size={28} aria-hidden="true" />
              </span>
              <h3 className="mb-2 text-xl font-semibold">Message sent</h3>
              <p className="mb-6 leading-relaxed text-stone-600">
                Thank you, {form.name}. We've received your message and will
                reply to {form.email} as soon as we can.
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="rounded-lg border border-orange-700 px-5 py-2.5 font-semibold text-orange-700 transition-colors hover:bg-orange-50"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <h3 className="text-2xl font-semibold">Send us a message</h3>
                <p className="text-sm text-stone-600">
                  We usually reply within one business day.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="mb-1 block text-sm font-medium">
                    Full name
                  </label>
                  <input
                    id="contact-name"
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
                  <label htmlFor="contact-phone" className="mb-1 block text-sm font-medium">
                    Phone <span className="text-stone-500">(optional)</span>
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+254 700 000 000"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-email" className="mb-1 block text-sm font-medium">
                  Email
                </label>
                <input
                  id="contact-email"
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
                <label htmlFor="contact-subject" className="mb-1 block text-sm font-medium">
                  Subject
                </label>
                <select
                  id="contact-subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className={inputClass}
                >
                  {subjects.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="contact-message" className="mb-1 block text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  required
                  value={form.message}
                  onChange={handleChange}
                  placeholder="How can we help?"
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
                Send message
              </button>
            </form>
          )}
        </div>

        {/* Map */}
        <div className="min-h-80 overflow-hidden rounded-xl bg-stone-200 shadow-md">
          {MAP_EMBED_URL ? (
            <iframe
              title="Mara Hotel location map"
              src={MAP_EMBED_URL}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-80 w-full border-0"
            />
          ) : (
            <div className="flex h-full min-h-80 flex-col items-center justify-center gap-2 p-6 text-center text-stone-600">
              <MapPin size={32} aria-hidden="true" />
              <p className="font-medium">Map coming soon</p>
              <p className="text-sm">
                Add your Google Maps embed link in <code>MAP_EMBED_URL</code> to
                show the hotel's location here.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
