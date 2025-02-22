"use client";

import { cn } from "@/lib/utils";
import { DaftarSekarang } from "@/modules/sekolah/ui/components/hero/daftar-sekarang";
import { HeroCarousel } from "@/modules/sekolah/ui/components/hero/hero-carousel";
import HeroHeader from "@/modules/sekolah/ui/components/hero/hero-header";
import React, { useEffect, useRef, useState } from "react";

// Dynamic Props Type
type SchoolProps = {
  name: string;
  tagline: string;
  logo: string;
  primaryColor?: string;
  highlights: { icon: string; title: string }[];
  programs: { name: string; description: string }[];
  testimonials: { name: string; feedback: string }[];
};

// Dynamic School Home Page
const SchoolHome: React.FC<SchoolProps> = ({
  name,
  tagline,
  logo,
  primaryColor,
  highlights,
  programs,
  testimonials,
}) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  useEffect(() => {
    const currentHeroRef = heroRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsHeroVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    if (currentHeroRef) {
      observer.observe(currentHeroRef);
    }

    return () => {
      if (currentHeroRef) {
        observer.unobserve(currentHeroRef);
      }
    };
  }, []);

  return (
    <div
      className={cn(
        "min-h-screen w-full bg-background pb-[10rem]",
        primaryColor
      )}
    >
      {/* Hero Section */}
      <div ref={heroRef}>
        <HeroHeader name={name} tagline={tagline} logo={logo} />
        <HeroCarousel />
      </div>

      {/* Key Highlights */}
      <section className="py-10 px-5 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {highlights.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <span className="text-3xl">{item.icon}</span>
            <p className="mt-2 text-gray-700 font-medium">{item.title}</p>
          </div>
        ))}
      </section>

      {/* Programs Offered */}
      <section className="py-10 px-5">
        <h2 className="text-xl font-semibold text-center">Programs Unggulan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {programs.map((program, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">{program.name}</h3>
              <p className="text-gray-600 mt-2">{program.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-10 px-5">
        <h2 className="text-xl font-semibold text-center">
          Apa Kata Orang Tua dan Murid Tentang Kami
        </h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600">
                &quot;{testimonial.feedback}&quot;
              </p>
              <h4 className="mt-4 font-semibold text-right">
                - {testimonial.name}
              </h4>
            </div>
          ))}
        </div>
      </section>

      {/* Sticky CTA */}
      {!isHeroVisible && (
        <div className="fixed flex flex-col md:flex-row md:px-8  gap-4 w-full justify-end bottom-4 p-2 rounded-md bg-gray-50 shadow-2xl border-b border-r border-gray-200 z-50">
          <div className="flex flex-col items-center justify-center">
            <h1 className="md:text-xl font-bold mt-2">{name}</h1>
            <p className="text-sm text-gray-700 md:mb-4">{tagline}</p>
          </div>
          <DaftarSekarang className="md:mr-8" />
        </div>
      )}
    </div>
  );
};

// Example Usage (Dynamic Data Passed as Props)
const HomePage = () => {
  return (
    <SchoolHome
      name="ABC International School"
      tagline="Excellence in Education"
      logo="/globe.svg"
      primaryColor="#4CAF50"
      highlights={[
        { icon: "🎓", title: "Kurikulum" },
        { icon: "👩‍🏫", title: "Tenaga Pengajar" },
        { icon: "🏫", title: "Fasilitas" },
        { icon: "Rp.", title: "Pembiayaan" },
      ]}
      programs={[
        {
          name: "Kindergarten",
          description: "Early learning for young minds.",
        },
        {
          name: "Primary",
          description: "Strong foundation for future success.",
        },
        {
          name: "Secondary",
          description: "Advanced learning & skill development.",
        },
      ]}
      testimonials={[
        { name: "John Doe", feedback: "This school changed my child's life!" },
        { name: "Jane Smith", feedback: "Amazing teachers and environment!" },
        { name: "Jane Smith", feedback: "Amazing teachers and environment!" },
        { name: "Jane Smith", feedback: "Amazing teachers and environment!" },
        { name: "Jane Smith", feedback: "Amazing teachers and environment!" },
        { name: "Jane Smith", feedback: "Amazing teachers and environment!" },
      ]}
    />
  );
};

export default HomePage;
