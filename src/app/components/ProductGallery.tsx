"use client";
import Image from "next/image";
import { useState } from "react";

export default function ProductGallery({ src, alt }: { src: string; alt: string }) {
  // simple single-image gallery (can be extended later)
  const [zoom, setZoom] = useState(false);

  return (
    <div className="relative aspect-square overflow-hidden rounded-2xl border bg-white">
      <Image
        src={src}
        alt={alt}
        fill
        priority={false}
        sizes="(max-width: 1024px) 100vw, 50vw"
        className={`object-cover transition-transform duration-300 ${zoom ? "scale-105" : ""}`}
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
      />
    </div>
  );
}
