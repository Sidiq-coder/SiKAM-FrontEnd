const siteTitle = 'Sistem Klinik Advokasi Mahasiswa';

export const pageTitles = {
	'/': `Beranda - ${siteTitle}`,
	'/register': `Registrasi - ${siteTitle}`,
	'/registrasi-ulang': `Registrasi Ulang - ${siteTitle}`,
	'/login': `Login - ${siteTitle}`,
	'/reset-password': `Reset Password - ${siteTitle}`,
	'/verifikasi-otp': `Verifikasi OTP - ${siteTitle}`,

	'/aju-laporan': `Aju Laporan - ${siteTitle}`,
	'/detail-laporan': `Detail Laporan - ${siteTitle}`,
	'/ubah-laporan': `Ubah Laporan - ${siteTitle}`,
};

export const setPageTitle = (pathname) => {
	const title = pageTitles[pathname] || siteTitle;
	document.title = title;
};
