import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problems from "@/components/Problems";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Different from "@/components/Different";
import Packages from "@/components/Packages";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import {
  getHeroVideo,
  getOffer,
  getPackageTiers,
  getPortfolioCategories,
  getTestimonialItems,
  getTestimonialVideos,
} from "@/lib/cms";

// Editable content is re-fetched from Supabase at most every 5 minutes.
export const revalidate = 300;

export default async function Home() {
  const [offer, tiers, testimonialItems, portfolioCategories, heroVideo, testimonialVideos] =
    await Promise.all([
      getOffer(),
      getPackageTiers(),
      getTestimonialItems(),
      getPortfolioCategories(),
      getHeroVideo(),
      getTestimonialVideos(),
    ]);

  return (
    <>
      <Navbar />
      <main>
        <Hero offer={offer} heroVideo={heroVideo} />
        <Problems />
        <Services />
        <Process />
        <Different />
        <Packages tiers={tiers} />
        <Portfolio categories={portfolioCategories} />
        <Testimonials items={testimonialItems} videos={testimonialVideos} />
        <Contact offer={offer} />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
