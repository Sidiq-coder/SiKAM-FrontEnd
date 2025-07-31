import { CalendarDays } from 'lucide-react';
import { Modal } from '@/components/modal';
import useProfilStore from '@/stores/useProfilStore';
import useNotificationStore from '@/stores/useNotificationStore';
import useAuth from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const NotificationItem = ({ type, message, time, isNew }) => {
	return (
		<div className="flex items-start gap-3 py-4">
			<div className="relative">
				<div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 font-bold">{type === 'admin' && 'A'}</div>
				{isNew && <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-blue-500 rounded-full" />}
			</div>
			<div className="flex-1">
				<p className="text-sm font-medium text-dark">{message}</p>
				<div className="flex items-center text-xs text-gray-500 mt-1">
					<CalendarDays className="w-4 h-4 mr-1" />
					<span>27 Jun, 09:20</span>
					<span className="ml-auto">{time}</span>
				</div>
			</div>
		</div>
	);
};

const NotificationList = () => {
	const newNotifications = [
		{
			type: 'admin',
			message: 'Admin menanggapi laporan Anda',
			time: '2 jam lalu',
			isNew: true,
		},
		{
			type: 'admin',
			message: 'Admin meninjau laporan Anda',
			time: '2 jam lalu',
			isNew: true,
		},
	];

	const oldNotifications = [
		{
			type: 'admin',
			message: 'Admin menanggapi laporan Anda',
			time: '2 jam lalu',
		},
		{
			type: 'admin',
			message: 'Admin meninjau laporan Anda',
			time: '2 jam lalu',
		},
	];

	const navigate = useNavigate();
	const { setProfilMenu } = useProfilStore();
	const { setOpenModal } = useNotificationStore();
	const { user } = useAuth();

	return (
		<div className="overflow-hidden">
			<div className="p-4">
				<h2 className="text-2xl text-dark font-bold">Notifikasi</h2>
			</div>

			<div className="px-4 mt-4">
				<h3 className="text-sm font-semibold text-gray-700 mb-2">
					Baru <span className="bg-indigo-100 text-indigo-600 text-xs font-medium px-2 py-0.5 rounded-full ml-1">{newNotifications.length}</span>
				</h3>
				{newNotifications.map((notif, i) => (
					<NotificationItem key={i} {...notif} />
				))}

				<h3 className="text-sm font-semibold text-gray-700 mt-4 mb-2">
					Sebelumnya <span className="bg-indigo-100 text-indigo-600 text-xs font-medium px-2 py-0.5 rounded-full ml-1">{oldNotifications.length}</span>
				</h3>
				{oldNotifications.map((notif, i) => (
					<NotificationItem key={i} {...notif} isNew={false} />
				))}
			</div>

			<div className="flex flex-wrap items-center justify-between gap-4 px-4 py-3 mt-4">
				<button className="text-sm text-primary hover:underline">✓ Tandai semua telah dibaca</button>
				<button
					className="bg-primary text-white text-sm px-4 py-2 rounded-md cursor-pointer"
					onClick={() => {
						setOpenModal(false);
						if (user?.role !== 'superadmin') {
							setProfilMenu('notifikasi');
							navigate('/profil');
						} else {
							setProfilMenu('profil');
							navigate('/admin/profil');
						}
					}}
				>
					Selengkapnya
				</button>
			</div>
		</div>
	);
};

const NotificationModal = ({ isOpen = true, closeModal = null }) => {
	return (
		<Modal isOpen={isOpen} onClose={closeModal} size="md">
			<NotificationList />
		</Modal>
	);
};

export default NotificationModal;
