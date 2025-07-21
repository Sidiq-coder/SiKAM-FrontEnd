import { FileQuestionMark, ArrowUpToLine} from "lucide-react";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
export default function Formulir() {
  const ref = useRef(null);
  const handleChevronClick = () => {
    nameInputRef.current && nameInputRef.current.focus();
  };
  return (
    <div className="bg-white w-[65%] mx-auto mt-10 rounded-lg">
        <div id="heading" className="flex items-center justify-between p-5">
            <FontAwesomeIcon icon={faChevronLeft} className="hover:opacity-80 cursor-pointer p-2"/>
            <h1 className="uppercase text-2xl font-bold text-center text-[#2A2A2A]">
                banding ukt
            </h1>
            <FileQuestionMark className="text-[#EE4848]"/>
        </div>

        <div id="formulir" className="p-5">
            <form>
                <div className="mb-4">
                    <label className="block capitalize  text-gray-700 text-sm font-semibold mb-2" htmlFor="semester">
                        semester mahasiswa <span className="text-[#EE4848]">*</span>
                    </label>
                    <input
                        type="text"
                        ref={ref}
                        id="semester"
                        className="shadow appearance-none border border-[#ACACAC] rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-[#ACACAC] focus:shadow-outline"
                        placeholder="isi dengan tingkat semester anda"
                    />
                </div>

              {/* File Section */}
                <FileInput 
                    label="Fotocopy KTM"
                />

                <FileInput 
                    label="Fotocopy Bukti Pemayaran UKT (Legalisir)"
                />

                <FileInput 
                    label="Fotocopy Transkrip Semester Terakhir (Legalisir)"
                />
                
                <FileInput 
                    label="Surat Keterangan Bencana Alam/non-Alam"
                />

                {/* Tipe Bencana */}
                <OneRadioOnly />

                <button
                    type="submit"
                    className="text-white bg-[#0E50A0] hover:opacity-80 cursor-pointer transition-all transition-duration-500 w-full py-2 rounded-lg"
                >
                    Submit Banding
                </button>
            </form>
        </div>
    </div>
  );
}

const OneRadioOnly = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold text-gray-700">Tipe Bencana <span className="text-[#EE4848]">*</span></h3>

      <label className="block mb-2">
        <input
          type="radio"
          name="Bencana"
          value="Bencana Alam"
          checked={selectedOption === 'Bencana Alam'}
          onChange={handleChange}
        />
        <span className="ml-2">Bencana Alam</span>
      </label>

      <label className="block mb-2">
        <input
          type="radio"
          name="bencana"
          value="Bencana non - Alam"
          checked={selectedOption === 'Bencana non - Alam'}
          onChange={handleChange}
        />
        <span className="ml-2">Bencana non - Alam</span>
      </label>

      <p className="mt-4">Selected: {selectedOption || 'None'}</p>
    </div>
  );
};

const FileInput = ({label}) => {
    return(
        <div className="mb-6">
            <label className="block capitalize text-sm font-semibold text-gray-700" htmlFor="ktm">
                    {label} <span className="text-[#EE4848]">*</span>
            </label>
            <label className="block text-[#2A2A2A] opacity-50 mb-2" htmlFor="ktm">
                Upload file dalam bentuk pdf
            </label>
            <div className="flex items-center justify-center w-fit px-2 py-1 gap-2 border border-[#ACACAC] rounded-md hover:bg-[#dfdfdf] cursor-pointer transition-all transition-duration-500 transition">
            <ArrowUpToLine className="text-[#0B4D9B] w-4"/>
            <input
                type="file"
                id="ktm"
                className="hidden"
                placeholder=""
            />
            <h1 className="text-[.8rem] font-medium">Tambahkan File</h1>
            </div>
        </div>
    )
}