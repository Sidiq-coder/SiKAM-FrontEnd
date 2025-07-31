import { useEffect, useMemo, useState } from 'react';
import { Clock, Users, User, Search, Trash, CheckSquare, XSquare } from 'lucide-react';
import StatCard from '@/components/stat-card';
import DataTable from '@/components/data-table';
import Tabs from '@/components/tabs';
import InputField from '@/components/input-field';
import StatusFilter from '@/components/status-filter';
import Pagination from '@/components/pagination';
import { useNavigate } from 'react-router-dom';
import useAdminStore from '@/stores/useAdminStore';
import { studentStatuses } from '@/utils/users';
import { useDetailAkunStore } from './detail-akun/stores/useDetailAkunStore';

const stats = [
	{
		title: 'Akun Menunggu',
		value: '+4',
		icon: <Clock className="w-11 h-11 text-[#FFDCAD]" />,
		iconBg: 'bg-[#E79625]',
		textColor: 'text-[#E79625]',
	},
	{
		title: 'Mahasiswa',
		value: '160',
		icon: <Users className="w-11 h-11 text-[#A5CEFF]" />,
		iconBg: 'bg-[#0E50A0]',
		textColor: 'text-[#0E50A0]',
	},
	{
		title: 'Admin Aktif',
		value: '5',
		icon: <User className="w-11 h-11 text-[#FFA9A9]" />,
		iconBg: 'bg-[#EE4848]',
		textColor: 'text-[#EE4848]',
	},
];

const mahasiswaColumns = [
	{ field: 'date', label: 'Tanggal' },
	{ field: 'name', label: 'Nama' },
	{ field: 'npm', label: 'NPM' },
	{ field: 'email', label: 'Email' },
	{
		field: 'status',
		label: 'Status',
		render: (row) => {
			const status = studentStatuses.find((status) => status.value === row.status);

			if (status) {
				return (
					<span className={`inline-flex gap-x-2 items-center px-4 py-1.5 rounded-md text-xs font-medium shadow-md ${status.textColor}`}>
						<status.icon className="w-4 h-4" />
						<span>{status.label}</span>
					</span>
				);
			}
		},
	},
];

const adminColumns = [
	{ field: 'name', label: 'Username' },
	{ field: 'name', label: 'Nama' },
	{ field: 'email', label: 'Email' },
	{
		field: 'actions',
		label: '',
		render: (row) => (
			<button
				onClick={(e) => {
					e.stopPropagation();
					console.log(`Bagikan item ${row.id}`);
				}}
				className="flex items-center px-2 py-1"
			>
				<Trash className="w-5 h-5 text-red" />
			</button>
		),
	},
];

const tabOptions = [
	{ label: 'Mahasiswa', value: 'mahasiswa' },
	{ label: 'Admin', value: 'admin' },
];

const KelolaAkunPage = () => {
	const navigate = useNavigate();

	const { admins, getAdmins } = useAdminStore();
	const { setActiveMenu } = useDetailAkunStore();

	const [activeTab, setActiveTab] = useState('mahasiswa');
	const [searchQuery, setSearchQuery] = useState('');

	const handleSearch = (e) => {
		setSearchQuery(e.target.value);
	};

	const columns = useMemo(() => (activeTab === 'admin' ? adminColumns : mahasiswaColumns), [activeTab]);

	const filteredUsers = useMemo(() => {
		if (!searchQuery.trim()) return admins;

		const lowerQuery = searchQuery?.toLowerCase();
		return admins.filter((user) => user.name?.toLowerCase().includes(lowerQuery) || user.name?.toLowerCase().includes(lowerQuery));
	}, [searchQuery, admins]);

	const waitingTotal = useMemo(() => {
		return filteredUsers.filter((user) => user.status === 'waiting').length;
	}, [filteredUsers]);

	useEffect(() => {
		getAdmins();
	}, []);

	return (
		<div className="bg-white md:px-10 lg:px-20 px-4 py-18 pb-[120px]">
			<div className="container mx-auto">
				{/* Heading */}
				<h1 className="text-4xl font-bold text-dark mb-8">Kelola Akun</h1>

				{/* Stats */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
					{stats.map((stat) => (
						<div key={stat.title}>
							<StatCard stat={stat} />
						</div>
					))}
				</div>

				<div className="flex flex-col lg:flex-row justify-between gap-8">
					<div className="flex-1">
						<div className="flex flex-wrap flex-col md:flex-row md:items-center justify-between gap-x-10 gap-y-4 mb-6">
							{/* Tabs */}
							<Tabs tabs={tabOptions} activeTab={activeTab} onTabChange={setActiveTab} gap={12} textSize="xl" />

							{/* Search */}
							<div className="flex-1">
								<InputField placeholder="Cari mahasiswa" type="text" icon={Search} onChange={handleSearch} />
							</div>
						</div>

						{/* Account verification info */}
						<div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
							<div className="flex items-center">
								<User className="w-5 h-5 text-blue-600 mr-2" />
								<span className="text-blue-800 text-sm">{waitingTotal} Akun menunggu untuk diverifikasi</span>
							</div>
						</div>

						{/* Table */}
						<DataTable
							columns={columns}
							data={filteredUsers}
							onClick={(id) => {
								setActiveMenu('profil');
								navigate(`/admin/detail-akun/${id}/${activeTab}`);
							}}
						/>

						{/* Pagination */}
						{filteredUsers.length === 0 ? null : <Pagination className="mt-8" />}
					</div>

					{/* Status Filter */}
					<div className="w-50">
						<StatusFilter statusList={studentStatuses} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default KelolaAkunPage;
