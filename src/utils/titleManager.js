const siteTitle = 'Sistem Klinik Advokasi Mahasiswa';

export const pageTitles = {
	'/login': `Login`,
	'/register': `Registrasi`,
	'/registrasi-ulang': `Registrasi Ulang`,
	'/lupa-password': `Lupa Password`,
	'/reset-password': `Reset Password`,
	'/verifikasi-otp': `Verifikasi OTP`,

	'/': `Beranda`,

	'/laporan': `Laporan`,
	'/detail-laporan': `Detail Laporan`,
	'/aju-laporan': `Aju Laporan`,
	'/ubah-laporan': `Ubah Laporan`,

	'/banding-ukt': `Banding UKT`,

	'/advika': `Advika`,
	'/advika/detailAdvika': `Detail Advika`,

	'/tentang': `Tentang SIKAM`,

	'/profil': `Profil Saya`,

	'/admin/laporan': `Laporan`,
	'/admin/detail-laporan': `Detail Laporan`,

	'/admin/kelola-akun': `Kelola Akun`,
	'/admin/detail-akun': `Detail Akun`,

	'/admin/banding-ukt': `Banding UKT`,
	'/admin/detail-banding-ukt': `Banding UKT`,

	'/admin/advika': `Advika`,
	'/admin/detailAdvika': `Detail Advika`,
	'/admin/editAdvika': `Edit Advika`,
};

export const setPageTitle = (pathname) => {
	const title = pageTitles[pathname] ? `${pageTitles[pathname]} - ${siteTitle}` : siteTitle;
	document.title = title;
};

export const setCustomPageTitle = (name) => {
	const title = `${name} - ${siteTitle}`;
	document.title = title;
};
