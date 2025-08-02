import { Check, Edit } from 'lucide-react';
import Button from '@/components/button';
import useAdminStore from '@/stores/useAdminStore';
import { useDetailAkunStore } from '../stores/useDetailAkunStore';

const AccountProfileDetail = () => {
	const { admin } = useAdminStore();

	return (
		<table className="mt-2">
			<tbody>
				{[
					{ label: 'Username', value: admin?.name ?? '-' },
					{ label: 'Nama', value: admin?.name ?? '-' },
					{ label: 'Email', value: admin?.email ?? '-' },
				].map(({ label, value }) => (
					<tr key={label}>
						<td className="text-primary font-semibold py-2">{label}</td>
						<td className="px-4 sm:px-10 py-2">:</td>
						<td className="py-2">{value}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

const AccountStatusHeader = () => {
	const { setActiveMenu } = useDetailAkunStore();

	return (
		<div className="flex flex-wrap items-center justify-between gap-4">
			<h2 className="text-2xl text-dark font-extrabold">Profil</h2>
			<Button variant="outline" label="Edit" icon={<Edit className="w-4 h-4" />} iconPosition="right" onClick={() => setActiveMenu('edit-profil')} />
		</div>
	);
};

const ProfilAdmin = () => {
	return (
		<>
			{/* Tab Header */}
			<AccountStatusHeader />

			{/* Profile Form */}
			<AccountProfileDetail />
		</>
	);
};

export default ProfilAdmin;
