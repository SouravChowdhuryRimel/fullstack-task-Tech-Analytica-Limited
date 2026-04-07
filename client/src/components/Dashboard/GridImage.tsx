import React from "react";
import EventOne from "@/assets/images/serviceOne.jpg";
import EventTow from "@/assets/images/serviceTwo.jpg";
import EventThree from "@/assets/images/serviceThree.jpg";
import EventFour from "@/assets/images/serviceFour.jpg";
import EventFive from "@/assets/images/serviceFive.jpg";
import EventSix from "@/assets/images/serviceSix.jpg";
const GridImage = () => {
  // const [tabChange] = useState<boolean>(true);
  const event = [
    {
      eventTitle: "Tech Innovators Summit 2025",
      eventOwner: "InnovateX",
      image: EventOne,
    },
    {
      eventTitle: "Global Health Conference",
      eventOwner: "MediWorld",
      image: EventTow,
    },
    {
      eventTitle: "Startup Launchpad Expo",
      eventOwner: "FoundersHub",
      image: EventThree,
    },
    {
      eventTitle: "Creative Design Workshop",
      eventOwner: "DesignSpark",
      image: EventFour,
    },
    {
      eventTitle: "AI & Future Tech Forum",
      eventOwner: "NeuroNext",
      image: EventFive,
    },
    {
      eventTitle: "Green Earth Sustainability Fair",
      eventOwner: "EcoVerse",
      image: EventSix,
    },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {event?.map((data, index) => (
        <div
          key={index}
          style={{
            backgroundImage: `url(${data?.image.src})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            fontFamily: "var(--font-roboto)",
          }}
          className="relative group w-full sm:max-w-[450px] h-[200px] overflow-hidden rounded-lg"
        >
          <div className="absolute inset-0 bg-black/50 group-hover:bg-transparent bg-opacity-50 brightness-75 group-hover:brightness-100 transition-all duration-500" />

          <div className="relative z-10 p-4 text-white transition-opacity duration-500 group-hover:opacity-0">
            <h1 className="text-xl sm:text-2xl font-medium font-Pop">
              {data.eventTitle}
            </h1>
            <p className="text-sm text-[var(--color-secondary)] bg-white/5 inline-block font-Robot">
              {data.eventOwner}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GridImage;
