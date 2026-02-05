import { BsTwitterX } from "react-icons/bs";
import { FaFacebook, FaLinkedinIn } from "react-icons/fa6";
import { LuInstagram } from "react-icons/lu";

import award1 from "../assets/awards/award1.png";
import award2 from "../assets/awards/award2.png";
import award3 from "../assets/awards/award3.png";
import award4 from "../assets/awards/award4.png";
import award5 from "../assets/awards/award5.png";
import award6 from "../assets/awards/award6.png";
import award7 from "../assets/awards/award7.png";
import award8 from "../assets/awards/award8.png";
import MotionFrame from "./MotionFrame";

const defaultServices = [
  { id: 1, name: "Advertising" },
  { id: 2, name: "Events" },
  { id: 3, name: "Registration Systems" },
];

function Footer() {
  const awardLogos = [
    award1,
    award2,
    award3,
    award4,
    award5,
    award6,
    award7,
    award8,
  ];
  const services = defaultServices;

  return (
    <footer className="bg-[#011936] px-6 py-12 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[2.2fr_0.9fr_0.9fr]">
        {/* Brand & Awards */}
        <MotionFrame direction="left">
          <div>
            <h2
              className="mb-15 text-4xl font-black"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              pureminds
            </h2>
            <p className="mb-6 text-sm">We Win Awards And Get Recognized For</p>
            <div className="mb-15 flex flex-wrap gap-3">
              {awardLogos.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`Award logo ${idx + 1}`}
                  className="h-12 object-contain"
                />
              ))}
            </div>
            <p className="text-xs text-gray-400">
              © 2025 PureMinds. All Rights Reserved
            </p>
          </div>
        </MotionFrame>
        {/* Services */}
        <MotionFrame direction="right">
          <div>
            <h3
              className="mb-4 text-xl font-light uppercase"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Our Service
            </h3>
            <ul className="space-y-2 text-sm">
              {services &&
                services.map((svc: any, i: number) => (
                  <li key={i}>
                    <a
                      href={`/service/${svc.id}`}
                      className="hover:text-white/70 transition-colors"
                    >
                      {svc.name}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </MotionFrame>

        {/* Contact & Social */}
        <MotionFrame direction="right">
          <div className="flex h-full flex-col justify-between space-y-8">
            <div>
              <h3
                className="mb-4 text-xl font-light uppercase"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Get In Touch
              </h3>
              <p className="text-sm">123456789</p>

              <p className="text-sm">hello@puremines.com</p>
              <p className="text-sm">Saudi, Riyadh</p>
            </div>

            <div>
              <h3
                className="mb-4 text-xl font-light uppercase"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Follow Us
              </h3>
              <div className="flex gap-6 text-2xl">
                <a
                  href="https://www.facebook.com/puremindsksa"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <FaFacebook className="text-blue-400 transition-colors duration-200 hover:text-blue-500" />
                </a>
                <a
                  href="https://x.com/puremindsksa"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                >
                  <BsTwitterX className="text-blue-400 transition-colors duration-200 hover:text-black" />
                </a>
                <a
                  href="https://www.instagram.com/puremindsksa"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <LuInstagram className="text-blue-400 transition-colors duration-200 hover:text-pink-700" />
                </a>

                <a
                  href="https://sa.linkedin.com/company/pureminds-agency"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn className="text-blue-400 transition-colors duration-200 hover:text-blue-900" />
                </a>
              </div>
            </div>
          </div>
        </MotionFrame>
      </div>
    </footer>
  );
}

export default Footer;
