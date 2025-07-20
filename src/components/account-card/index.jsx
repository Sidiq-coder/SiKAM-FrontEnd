export const AccountSidebar = ({ name, npm }) => (
	<div className="w-full md:w-64 bg-white shadow-sm h-fit md:min-h-screen pt-13 relative">
		<div className="p-6">
			<div className="absolute left-1/2 -top-18 -translate-x-1/2">
				<div className="w-34 h-34 bg-primary rounded-full flex items-center justify-center border-4 border-white">
					<span className="text-6xl">👤</span>
				</div>
			</div>
			<div className="text-center mb-6">
				<h2 className="text-2xl font-extrabold text-dark">{name}</h2>
				<p className="text-[#91575799] text-sm font-medium tracking-wide">{npm}</p>
			</div>
			<nav className="space-y-2">
				<div className="text-primary font-semibold py-2 px-3 border-b border-t border-[#ACACAC99]">Profil</div>
				<div className="text-dark font-semibold py-2 px-3 hover:bg-gray-50 rounded cursor-pointer">Laporan</div>
				<div className="text-dark font-semibold py-2 px-3 hover:bg-gray-50 rounded cursor-pointer">Banding UKT</div>
			</nav>
		</div>
	</div>
);

export const InfoItem = ({ label, value }) => (
	<div className="flex items-center">
		<label className="w-24 text-gray-700 font-medium">{label}</label>
		<span className="mx-4">:</span>
		<span className="text-gray-900">{value || <span className="text-gray-500">-</span>}</span>
	</div>
);
