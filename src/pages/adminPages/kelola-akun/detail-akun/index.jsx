import { useState } from 'react';
import { Hourglass, Check, X, ArrowRight } from 'lucide-react';
import BackLink from '@/components/back-link';
import Button from '@/components/button';
import FileImageComponent from '@/components/file-image';
import { AccountSidebar } from '../../../../components/account-card';

const statusOptions = [
	{ label: 'Waiting', value: 'Waiting', icon: <Hourglass className="w-4 h-4 text-yellow-600" />, color: 'text-yellow-600' },
	{ label: 'Verified', value: 'Verified', icon: <Check className="w-4 h-4 text-green-600" />, color: 'text-green-600' },
	{ label: 'Not Verified', value: 'Not Verified', icon: <X className="w-4 h-4 text-red-600" />, color: 'text-red-600' },
];

const AccountProfileDetail = ({ profile }) => (
	<div className="p-6">
		<div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
			<div className="space-y-6">
				<InfoItem label="Nama" value={profile.name} />
				<InfoItem label="NPM" value={profile.npm} />
				<InfoItem label="Email" value={profile.email} />
				<InfoItem label="Prodi" value={profile.prodi} />
				<InfoItem label="Angkatan" value={profile.angkatan} />
				<div className="flex items-start">
					<label className="w-24 text-gray-700 font-medium">Foto KTM</label>
					<span className="mx-4">:</span>
					<div className="flex-1">
						<FileImageComponent filePath={profile.ktmPath} fileName={profile.ktmFileName} />
					</div>
				</div>
			</div>
		</div>
	</div>
);

const AccountStatusHeader = ({ currentStatus, newStatus, setNewStatus, statusOptions }) => (
	<div className="flex flex-wrap items-center justify-between px-6 py-4">
		<div className="flex items-center gap-x-4">
			<div className="flex items-center gap-x-12">
				<span className="text-2xl text-[#2A2A2A] font-extrabold">Profil</span>
				<div className="flex items-center gap-x-1">
					<Hourglass className="w-4 h-4 text-yellow-600" />
					<span className="text-yellow-600 text-sm">{currentStatus}</span>
				</div>
			</div>
			<ArrowRight className="w-7 h-7 text-primary" />
			<select className="px-5 py-2 shadow-md rounded-md text-sm focus:outline-none pr-7 cursor-pointer" value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
				<option value="">ubah status</option>
				{statusOptions.map((opt) => (
					<option key={opt.value} value={opt.value}>
						{opt.label}
					</option>
				))}
			</select>
		</div>
		<div className="flex justify-end gap-x-6">
			<Button variant="secondary" label="Batal" />
			<Button variant="primary" label="Simpan" icon={<Check className="w-4 h-4" />} iconPosition="right" />
		</div>
	</div>
);

const DetailAkunPage = () => {
	const [currentStatus] = useState('Waiting');
	const [newStatus, setNewStatus] = useState('');

	return (
		<div className="bg-[url('/images/bg-pattern.png')] bg-cover bg-center bg-no-repeat md:px-10 lg:px-20 px-4 py-18 pb-[120px]">
			<div className="container mx-auto">
				<BackLink to="/admin/kelola-akun" label="Kelola Akun" className="mb-6" />
				{/* Header */}
				<div className="bg-[url('/images/top-blue-bg.png')] bg-cover bg-center bg-no-repeat p-4">
					<div className="w-full h-26"></div>
				</div>

				<div className="flex">
					{/* Sidebar */}
					<AccountSidebar name={'John Doe'} npm={'2315150115'} />

					{/* Main Content */}
					<div className="bg-white shadow-sm flex-1 px-6 py-4">
						{/* Tab Header */}
						<div className="flex flex-wrap items-center justify-between px-6 py-4">
							<div className="flex items-center gap-x-4">
								<div className="flex items-center gap-x-12">
									<span className="text-2xl text-[#2A2A2A] font-extrabold">Profil</span>
									<div className="flex items-center gap-x-1">
										<Hourglass className="w-4 h-4 text-yellow-600" />
										<span className="text-yellow-600 text-sm">{currentStatus}</span>
									</div>
								</div>

								<ArrowRight className="w-7 h-7 text-primary" />

								{/* Dropdown */}
								<select className="px-5 py-2 shadow-md rounded-md text-sm focus:outline-none pr-7 cursor-pointer" value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
									<option value="">ubah status</option>
									{statusOptions.map((opt) => (
										<option key={opt.value} value={opt.value}>
											{opt.label}
										</option>
									))}
								</select>
							</div>
							<div className="flex justify-end gap-x-6">
								<Button variant="secondary" label="Batal" />
								<Button variant="primary" label="Simpan" icon={<Check className="w-4 h-4" />} iconPosition="right" />
							</div>
						</div>

						{/* Profile Form */}
						<div className="p-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
								{/* Left Column */}
								<div className="space-y-6">
									<div className="flex items-center">
										<label className="w-24 text-gray-700 font-medium">Nama</label>
										<span className="mx-4">:</span>
										<span className="text-gray-900">John Doe</span>
									</div>

									<div className="flex items-center">
										<label className="w-24 text-gray-700 font-medium">NPM</label>
										<span className="mx-4">:</span>
										<span className="text-gray-900">2315150115</span>
									</div>

									<div className="flex items-center">
										<label className="w-24 text-gray-700 font-medium">Email</label>
										<span className="mx-4">:</span>
										<span className="text-gray-900">JohnDoe123@gmail.com</span>
									</div>

									<div className="flex items-center">
										<label className="w-24 text-gray-700 font-medium">Prodi</label>
										<span className="mx-4">:</span>
										<span className="text-gray-500">-</span>
									</div>

									<div className="flex items-center">
										<label className="w-24 text-gray-700 font-medium">Angkatan</label>
										<span className="mx-4">:</span>
										<span className="text-gray-500">-</span>
									</div>

									<div className="flex items-start">
										<label className="w-24 text-gray-700 font-medium">Foto KTM</label>
										<span className="mx-4">:</span>
										<div className="flex-1">
											<FileImageComponent filePath="/images/img-laporan.png" fileName="IMG.jpg" />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DetailAkunPage;
