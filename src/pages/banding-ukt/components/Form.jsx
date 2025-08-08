import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FileQuestionMark, ArrowUpToLine } from 'lucide-react';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import { createUktAppealSchema } from '../schema';
import useUktAppealStore from '@/stores/useUktAppealStore';
import useProfilStore from '@/stores/useProfilStore';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Form() {
	const navigate = useNavigate();
	const { createUktAppeal, clearError, error } = useUktAppealStore();
	const { setProfilMenu } = useProfilStore();

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm({
		resolver: zodResolver(createUktAppealSchema),
		mode: 'onChange',
	});

	const onSubmit = async (data) => {
		try {
			const result = await createUktAppeal(data);

			if (result?.data?.success) {
				toast.success('Berhasil mengirimkan banding');
				clearError();
			}
		} catch (error) {
			toast.error('Terjadi kesalahan saat mengirimkan banding');
			console.error('error:', error);
		}
	};

	useEffect(() => {
		if (error) {
			toast.error(error);
			clearError();
		}
	}, [error]);

	return (
		<div className="mx-auto bg-white text-dark rounded-2xl px-12 pt-8 pb-12 w-full max-w-5xl">
			<div className="flex items-center justify-between mb-10">
				<FontAwesomeIcon
					icon={faChevronLeft}
					className="hover:opacity-80 cursor-pointer p-2"
					onClick={() => {
						setProfilMenu('banding');
						navigate('/profil');
					}}
				/>
				<h1 className="uppercase text-2xl font-bold text-center text-dark">banding ukt</h1>
				<FileQuestionMark className="text-red" />
			</div>

			<form onSubmit={handleSubmit(onSubmit)}>
				{/* Semester */}
				<div className="mb-4">
					<label htmlFor="semester" className="block capitalize text-gray-700 text-sm font-semibold mb-2">
						semester mahasiswa <span className="text-red">*</span>
					</label>
					<input
						type="text"
						id="semester"
						{...register('semester')}
						className="shadow appearance-none border border-gray rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-gray focus:shadow-outline"
						placeholder="isi dengan tingkat semester anda"
					/>
					{errors.semester && <p className="text-red text-sm mt-1">{errors.semester.message}</p>}
				</div>

				{/* File Inputs */}
				<FileInput setValue={setValue} label="Fotocopy KTM" name="ktm" error={errors.ktm} />
				<FileInput setValue={setValue} label="Fotocopy Bukti Pemayaran UKT (Legalisir)" name="ukt_proof" error={errors.ukt_proof} />
				<FileInput setValue={setValue} label="Fotocopy Transkrip Semester Terakhir (Legalisir)" name="transcript" error={errors.transcript} />
				<FileInput setValue={setValue} label="Surat Keterangan Bencana Alam/non-Alam" name="sk" error={errors.sk} />

				{/* Radio Tipe Bencana */}
				<div className="mb-6">
					<h3 className="mb-2 text-sm font-semibold text-gray-700">
						Tipe Bencana <span className="text-red">*</span>
					</h3>

					<label className="block mb-2">
						<input
							type="radio"
							value="natural"
							className="appearance-none w-4 h-4 rounded-full border-2 border-gray bg-white checked:bg-main-primary checked:border-main-primary transition-colors"
							{...register('problem')}
						/>
						<span className="ml-2">Bencana Alam</span>
					</label>

					<label className="block mb-2">
						<input
							type="radio"
							value="non_natural"
							className="appearance-none w-4 h-4 rounded-full border-2 border-gray bg-white checked:bg-main-primary checked:border-main-primary transition-colors"
							{...register('problem')}
						/>
						<span className="ml-2">Bencana non - Alam</span>
					</label>

					{errors.problem && <p className="text-red text-sm mt-1">{errors.problem.message}</p>}
				</div>

				<button type="submit" className="text-white bg-main-primary hover:opacity-80 cursor-pointer transition-all duration-500 w-full py-2 rounded-lg">
					Submit Banding
				</button>
			</form>
		</div>
	);
}

const FileInput = ({ label, name, error, setValue }) => {
	const inputRef = useRef(null);
	const [fileName, setFileName] = useState('');

	const handleFileClick = () => {
		if (inputRef.current) {
			inputRef.current.click();
		}
	};

	const handleFileChange = (e) => {
		if (e.target.files.length > 0) {
			setFileName(e.target.files[0].name);
			setValue(name, e.target.files[0]);
		}
	};

	return (
		<div className="mb-6">
			<label className="block capitalize text-sm font-semibold text-gray-700" htmlFor={name}>
				{label} <span className="text-red">*</span>
			</label>
			<p className="text-dark text-sm opacity-50 mb-2">Upload file dalam bentuk PDF</p>

			<div className="flex items-center justify-center w-fit px-2 py-1 gap-2 border border-gray rounded-md hover:bg-[#dfdfdf] cursor-pointer transition-all duration-500" onClick={handleFileClick}>
				<ArrowUpToLine className="text-main-primary w-4" />
				<h1 className="text-[.8rem] font-medium">Tambahkan File</h1>
			</div>

			<input
				type="file"
				id={name}
				accept="application/pdf"
				ref={(e) => {
					inputRef.current = e;
				}}
				onChange={(e) => {
					handleFileChange(e);
				}}
				className="hidden"
			/>

			{fileName && <p className="text-sm mt-2 text-gray-600 italic">File dipilih: {fileName}</p>}

			{error && <p className="text-red text-sm mt-1">{error.message}</p>}
		</div>
	);
};
