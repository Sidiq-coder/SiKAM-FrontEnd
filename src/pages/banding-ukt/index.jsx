import useUktAppealStore from '@/stores/useUktAppealStore';
import Form from './components/Form';
import { useEffect, useState } from 'react';
import useAuth from '@/hooks/useAuth';
import { studentsStatus } from '@/utils/users'
import WaitingModal from '../../components/waiting-modal';
import NotVerifiedModal from '../../components/not-verified-modal';
import { useNavigate } from 'react-router-dom';

const BandingUkt = () => {
	const { isPeriodOpen, getStatusUktAppeal } = useUktAppealStore();
	const { user } = useAuth();
	const navigate = useNavigate();
	const [waitingModal, setWaitingModal] = useState(false);
	const [notVerifModal, setNotVerifModal] = useState(false);
	const navBack = (cb) => {
		cb();
		navigate("/", { replace: true });
	}

	useEffect(() => {
		if (user) {
			if (user.status === studentsStatus.WAITING) {
				setWaitingModal(true);
				return;
			}
			if (user.status === studentsStatus.NOT_VERIFIED) {
				setNotVerifModal(true);
				return;
			}
			getStatusUktAppeal();
		}
	}, []);

	return <div className="container mx-auto md:px-10 lg:px-20 px-4 py-8 pb-[120px]">
		{isPeriodOpen ? <Form /> : <PeriodeClosed />}
		<WaitingModal isOpen={waitingModal} closeModal={() => {
			navBack(() => setWaitingModal(false));
		}} />
		<NotVerifiedModal isOpen={notVerifModal} closeModal={() => {
			navBack(() => setNotVerifModal(false));
		}} />
	</div>;
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
