import { CalendarDays, CheckCheck, Trash2, Check } from 'lucide-react';
import { Modal } from '@/components/modal';
import { useEffect, useMemo } from 'react';
import useNotificationStore from '@/stores/useNotificationStore';
import useProfilStore from '@/stores/useProfilStore';
import useAuth from '@/hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { formatDateToShortIndonesian, timeAgo } from '@/utils/date';
import dayjs from 'dayjs';

const NotificationItem = ({ item }) => {
	return (
		<div className="flex items-start gap-3 py-4 relative">
			<div className="relative">
				<div className="w-10 h-10 bg-main-primary rounded-full flex items-center justify-center text-white shrink-0">
					<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="white">
						<path d="M12 12c2.67 0 8 1.34 8 4v2H4v-2c0-2.66 5.33-4 8-4zm0-2a4 4 0 100-8 4 4 0 000 8z" />
					</svg>
				</div>
				{item.status === 'unread' && <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-blue-500 rounded-full"></span>}
			</div>
			<div className="flex-1">
				<p className="text-sm font-medium text-dark">{item.description}</p>
				<div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between mt-1">
					<div className="flex items-center gap-1">
						<CalendarDays className="w-4 h-4 text-xs text-gray-500" />
						<span className="text-xs text-gray-500">{formatDateToShortIndonesian(item.created_at)}</span>
					</div>
				</div>
			</div>
			<div className="flex flex-col items-end">
				{item.status === 'unread' && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full mb-4"></div>}
				<span className="text-xs text-gray-500">{timeAgo(item.created_at)}</span>
			</div>
		</div>
	);
};

const NotificationList = () => {
	const { getNotifications, readAllNotifications, notifications, refresh, error, clearError, setOpenModal } = useNotificationStore();
	const navigate = useNavigate();
	const { setProfilMenu } = useProfilStore();
	const { user } = useAuth();
	const location = useLocation();

	const handleReadAll = async () => {
		try {
			const result = await readAllNotifications();
			if (result?.data?.success) {
				toast.success(result?.data?.message);
				clearError();
			}
		} catch {
			toast.error('Gagal menandai semua sebagai dibaca');
		}
	};

	const { todayNotifications, previousNotifications } = useMemo(() => {
		const today = [];
		const previous = [];

		for (const notif of notifications) {
			const notifDate = dayjs(notif.created_at);
			if (notifDate.isSame(dayjs(), 'day')) {
				today.push(notif);
			} else {
				previous.push(notif);
			}
		}

		return {
			todayNotifications: today.slice(0, 2),
			previousNotifications: previous.slice(0, 2),
		};
	}, [notifications]);

	useEffect(() => {
		if (error && location.pathname !== '/profil') {
			toast.error(error);
			clearError();
		}
	}, [error, location.pathname]);

	useEffect(() => {
		getNotifications();
	}, [refresh]);

	return (
		<div className="overflow-hidden">
			<div className="p-4">
				<h2 className="text-2xl text-dark font-bold">Notifikasi</h2>
			</div>

			<div className="px-4 mt-4">
				<h3 className="text-sm font-semibold text-gray-700 mb-2">
					Baru <span className="bg-[#C9CEFF] text-white text-xs font-medium px-2 py-0.5 rounded-full ml-1">{todayNotifications.length}</span>
				</h3>
				{todayNotifications.map((item) => (
					<NotificationItem key={item.id} item={item} />
				))}

				<h3 className="text-sm font-semibold text-gray-700 mt-4 mb-2">
					Sebelumnya <span className="bg-[#C9CEFF] text-white text-xs font-medium px-2 py-0.5 rounded-full ml-1">{previousNotifications.length}</span>
				</h3>
				{previousNotifications.map((item) => (
					<NotificationItem key={item.id} item={item} />
				))}
			</div>

			<div className="flex flex-wrap items-center justify-between gap-4 px-4 py-3 mt-4">
				<button className="text-sm text-main-primary cursor-pointer flex items-center gap-1" onClick={handleReadAll}>
					<CheckCheck className="w-4 h-4" />
					Tandai semua telah dibaca
				</button>
				<button
					className="bg-main-primary text-white text-sm px-4 py-2 rounded-md cursor-pointer"
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

const NotificationModal = ({ isOpen = true, closeModal = null }) => (
	<Modal isOpen={isOpen} onClose={closeModal} size="md">
		<NotificationList />
	</Modal>
);

export default NotificationModal;
