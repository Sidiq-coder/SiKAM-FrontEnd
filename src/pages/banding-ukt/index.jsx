import useUktAppealStore from '@/stores/useUktAppealStore';
import Form from './components/Form';
import { useEffect } from 'react';

const BandingUkt = () => {
	const { isPeriodOpen, getStatusUktAppeal } = useUktAppealStore();

	useEffect(() => {
		getStatusUktAppeal();
	}, []);

	return <div className="container mx-auto md:px-10 lg:px-20 px-4 py-8 pb-[120px]">{isPeriodOpen ? <Form /> : <PeriodeClosed />}</div>;
};

export default BandingUkt;

const PeriodeClosed = () => {
	return (
		<div className="mx-auto bg-white text-dark rounded-2xl px-12 pt-8 pb-12 w-full max-w-5xl space-y-8">
			<img src="/images/artboard-2.png" className="mx-auto" />
			<div className="flex flex-col items-center mt-2">
				<h1 className="font-extrabold text-4xl">Periode Banding UKT</h1>
				<h1 className="font-extrabold text-4xl">Belum dibuka</h1>
			</div>
			<p className="text-[#ACACAC] text-center mt-2">
				Sistem pengajuan banding UKT belum tersedia saat ini. Silakan cek kembali <br />
				secara berkala atau pantau informasi terbaru dari akademik.
			</p>
		</div>
	);
};
