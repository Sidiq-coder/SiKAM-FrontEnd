import { Instagram } from 'lucide-react';

const organizations = [
	{
		name: 'BEM UNILA',
		description: (
			<>
				Bertindak sebagai <span className="font-semibold">perencana utama</span>, BEM menyusun konsep sistem, kebutuhan pengguna, dan visi jangka panjang pengelolaan SIKAM sebagai alat pemberdayaan
				advokasi mahasiswa.
			</>
		),
		img: '/images/logo-bem.png',
		instagram: 'bem_unila',
	},
	{
		name: 'HIMAKOM',
		description: (
			<>
				Berperan sebagai <span className="font-semibold">Quality Control (QC)</span>, HIMAKOM bertanggung jawab terhadap evaluasi fungsionalitas, pengujian fitur, menjaga kualitas sistem agar tetap
				sesuai dengan kebutuhan.
			</>
		),
		img: '/images/logo-himakom.png',
		instagram: 'himakomunila',
	},
	{
		name: 'UKM GRADIEN',
		description: (
			<>
				Menjadi <span className="font-semibold">tim teknis dan pelaksana</span>, UKM GRADIEN merancang, mendesain, mengembangkan, dan memelihara sistem SIKAM hingga dapat diakses dan digunakan seluruh
				mahasiswa.
			</>
		),
		img: '/images/logo-gradien.png',
		instagram: 'gradienunila',
	},
];

export default function TentangSikam() {
	return (
		<div className="bg-[url('/images/bg-pattern.png')] bg-cover bg-center bg-no-repeat md:px-10 lg:px-20 px-4 py-12 pb-[120px]">
			<div className="container mx-auto">
				<h1 className="text-4xl font-bold text-dark mb-6">Tentang Sikam</h1>
				<div className="bg-white rounded-xl border border-gray-200 drop-shadow-md px-8 py-12">
					{/* Judul */}
					<h1 className="text-2xl font-bold text-dark text-center mb-10">Sistem Klinik Advokasi Mahasiswa Universitas Lampung</h1>

					{/* Apa itu SIKAM */}
					<section className="mb-10">
						<h2 className="text-xl text-dark font-semibold mb-4">Apa itu SIKAM?</h2>
						<p className="mb-6 text-dark">
							<span className="font-semibold">SIKAM</span> adalah sistem pelaporan dan advokasi berbasis digital yang dikembangkan untuk menjadi wadah resmi mahasiswa Universitas Lampung dalam
							menyampaikan aspirasi, keluhan, serta mengajukan banding UKT secara terstruktur, terdokumentasi, dan transparan.
						</p>
						<p className="mb-6 text-dark">
							Sebelum hadirnya <span className="font-semibold">SIKAM</span>, berbagai permasalahan di lingkungan kampus kerap disampaikan secara tidak formal—melalui media sosial, pesan pribadi, atau
							obrolan antar mahasiswa. Hal ini mengakibatkan banyak laporan tidak tersampaikan dengan baik atau bahkan hilang tanpa tindak lanjut. Dengan <span className="font-semibold">SIKAM</span>,
							mahasiswa kini memiliki akses terhadap platform yang terpusat, aman, dan akuntabel untuk menyampaikan suara mereka.
						</p>
						<p className="text-dark">
							<span className="font-semibold">SIKAM</span> juga mengutamakan kenyamanan pelapor dengan menyediakan opsi anonim, di mana identitas pelapor disembunyikan dari publik namun tetap tercatat
							untuk validasi admin. Mahasiswa lain juga dapat memberikan upvote atau downvote pada laporan-laporan yang dipublikasikan, sebagai bentuk partisipasi terhadap isu-isu yang relevan.
						</p>
					</section>

					{/* Tujuan Dibangunnya SIKAM */}
					<section className="mb-10">
						<h2 className="text-xl text-dark font-semibold mb-4">Tujuan Dibangunnya SIKAM</h2>
						<ol className="list-decimal list-inside space-y-1 text-dark px-6">
							<li>Mendorong budaya advokasi yang sehat dan konstruktif di lingkungan kampus.</li>
							<li>Menyediakan jalur resmi dan terdokumentasi untuk penyampaian aspirasi dan pengajuan banding UKT.</li>
							<li>Meningkatkan transparansi antara mahasiswa dan pihak birokrasi.</li>
							<li>Memastikan setiap laporan ditindaklanjuti sesuai alur dan prosedur yang berlaku.</li>
						</ol>
					</section>

					{/* Siapa yang Mengelola */}
					<section className="mb-10">
						<h2 className="text-xl text-dark font-semibold mb-4">Siapa yang Mengelola SIKAM?</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{organizations.map((org) => (
								<div key={org.name} className="bg-white border border-gray-200 rounded-xl p-4 pb-8 drop-shadow text-center">
									<img src={org.img} alt={org.name} className="mx-auto h-20 lg:h-30 mb-6" />
									<h3 className="font-semibold text-xl mb-4">{org.name}</h3>
									<p className="text-dark mb-6">{org.description}</p>
									<a href={`https://www.instagram.com/${org.instagram}`} target="_blank" rel="noopener noreferrer" className="flex justify-center items-center text-[#6C757D] gap-1">
										<Instagram />
										<p className="text-[#6C757D]">{org.instagram}</p>
									</a>
								</div>
							))}
						</div>
					</section>

					{/* Footer */}
					<footer className="text-center text-dark mt-6">
						<p className="mb-4">
							SIKAM adalah suara digital mahasiswa. Melalui sistem ini, kita membangun kampus yang lebih terbuka, adil, dan bertanggung jawab. Sampaikan keluhanmu, kuatkan advokasimu.
						</p>
						<p className="text-xl font-semibold">“Bersama SIKAM, setiap suara mahasiswa punya tempat.”</p>
					</footer>
				</div>
			</div>
		</div>
	);
}
