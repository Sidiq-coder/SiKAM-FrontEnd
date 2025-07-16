import { useEffect, useMemo, useState } from 'react';
import { Clock, Users, User, Search } from 'lucide-react';
import { daftarMahasiswa } from '@/mocks/mahasiswaMock';
import StatCard from '@/components/stat-card';
import DataTable from '@/components/data-table';
import Tabs from '@/components/tabs';
import InputField from '@/components/input-field';
import StatusFilter from '@/components/status-filter';
import Pagination from '@/components/pagination';
import { useNavigate } from 'react-router-dom';

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

const columns = [
	{ field: 'date', label: 'Tanggal' },
	{ field: 'name', label: 'Nama' },
	{ field: 'npm', label: 'NPM' },
	{ field: 'email', label: 'Email' },
	{ field: 'status', label: 'Status' },
];

const tabOptions = [
	{ label: 'Mahasiswa', value: 'mahasiswa' },
	{ label: 'Admin', value: 'admin' },
];

const statusOptions = [
	{ status: 'waiting', color: 'text-[#E79625]' },
	{ status: 'verified', color: 'text-[#2FCB51]' },
	{ status: 'not verified', color: 'text-[#EE4848]' },
];

const KelolaAkunPage = () => {
	const navigate = useNavigate();

	const [activeTab, setActiveTab] = useState('mahasiswa');
	const [searchQuery, setSearchQuery] = useState('');
	const [users, setUsers] = useState([]);

	const handleSearch = (e) => {
		setSearchQuery(e.target.value);
	};

	const filteredUsers = useMemo(() => {
		if (!searchQuery.trim()) return daftarMahasiswa;

		const lowerQuery = searchQuery?.toLowerCase();
		return daftarMahasiswa.filter((user) => user.name?.toLowerCase().includes(lowerQuery) || user.name?.toLowerCase().includes(lowerQuery));
	}, [searchQuery]);

	const waitingTotal = useMemo(() => {
		return filteredUsers.filter((user) => user.status === 'waiting').length;
	}, [filteredUsers]);

	useEffect(() => {
		setUsers(filteredUsers);
	}, [filteredUsers]);

	return (
		<div className="bg-white md:px-10 lg:px-20 px-4 py-18 pb-[120px]">
			<div className="container mx-auto">
				{/* Heading */}
				<h1 className="text-4xl font-bold text-[#2A2A2A] mb-8">Kelola Akun</h1>

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
						<DataTable columns={columns} data={users} onClick={() => navigate('/admin/detail-akun')} />

						{/* Pagination */}
						{users.length === 0 ? null : <Pagination className="mt-8" />}
					</div>

					{/* Status Filter */}
					<div className="w-50">
						<StatusFilter statusList={statusOptions} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default KelolaAkunPage;
