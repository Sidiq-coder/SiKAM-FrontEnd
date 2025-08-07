import { usePeriodStore } from '../../components/zustand/period-banding-ukt/usePeriodStore';
import Form from './components/Form';

const BandingUkt = () => {
	const isPeriodOpen = usePeriodStore((state) => state.isPeriodOpen);

	return <div className="container mx-auto md:px-10 lg:px-20 px-4 py-8 pb-[120px]">{isPeriodOpen ? <Form /> : <PeriodeClosed />}</div>;
};

export default BandingUkt;

const PeriodeClosed = () => {
	return (
		<div className="mx-auto bg-white text-dark rounded-2xl px-12 pt-8 pb-12 w-full max-w-5xl">
			<img src="/images/artboard-2.png" />
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
