import React from "react";
import Navbar from "@/components/fijzi/Navbar";
import Hero from "@/components/fijzi/Hero";
import LatestSingle from "@/components/fijzi/LatestSingle";
import Discography from "@/components/fijzi/Discography";
import SocialLinks from "@/components/fijzi/SocialLinks";
import Footer from "@/components/fijzi/Footer";
import GrainOverlay from "@/components/fijzi/GrainOverlay";
import Cursor from "@/components/fijzi/Cursor";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#070707] text-[#F4F4F1] antialiased">
      <GrainOverlay />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <LatestSingle />
          <Discography />
          <SocialLinks />
        </main>
        <Footer />
      </div>
      <Cursor />
    </div>
  );
}