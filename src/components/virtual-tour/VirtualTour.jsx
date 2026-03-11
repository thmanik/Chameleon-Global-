"use client";

import React, { useEffect, useState, useRef } from "react";
import Script from "next/script";
import { Store, ShoppingBag, User } from "lucide-react";
import TourSidebar from "./TourSidebar";
import TourControls from "./TourControls";
import Loading from "../ui/Loading";

const VirtualTour = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const viewerRef = useRef(null);

  const rooms = {
    main_lobby: {
      id: "main_lobby",
      name: "Main Showroom",
      image: "/clothing-store2.jpg",
      icon: <Store size={18} />,
      hotspots: [
        { pitch: -10, yaw: 170, target: "mens_wear", text: "Go to Menswear" }
      ]
    },
    mens_wear: {
      id: "mens_wear",
      name: "Mens Collection",
      image: "/clothing-store.jpg",
      icon: <User size={18} />,
      hotspots: [
        { pitch: -5, yaw: 0, target: "womens_lounge", text: "Go to Womens Section" }
      ]
    },
    womens_lounge: {
      id: "womens_lounge",
      name: "Premium Womens",
      image: "/360-image.jpg",
      icon: <ShoppingBag size={18} />,
      hotspots: [
        { pitch: -10, yaw: 90, target: "main_lobby", text: "Return to Entrance" }
      ]
    }
  };

  const [activeRoom, setActiveRoom] = useState(rooms.main_lobby);

  useEffect(() => {
    const handleResize = () => {
      setIsMenuOpen(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const loadPanorama = (roomKey) => {
    const selectedRoom = rooms[roomKey];
    setActiveRoom(selectedRoom);
    
    if (window.innerWidth < 768) setIsMenuOpen(false);

    if (window.pannellum) {
      if (viewerRef.current) viewerRef.current.destroy();

      viewerRef.current = window.pannellum.viewer("panorama-container", {
        type: "equirectangular",
        panorama: selectedRoom.image,
        autoLoad: true,
        showControls: false,
        autoRotate: -1.5,
        autoRotateInactivityDelay: 3000,
        mouseZoom: false,
        doubleClickZoom: true,
        hotSpots: selectedRoom.hotspots.map(spot => ({
          pitch: spot.pitch,
          yaw: spot.yaw,
          type: "scene",
          text: spot.text,
          cssClass: "custom-hotspot", 
          clickHandlerFunc: () => loadPanorama(spot.target)
        }))
      });
    }
  };

  useEffect(() => {
    if (isLoaded) loadPanorama("main_lobby");
  }, [isLoaded]);

  return (
    <section className="py-3 bg-white overflow-hidden">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css" />
      <Script 
        src="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js" 
        onLoad={() => setIsLoaded(true)} 
      />

      <div className="w-full mx-auto">
        
         <div className=" px-1 md:px-3">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold leading-tight text-secondary">
              Virtual <span className="text-primary">Showroom</span>
            </h2>
            <p className="mt-3 text-xs md:text-sm text-gray-500 font-medium tracking-wide">
             Explore our collection in 360°
            </p>
          </div>

        <div className="relative h-[500px] md:h-[550px] w-full border-[4px] md:border-[8px] border-white overflow-hidden rounded bg-black
          [&_.custom-hotspot]:!bg-primary/80 [&_.custom-hotspot]:!border-2 [&_.custom-hotspot]:!border-white [&_.custom-hotspot]:!w-10 md:[&_.custom-hotspot]:!w-14 [&_.custom-hotspot]:!h-10 md:[&_.custom-hotspot]:!h-14 [&_.custom-hotspot]:!rounded-full [&_.custom-hotspot]:!flex [&_.custom-hotspot]:!items-center [&_.custom-hotspot]:!justify-center [&_.custom-hotspot]:after:content-['➜'] [&_.custom-hotspot]:after:text-white [&_.custom-hotspot]:hover:!scale-110 [&_.custom-hotspot]:!transition-all">
          
          <TourSidebar 
            rooms={rooms} 
            activeRoom={activeRoom} 
            isMenuOpen={isMenuOpen} 
            onRoomChange={loadPanorama} 
          />

          <TourControls 
            isMenuOpen={isMenuOpen} 
            setIsMenuOpen={setIsMenuOpen} 
          />

          <div id="panorama-container" className="w-full h-full cursor-move"></div>

          {!isLoaded && (
            <div>
              <Loading text="Rendering Showroom..."/>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default VirtualTour;