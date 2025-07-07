import { useParams } from "react-router-dom";
import pdf from "../../../public/images/example.pdf";
import {
  mainAdvika, beritaTrending
} from "../../mocks/advikaMock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faFilePdf } from "@fortawesome/free-solid-svg-icons";

export default function DetailAdvika() {
    const params = useParams();

  return (
    <div className="bg-[url('/images/bg-pattern.png')] bg-cover bg-center bg-no-repeat px-10 md:px-20 lg:px-32 pb-1">
    <div className="flex items-center gap-4 mb-8 pt-12 cursor-pointer hover:brightness-10 transition-all duration-500">
        <FontAwesomeIcon icon={faChevronLeft} className="opacity-60"/>
        <h1 className="capitalize text-[#000000] opacity-60 text-xl">advika</h1>
    </div>

    {mainAdvika
    .filter((item) => item.id === Number(params.id))
    .map((item) => (
      <div key={item.id} className="mb-12">
        <h2 className="text-3xl font-bold text-[#2A2A2A] mb-4">{item.title}</h2>
        <p className="text-[#2A2A2A] opacity-80 mb-6"><span className="text-[#0B4D9B]">{item.author}</span> - {item.date}</p>
        <img src={item.imagePath} alt={item.title} className="w-[70%] mx-auto h-auto mb-6 rounded-lg shadow-md" />
        <p className="text-[#2A2A2A] whitespace-pre-line">{item.description}</p>
      </div>
    ))}

    <div className="p-1 bg-[#EE4848] rounded-[5px] w-fit hover:opacity-80 transition-all duration-500 ease-in-out mb-12">
      <FontAwesomeIcon icon={faFilePdf} className="text-white"/>
      <a href={pdf} target="_blank" rel="noopener noreferrer"
        className="text-white"
        download
        title="Download PDF"
      >rsptn.pdf</a>
    </div>

    <hr />

      <div>
        <h1 className="text-white capitalize bg-[#2A2A2A] w-fit p-1 rounded-[4px] my-[1rem]">berita lainnya</h1>
      </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
      {beritaTrending.map((item) => (
        <div key={item.id} className="rounded-lg overflow-hidden hover:shadow-md transition duration-300">
          <img
            src={item.imagePath}
            alt={item.title}
            className="w-full h-[100px] object-cover rounded-lg "
          />
          <div className="p-3">
            <h3 className="text-sm font-semibold text-[#2A2A2A] mb-1 leading-snug">
              {item.title}
            </h3>
            <p className="text-xs text-gray-500">{item.date}</p>
          </div>
        </div>
      ))}
    </div>


    </div>
  );
}