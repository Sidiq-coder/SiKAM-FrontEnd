import { useCallback, useEffect, useMemo, useState } from 'react';
import { Clock, Users, User, Search, Trash, Plus } from 'lucide-react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// Dayjs
import dayjs from 'dayjs';
import 'dayjs/locale/id'; // Bahasa Indonesia
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);
dayjs.locale('id'); // atur bahasa ke Indonesia

// Components
import StatCard from '@/components/stat-card';
import DataTable from '@/components/data-table';
import Tabs from '@/components/tabs';
import InputField from '@/components/input-field';
import StatusFilter from '@/components/status-filter';
import Pagination from '@/components/pagination';
import Button from '@/components/button';

// Hooks
import useSearchHandler from '@/hooks/useSearchHandler';

// Stores
import useAdminStore from '@/stores/useAdminStore';
import useStudentStore from '@/stores/useStudentStore';
import { useDetailAkunStore } from './detail-akun/stores/useDetailAkunStore';

// Utils
import { studentStatuses } from '@/utils/users';

// Components
import { DeleteAdminModal, TambahAdminModal } from './components/Modal';
import { create } from 'zustand';

// Constants
const ITEMS_PER_PAGE = 10;

const TABS = [
	{ label: 'Mahasiswa', value: 'mahasiswa' },
	{ label: 'Admin', value: 'admin' },
];

// Stores
const useKelolaAkunStore = create((set, get) => ({
	// State
	isOpenDeleteModal: false,
	adminId: null,
	sort: 'newest',

	// Actions
	setOpenDeleteModal: (isOpenDeleteModal) => {
		set({ isOpenDeleteModal });
	},
	setAdminId: (adminId) => {
		set({ adminId });
	},
	toggleSort: () => {
		set({ sort: get().sort === 'newest' ? 'oldest' : 'newest' });
	},
}));

// Sort Icon
const SortIcon = () => {
	const { sort } = useKelolaAkunStore();

	const isNewest = useMemo(() => sort === 'newest', [sort]);
	const isOldest = useMemo(() => sort === 'oldest', [sort]);

	return (
		<div className="flex flex-col items-center justify-center">
			{/* Segitiga Atas */}
			<div
				className={`w-0 h-0 border-l-4 border-r-4 border-b-6 
        ${isNewest ? 'border-b-[#333]' : 'border-b-[#aaa]'} border-l-transparent border-r-transparent`}
			/>
			{/* Segitiga Bawah */}
			<div
				className={`w-0 h-0 border-l-4 border-r-4 border-t-6 mt-1 
        ${isOldest ? 'border-t-[#333]' : 'border-t-[#aaa]'} border-l-transparent border-r-transparent`}
			/>
		</div>
	);
};

// Delete Admin Section
const DeleteAdminSection = ({ adminId }) => {
	const { setOpenDeleteModal, setAdminId } = useKelolaAkunStore();

	return (
		<button
			onClick={(e) => {
				e.stopPropagation();
				setAdminId(adminId);
				setOpenDeleteModal(true);
			}}
			className="flex items-center px-2 py-1 hover:bg-red-50 rounded transition-colors"
			title="Hapus Admin"
		>
			<Trash className="w-5 h-5 text-red-500" />
		</button>
	);
};

// Stats calculation helper
const calculateStats = (students, admins) => {
	const waitingStudents = students?.filter((student) => student.status === 'waiting').length || 0;
	const totalStudents = students?.length || 0;
	const totalAdmins = admins?.length || 0;

	return [
		{
			title: 'Akun Menunggu',
			value: `+${waitingStudents}`,
			icon: <Clock className="w-11 h-11 text-[#FFDCAD]" />,
			iconBg: 'bg-[#E79625]',
			textColor: 'text-[#E79625]',
		},
		{
			title: 'Mahasiswa',
			value: totalStudents.toString(),
			icon: <Users className="w-11 h-11 text-[#A5CEFF]" />,
			iconBg: 'bg-[#0E50A0]',
			textColor: 'text-[#0E50A0]',
		},
		{
			title: 'Admin Aktif',
			value: totalAdmins.toString(),
			icon: <User className="w-11 h-11 text-[#FFA9A9]" />,
			iconBg: 'bg-[#EE4848]',
			textColor: 'text-[#EE4848]',
		},
	];
};

// Main component
const KelolaAkunPage = () => {
	const navigate = useNavigate();

	// Store hooks
	const { admins, getAdmins, error: adminError, clearError: clearAdminError, pagination: paginationAdmin } = useAdminStore();

	const { students, getAllStudents, error: studentError, clearError: clearStudentError, pagination: paginationStudent } = useStudentStore();

	const { setActiveMenu } = useDetailAkunStore();

	const { isOpenDeleteModal, setOpenDeleteModal, adminId, sort, toggleSort } = useKelolaAkunStore();

	// Table columns configuration
	const STUDENT_COLUMNS = [
		{
			field: 'created_at',
			label: 'Tanggal',
			render: (row) => dayjs(row.created_at).tz('Asia/Jakarta').format('D MMMM, HH:mm'),
			onSort: toggleSort,
			renderHead: () => (
				<div className="flex items-center gap-2">
					<span>Tanggal</span>
					<SortIcon />
				</div>
			),
		},
		{ field: 'name', label: 'Nama' },
		{ field: 'npm', label: 'NPM' },
		{ field: 'campus_email', label: 'Email' },
		{
			field: 'status',
			label: 'Status',
			render: (row) => {
				const status = studentStatuses.find((status) => status.value === row.status);
				if (!status) return null;

				return (
					<span className={`inline-flex gap-x-2 items-center px-4 py-1.5 rounded-md text-xs font-medium shadow-md ${status.textColor}`}>
						<status.icon className="w-4 h-4" />
						<span>{status.label}</span>
					</span>
				);
			},
		},
	];

	const ADMIN_COLUMNS = [
		{ field: 'name', label: 'Username' },
		{ field: 'name', label: 'Nama' },
		{ field: 'email', label: 'Email' },
		{
			field: 'actions',
			label: '',
			render: (row) => <DeleteAdminSection adminId={row.id} />,
		},
	];

	// Local state
	const [activeTab, setActiveTab] = useState('mahasiswa');
	const [searchQueryAdmin, setSearchQueryAdmin] = useState('');
	const [searchQueryStudent, setSearchQueryStudent] = useState('');
	const [status, setStatus] = useState('');
	const [currentPageAdmin, setCurrentPageAdmin] = useState(1);
	const [currentPageStudent, setCurrentPageStudent] = useState(1);
	const [isOpenTambahModal, setOpenTambahModal] = useState(false);

	// Search handlers
	const handleSearchAdmin = useSearchHandler(setSearchQueryAdmin);
	const handleSearchStudent = useSearchHandler(setSearchQueryStudent);

	// Pagination handlers
	const handlePageChangeStudent = useCallback(
		(newPage) => {
			const query = {
				page: newPage,
				itemPerPage: ITEMS_PER_PAGE,
				...(searchQueryStudent && { search: searchQueryStudent }),
				...(status && { status }),
				...(sort && { sort }),
			};

			getAllStudents(query);
			setCurrentPageStudent(newPage);
		},
		[searchQueryStudent, status, sort]
	);

	const handlePageChangeAdmin = useCallback(
		(newPage) => {
			const query = {
				page: newPage,
				itemPerPage: ITEMS_PER_PAGE,
				...(searchQueryAdmin && { search: searchQueryAdmin }),
			};

			getAdmins(query);
			setCurrentPageAdmin(newPage);
		},
		[searchQueryAdmin]
	);

	// Row click handler
	const handleRowClick = useCallback(
		(id) => {
			setActiveMenu('profil');
			navigate(`/admin/detail-akun/${id}/${activeTab}`);
		},
		[navigate, activeTab, setActiveMenu]
	);

	// Modal handlers
	const handleOpenTambahModal = useCallback(() => setOpenTambahModal(true), []);
	const handleCloseTambahModal = useCallback(() => setOpenTambahModal(false), []);

	// Computed values
	const columns = useMemo(() => (activeTab === 'admin' ? ADMIN_COLUMNS : STUDENT_COLUMNS), [activeTab]);

	const currentData = useMemo(() => {
		if (activeTab === 'admin') return admins || [];
		if (activeTab === 'mahasiswa') return students || [];
		return [];
	}, [activeTab, admins, students]);

	const currentPagination = useMemo(() => {
		return activeTab === 'admin' ? paginationAdmin : paginationStudent;
	}, [activeTab, paginationAdmin, paginationStudent]);

	const currentPage = useMemo(() => {
		return activeTab === 'admin' ? currentPageAdmin : currentPageStudent;
	}, [activeTab, currentPageAdmin, currentPageStudent]);

	const handlePageChange = useMemo(() => {
		return activeTab === 'admin' ? handlePageChangeAdmin : handlePageChangeStudent;
	}, [activeTab, handlePageChangeAdmin, handlePageChangeStudent]);

	const waitingTotal = useMemo(() => {
		if (activeTab !== 'mahasiswa') return 0;
		return students?.filter((student) => student.status === 'waiting').length || 0;
	}, [students, activeTab]);

	const stats = useMemo(() => calculateStats(students, admins), [students, admins]);

	// Effects
	useEffect(() => {
		const query = {
			page: 1,
			itemPerPage: ITEMS_PER_PAGE,
			...(searchQueryStudent && { search: searchQueryStudent }),
			...(status && { status }),
			...(sort && { sort }),
		};

		getAllStudents(query);
		setCurrentPageStudent(1);
	}, [searchQueryStudent, status, sort]);

	useEffect(() => {
		const query = {
			page: 1,
			itemPerPage: ITEMS_PER_PAGE,
			...(searchQueryAdmin && { search: searchQueryAdmin }),
		};

		getAdmins(query);
		setCurrentPageAdmin(1);
	}, [searchQueryAdmin]);

	// Error handling
	useEffect(() => {
		if (adminError) {
			toast.error(adminError);
			clearAdminError();
		}
		if (studentError) {
			toast.error(studentError);
			clearStudentError();
		}
	}, [adminError, studentError]);

	// Render
	return (
		<div className="bg-white lg:px-10 px-4 py-18 pb-[120px]">
			<div className="container mx-auto">
				{/* Header */}
				<header className="mb-8">
					<h1 className="text-4xl font-bold text-dark">Kelola Akun</h1>
				</header>

				{/* Statistics Cards */}
				<section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
					{stats.map((stat) => (
						<StatCard key={stat.title} stat={stat} />
					))}
				</section>

				{/* Main Content */}
				<div className="flex flex-col lg:flex-row justify-between gap-8">
					{/* Left Content */}
					<div className="flex-1">
						{/* Controls */}
						<div className="flex flex-wrap flex-col lg:flex-row lg:items-center lg:justify-between gap-x-10 gap-y-4 mb-6">
							<Tabs tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} gap={12} textSize="xl" />

							<div className="flex-1">
								<InputField
									placeholder={`Cari ${activeTab === 'mahasiswa' ? 'mahasiswa' : 'admin'}`}
									type="text"
									icon={Search}
									onChange={activeTab === 'mahasiswa' ? handleSearchStudent : handleSearchAdmin}
								/>
							</div>

							{activeTab === 'admin' && (
								<div className="lg:hidden">
									<Button variant="primary" label="Tambah Admin" size="md" icon={<Plus className="w-4 h-4" />} iconPosition="right" onClick={handleOpenTambahModal} />
								</div>
							)}
						</div>

						{/* Waiting Accounts Info */}
						{activeTab === 'mahasiswa' && waitingTotal > 0 && (
							<div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
								<div className="flex items-center">
									<User className="w-5 h-5 text-blue-600 mr-2" />
									<span className="text-blue-800 text-sm">{waitingTotal} Akun menunggu untuk diverifikasi</span>
								</div>
							</div>
						)}

						{/* Data Table */}
						<DataTable columns={columns} data={currentData} onClick={handleRowClick} />

						{/* Pagination */}
						{currentData.length > 0 && currentPagination?.total_pages > 1 && (
							<Pagination currentPage={currentPage} totalPages={currentPagination.total_pages} className="mt-8" onPageChange={handlePageChange} />
						)}
					</div>

					{/* Right Sidebar */}
					<aside className="w-full max-w-50 hidden lg:block">
						{activeTab === 'mahasiswa' ? (
							<StatusFilter statusList={studentStatuses} onStatusClick={(status) => setStatus(status)} />
						) : (
							<Button variant="primary" label="Tambah Admin" size="md" className="w-full" icon={<Plus className="w-4 h-4" />} iconPosition="right" onClick={handleOpenTambahModal} />
						)}
					</aside>
				</div>
			</div>

			{/* Modal */}
			<TambahAdminModal isOpen={isOpenTambahModal} closeModal={handleCloseTambahModal} />

			{adminId !== null && <DeleteAdminModal id={adminId} isOpen={isOpenDeleteModal} closeModal={() => setOpenDeleteModal(false)} />}
		</div>
	);
};

export default KelolaAkunPage;
