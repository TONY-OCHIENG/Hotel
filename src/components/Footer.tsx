import { Mail, MapPin, Phone } from 'lucide-react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Rooms", href: "#rooms" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Book now", href: "/book" },
];

const socials = [
  { label: "Facebook", icon: FaFacebook, href: "https://facebook.com" },
  { label: "Instagram", icon: FaInstagram,href: "https://instagram.com" },
  { label: "Twitter", icon: FaTwitter, href: "https://twitter.com" },
];

function Footer() {
  return (
     <footer className="bg-[#4d1600]  px-5 pt-14 pb-6 text-amber-50">
                <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <h2 className="mb-3 text-2xl font-bold">Mara Hotel</h2>
                    <p className="leading-relaxed text-amber-100/80">
                      Comfortable rooms, warm hospitality, and attentive service. Come as
                      a guest, leave as family.
                    </p>
                  </div>

                  <nav aria-label="Footer">
                    <h3 className="mb-3 text-lg font-semibold">Quick links</h3>
                    <ul className="space-y-2">
                      {quickLinks.map((link) => (
                        <li key={link.label}>
                          <a
                            href={link.href}
                            className="text-amber-100/80 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>

                  <div>
                    <h3 className="mb-3 text-lg font-semibold">Contact us</h3>
                    <ul className="space-y-3 text-amber-100/80">
                      <li className="flex items-start gap-2">
                        <MapPin size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
                        <span>Your street address, City, Kenya</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Phone size={18} className="shrink-0" aria-hidden="true" />
                        <a href="tel:+254700000000" className="hover:text-white">
                          +254 700 000 000
                        </a>
                      </li>
                      <li className="flex items-center gap-2">
                        <Mail size={18} className="shrink-0" aria-hidden="true" />
                        <a href="mailto:info@marahotel.com" className="hover:text-white">
                          info@marahotel.com
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="mb-3 text-lg font-semibold">Follow us</h3>
                    <ul className="flex gap-3">
                      {socials.map(({ label, icon: Icon, href }) => (
                        <li key={label}>
                          <a
                            href={href}
                            aria-label={label}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-900 transition-colors hover:bg-orange-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200"
                          >
                            <Icon size={18} aria-hidden="true" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mx-auto mt-12 max-w-6xl border-t border-amber-900 pt-6 text-center text-sm text-amber-100/70">
                  © {new Date().getFullYear()} Mara Hotel. All rights reserved.
                </div>
              </footer>
  )
}

export default Footer
