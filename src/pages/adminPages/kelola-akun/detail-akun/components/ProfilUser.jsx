import { useEffect, useMemo, useState } from 'react';
import { studentStatuses } from '@/utils/users';
import { ArrowRight, Check } from 'lucide-react';
import Button from '@/components/button';
import FileImageComponent from '@/components/file-image';
import useUserStore from '@/stores/useUserStore';
import { toast } from 'react-toastify';

const ProfilUser = () => {
	const { verifyStudent, student, clearError, error } = useUserStore();

	const userStatus = useMemo(() => {
		return studentStatuses.find((status) => status.value === (student?.status ?? 'waiting'));
	}, [student?.status]);

	const [newStatus, setNewStatus] = useState('');

	const handleVerifyStudent = async () => {
		if (newStatus === '') return;
		try {
			const data = {
				campus_email: student.campus_email,
				status: newStatus,
			};
			const result = await verifyStudent(data);

			if (result?.data?.success) {
				clearError();
				toast.success(result?.data?.message);
			}
		} catch (error) {
			toast.error('Terjadi kesalahan!');
			console.error('Error:', error);
		}
	};

	useEffect(() => {
		if (error) {
			toast.error(error);
			clearError();
		}
	}, [error]);

	return (
		<>
			{/* Tab Header */}
			<div className="flex flex-wrap items-center justify-between gap-4">
				<div className="flex flex-wrap items-center gap-4">
					<div className="flex items-center gap-x-12">
						<span className="text-2xl text-dark font-extrabold">Profil</span>
						{userStatus && (
							<div className="flex items-center gap-x-1">
								{<userStatus.icon className={`w-4 h-4 ${userStatus.textColor}`} />}
								<span className={`${userStatus.textColor} text-sm font-medium`}>{userStatus.label}</span>
							</div>
						)}
					</div>
					<ArrowRight className="w-7 h-7 text-main-primary" />
					<select className="px-5 py-2 shadow-md rounded-md text-sm focus:outline-none pr-7 cursor-pointer" value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
						<option value="">ubah status</option>
						{studentStatuses
							.filter((opt) => opt.value !== 'waiting')
							.map((opt) => (
								<option key={opt.value} value={opt.value}>
									{opt.label}
								</option>
							))}
					</select>
				</div>
				<div className="flex justify-end gap-x-6">
					<Button variant="secondary" label="Batal" />
					<Button variant="primary" label="Simpan" icon={<Check className="w-4 h-4" />} iconPosition="right" onClick={handleVerifyStudent} />
				</div>
			</div>

			{/* Profile Form */}
			<table className="mt-6">
				<tbody>
					{[
						{ label: 'Nama', value: student?.name || '-' },
						{ label: 'NPM', value: student?.npm || '-' },
						{ label: 'Email', value: student?.campus_email || '-' },
						{ label: 'Prodi', value: student?.program_study || '-' },
						{ label: 'Angkatan', value: student?.batch || '-' },
						{
							label: 'Foto KTM',
							value: student?.ktm_url ? (
								<FileImageComponent filePath={`${import.meta.env.VITE_API_BASE_URL}/${student?.ktm_url}`} fileName={`${student?.ktm_url.split('/').pop()}`} size="w-40 sm:w-50" />
							) : (
								'-'
							),
						},
					].map(({ label, value }) => (
						<tr key={label}>
							<td className="text-main-primary font-semibold py-2 align-top">{label}</td>
							<td className="px-4 sm:px-10 py-2 align-top">:</td>
							<td className="py-2 align-top">{value}</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};

export default ProfilUser;
