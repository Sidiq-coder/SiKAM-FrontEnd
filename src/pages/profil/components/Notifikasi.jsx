import { CheckCheck, MoreVertical, Trash2, Check } from 'lucide-react';
import { useEffect, useMemo, useState, useRef } from 'react';
import useNotificationStore from '@/stores/useNotificationStore';
import { formatDateToShortIndonesian, timeAgo } from '@/utils/date';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

const NotificationOption = ({ item, onMarkAsRead, onDelete }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const menuRef = useRef();

	const toggleMenu = () => setIsMenuOpen((prev) => !prev);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (menuRef.current && !menuRef.current.contains(event.target)) {
				setIsMenuOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return (
		<div className="relative" ref={menuRef}>
			<button onClick={toggleMenu}>
				<MoreVertical className="w-4 h-4 text-main-primary cursor-pointer" />
			</button>

			{isMenuOpen && (
				<div className="absolute right-0 mt-2 w-56 bg-white shadow-lg border border-gray-200 rounded-md z-10">
					{item.status !== 'read' && (
						<button
							onClick={() => {
								onMarkAsRead(item.id);
								setIsMenuOpen(false);
							}}
							className="flex items-center w-full gap-2 px-4 py-2 text-sm text-left text-green hover:bg-green-50"
						>
							<Check className="w-4 h-4" />
							Tandai sebagai dibaca
						</button>
					)}
					<button
						onClick={() => {
							onDelete(item.id);
							setIsMenuOpen(false);
						}}
						className="flex items-center w-full gap-2 px-4 py-2 text-sm text-left text-red hover:bg-red-50"
					>
						<Trash2 className="w-4 h-4" />
						Hapus notifikasi
					</button>
				</div>
			)}
		</div>
	);
};

const NotificationItem = ({ data }) => {
	const { readNotification, clearError, deleteNotification } = useNotificationStore();

	const handleMarkRead = async (id) => {
		try {
			const result = await readNotification(id);

			if (result?.data?.success) {
				toast.success(result?.data?.message);
				clearError();
			}
		} catch (error) {
			toast.error('Terjadi kesalahan');
			console.error('error:', error);
		}
	};

	const handleDelete = async (id) => {
		try {
			const result = await deleteNotification(id);

			if (result?.data?.success) {
				toast.success(result?.data?.message);
				clearError();
			}
		} catch (error) {
			toast.error('Terjadi kesalahan');
			console.error('error:', error);
		}
	};

	return (
		<>
			{data.map((item) => (
				<div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-3">
					{/* Kiri: Ikon + Teks */}
					<div className="flex flex-1 items-start gap-4">
						<div className="w-10 h-10 bg-main-primary rounded-full flex items-center justify-center text-white shrink-0">
							<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="white">
								<path d="M12 12c2.67 0 8 1.34 8 4v2H4v-2c0-2.66 5.33-4 8-4zm0-2a4 4 0 100-8 4 4 0 000 8z" />
							</svg>
						</div>
						<div>
							<p className="text-sm font-semibold text-dark break-words">
								Notifikasi <span className="font-normal text-[#4B5563]">{item.description}</span>
							</p>
							<p className="text-xs text-gray-400 mt-1">{formatDateToShortIndonesian(item.created_at)}</p>
						</div>
					</div>

					{/* Kanan: Status + TimeAgo + Menu */}
					<div className="flex items-center gap-4 pl-14 sm:pl-0">
						<div className="flex items-center sm:flex-col sm:items-end gap-4">
							{item.status === 'unread' && <div className="w-3 h-3 bg-[#007BFF] rounded-full"></div>}
							<p className="text-xs text-gray-400">{timeAgo(item.created_at)}</p>
						</div>
						<NotificationOption key={item.id} item={item} onMarkAsRead={(id) => handleMarkRead(id)} onDelete={(id) => handleDelete(id)} />
					</div>
				</div>
			))}
		</>
	);
};

export const Notifikasi = () => {
	const { getNotifications, readAllNotifications, notifications, refresh, error, clearError } = useNotificationStore();

	const handleReadAll = async () => {
		try {
			const result = await readAllNotifications();

			if (result?.data?.success) {
				toast.success(result?.data?.message);
				clearError();
			}
		} catch (error) {
			toast.error('Terjadi kesalahan');
			console.error('error:', error);
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

		return { todayNotifications: today, previousNotifications: previous };
	}, [notifications]);

	useEffect(() => {
		if (error) {
			toast.error(error);
			clearError();
		}
	}, [error]);

	useEffect(() => {
		getNotifications();
	}, [refresh]);

	return (
		<div className="bg-white max-h-screen overflow-y-auto w-full pr-4 pb-20">
			<div className="flex flex-wrap items-center justify-between mb-8 gap-2">
				<h2 className="text-2xl font-bold text-dark">Notifikasi</h2>
				<button className="text-sm text-main-primary cursor-pointer flex items-center gap-x-1" onClick={handleReadAll}>
					<CheckCheck className="w-4 h-4" />
					<span>Tandai semua telah dibaca</span>
				</button>
			</div>

			{/* Notifikasi Baru */}
			<h3 className="text-sm font-semibold text-gray-600 mb-2">
				Baru <span className="text-xs bg-gray-200 rounded-full px-2 py-0.5 ml-1">{todayNotifications?.length}</span>
			</h3>
			<NotificationItem data={todayNotifications} />

			{/* Notifikasi Sebelumnya */}
			<h3 className="text-sm font-semibold text-gray-600 mt-6 mb-2">
				Sebelumnya <span className="text-xs bg-gray-200 rounded-full px-2 py-0.5 ml-1">{previousNotifications?.length}</span>
			</h3>
			<NotificationItem data={previousNotifications} />
		</div>
	);
};
