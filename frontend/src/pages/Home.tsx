import { Suspense } from "react";
import Header from "../components/Header";
import VideoHero from "../components/VideoHero";
import HeroB from "../components/HeroB";
import ServicesSection from "../components/ServicesSection";
import CategoryReveal from "../components/CategoryReveal";
import HorizontalScroll from "../components/HorizontalScroll";
import PhilosophySection from "../components/PhilosophySection";
import MaskReveal from "../components/MaskReveal";
import Footer from "../components/Footer";

const Home = () => {
  // Use hardcoded services data for now
  const services = [
    {
      title: "AI Solutions",
      description:
        "Cutting-edge artificial intelligence and machine learning solutions to transform your business.",
    },
    {
      title: "Interactive Experiences",
      description:
        "Immersive digital experiences that engage and captivate your audience.",
    },
    {
      title: "Events",
      description:
        "Memorable event production and management that leaves a lasting impression.",
    },
    {
      title: "Campaigns",
      description:
        "Strategic marketing campaigns that drive results and amplify your brand.",
    },
    {
      title: "Photo & Videography",
      description:
        "Professional visual storytelling through stunning photography and cinematography.",
    },
  ];

  const servicesIntro =
    "Welcome to PureMinds, a leading media production company dedicated to creating captivating visual experiences.";
  const servicesHeading = "Our Services";
  const servicesPrimary = [
    { title: "Exhibition & Event", color: "bg-[#B68CF5]" },
    { title: "Advertising Campaigns", color: "bg-[#F5C96B]" },
  ];
  const servicesSecondary = [
    { text: "Brand Identity", color: "bg-[#F5C96B]" },
    { text: "Film Production", color: "bg-[#0598DC]" },
    { text: "Strategies & Consulting", color: "bg-[#B68CF5]" },
    { text: "Creative Solutions", color: "bg-[#E95C58]" },
    { text: "Digital Marketing", color: "bg-[#111827]" },
    { text: "Event & Entertainment", color: "bg-[#41C47A]" },
  ];

  return (
    <Suspense
      fallback={
        <div style={{ color: "white", padding: "20px" }}>Loading...</div>
      }
    >
      <div className="bg-white text-[#011936]">
        <Header />
        <VideoHero />
        <HeroB />
        <ServicesSection
          intro={servicesIntro}
          heading={servicesHeading}
          primary={servicesPrimary}
          secondary={servicesSecondary}
        />
        <CategoryReveal />
        <HorizontalScroll items={services} />
        <PhilosophySection />
        <MaskReveal />
        <Footer />
      </div>
    </Suspense>
  );
};

export default Home;
