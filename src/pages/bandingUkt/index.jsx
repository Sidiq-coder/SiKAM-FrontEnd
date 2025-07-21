import { usePeriodStore } from "../../components/zustand/period-banding-ukt/usePeriodStore";
import Formulir from "./components/formulir";
const BandingUkt = () => {
  const isPeriodOpen = usePeriodStore((state) => state.isPeriodOpen);

  // Array pattern untuk background
  const patterns = [
    {
      url: "/images/pattern1-1.png",
      style: { bottom: 0, left: 0, width: 200, height: 200 },
      colour : "0B4A94",
    },
    {
      url: "/images/pattern1-2.png",
      style: { top: 0, right: 0, width: 200, height: 200 },
      colour : "0B4A94",
    },
    {
      url: "/images/pattern2-1.png",
      style: { top: 0, left: 0, width: 200, height: 200 },
      colour : "0B4A94",
    },
    {
      url: "/images/pattern2-2.png",
      style: { bottom: 0, right: 0, width: 200, height: 200 },
      colour : "0B4A94",
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#0E50A0] overflow-hidden">
      {patterns.map((pattern, idx) => (
        <div
        key={idx}
        style={{
            position: "absolute",
            ...pattern.style,
            WebkitMaskImage: `url(${pattern.url})`,
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskSize: "cover",
            backgroundColor: "#0B4A94", // 💙 your desired color
            opacity: 0.5,
            zIndex: 0,
            pointerEvents: "none",
            userSelect: "none",
        }}
        />
      ))}

      {isPeriodOpen ? (
          <Formulir/>
            ) : (
            <PeriodeClosed/>
            )}  
    </div>
  );
};

export default BandingUkt;

const PeriodeClosed = () => {
  return(
    <div className="bg-white w-[65%] mt-10 rounded-lg flex flex-col items-center mx-auto pb-22">
      <img src="/images/artboard-2.png"/>
      <div className="flex flex-col items-center mt-2">
          <h1 className="font-extrabold text-4xl">Periode Banding UKT</h1>  
          <h1 className="font-extrabold text-4xl">Belum dibuka</h1>
      </div>      
      <p className="text-[#ACACAC] text-center mt-2">Sistem pengajuan banding UKT belum tersedia saat ini. Silakan cek kembali <br />secara berkala atau pantau informasi terbaru dari akademik.</p>
    </div>
  )
};