import FilterButton from '../../../components/filter-button';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faArrowUp, faSearch, faDownload, faFile } from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react';
import Button from '../../../components/button';
import { beritaTerbaru } from '../../../mocks/advikaMock';
import { NavLink } from 'react-router-dom';

export default function AdminAdvika() {
	const [selectedFilter, setSelectedFilter] = useState('Terbaru');
	const searchInputRef = useRef(null);

	return (
		<div className="px-10 md:px-20 lg:px-32 pb-1 pt-10">
			<div className="flex gap-34">
				<h1 className="capitalize font-bold text-dark text-3xl">daftar berita</h1>
				<div className="flex gap-4">
					<FilterButton options={['Terbaru', 'Popularitas']} selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />
					<Button href={`/admin/buatAdvika`} label={`Buat Berita`} className={`bg-[#007BFF] text-white h-10 flex items-center w-36`} icon={<FontAwesomeIcon icon={faPlus} />} />
				</div>
			</div>
			{/* Ubah flex menjadi grid di sini */}
			<div className="grid grid-cols-[65%_35%] gap-8 w-full mt-6">
				{/* News Section di kiri (70%) */}
				<div>
					<News className="" />
				</div>
				{/* Halo di kanan (30%) */}
				<div className="flex flex-col gap-12">
					<div className="rounded-[8px] border-[1.5px] border-[#ACACAC] flex items-center gap-2 p-2 w-full max-w-xs bg-white">
						<FontAwesomeIcon icon={faSearch} className="text-[#ACACAC] w-5 h-5 cursor-pointer" onClick={() => searchInputRef.current && searchInputRef.current.focus()} />
						<input ref={searchInputRef} type="search" placeholder="cari berita" className="bg-transparent outline-none border-none w-full text-sm text-dark placeholder-[#ACACAC] shadow-2xl" />
					</div>

					<div className="border-[#ACACAC] rounded-[8px] w- p-4 shadow hover:shadow-2xl transition-duration-500 cursor-pointer transition-all ">
						<div className="flex justify-center items-center w-full">
							<h1 className="font-bold text-2xl capitalize text-center">berdasarkan status</h1>
						</div>

						<div className="flex flex-col gap-4 mt-10">
							<Button
								href={`#`}
								label={`Publish`}
								className={`bg-[#ED9E31] text-xs text-white h-8 flex items-center hover:opacity-80 w-26`}
								icon={<FontAwesomeIcon icon={faDownload} flip="vertical" />}
							/>

							<Button href={`#`} label={`Draft`} className={`bg-[#ED9E31] text-xs text-white h-8 flex items-center w-26 hover:opacity-80`} icon={<FontAwesomeIcon icon={faFile} flip="vertical" />} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
	const getPages = () => {
		const pages = [];
		if (totalPages <= 5) {
			for (let i = 1; i <= totalPages; i++) pages.push(i);
		} else {
			if (currentPage <= 3) {
				pages.push(1, 2, 3, 4, '...', totalPages);
			} else if (currentPage >= totalPages - 2) {
				pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
			} else {
				pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
			}
		}
		return pages;
	};
	return (
		<div className="flex items-center justify-center gap-2 mt-6">
			<button
				className="w-10 h-10 rounded-lg bg-indigo-200 text-gray-700 hover:bg-indigo-300 transition disabled:opacity-50"
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
			>
				&lt;
			</button>
			{getPages().map((page, idx) =>
				page === '...' ? (
					<span key={idx} className="w-10 h-10 flex items-center justify-center text-lg text-gray-400">
						...
					</span>
				) : (
					<button
						key={page}
						className={`w-10 h-10 rounded-lg ${page === currentPage ? 'bg-indigo-700 text-white' : 'bg-indigo-200 text-gray-700 hover:bg-indigo-300'} text-lg font-medium transition`}
						onClick={() => onPageChange(page)}
					>
						{page}
					</button>
				)
			)}
			<button
				className="w-10 h-10 rounded-lg bg-indigo-200 text-gray-700 hover:bg-indigo-300 transition disabled:opacity-50"
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
			>
				&gt;
			</button>
		</div>
	);
};

const News = ({ className }) => {
	// Pagination logic
	const [page, setPage] = useState(1);
	const perPage = 9;
	const totalPages = Math.ceil(beritaTerbaru.length / perPage);
	const data = beritaTerbaru.slice((page - 1) * perPage, page * perPage);
	const repeatTimes = 1;
	const repeatedMock = Array.from({ length: repeatTimes }).flatMap(() => data);

	return (
		<div className={`${className}`}>
			<div className="bg-[#0B4D9B] text-white px-[.5rem] text-[1.2rem] tracking-tighter rounded-[3px] hover:opacity-80 transition-all duration-500 ease-in-out mt-[2rem] mb-[1.6rem] cursor-pointer w-fit"></div>

			<div>
				{repeatedMock.map((item, index) => (
					<div
						key={`${item.id}-${index}`}
						className="flex flex-col lg:flex-row items-start gap-4 p-4 rounded-xl cursor-pointer shadow hover:shadow-lg hover:brightness-95 transition duration-300 mb-3"
					>
						{/* Image Section */}
						<NavLink to={item.link} target="_blank" className="w-full lg:w-[260px] h-[180px] rounded-lg overflow-hidden flex-shrink-0 block">
							<img src={item.imagePath} alt={item.title} className="w-full h-full object-cover" />
						</NavLink>

						{/* Text Content Section */}
						<div className="flex flex-col justify-between w-full">
							<div>
								<h3 className="text-xl font-bold text-dark mb-2">{item.title}</h3>
								<p className="text-sm text-gray-600 line-clamp-3">{item.description}</p> <span className="text-black text-sm">(Click to see more)</span>
							</div>
							<p className="text-sm text-gray-500">
								<span>{item.date}</span>
							</p>
							<div className="flex items-center gap-1">
								<FontAwesomeIcon icon={faArrowUp} color="#007BFF" width={`20`} />
								<span className="capitalize">publish</span>
							</div>
						</div>
					</div>
				))}
			</div>

			<div className="flex flex-row">
				<Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
			</div>
		</div>
	);
};
