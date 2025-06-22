export const pageTitles = {
	'/': 'Beranda - Sistem Klinik Advokasi Mahasiswa',
	'/register': 'Registrasi - Sistem Klinik Advokasi Mahasiswa',
};

export const setPageTitle = (pathname) => {
	const title = pageTitles[pathname] || 'Sistem Klinik Advokasi Mahasiswa';
	document.title = title;
};
