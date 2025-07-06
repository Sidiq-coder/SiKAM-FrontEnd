import FaqComponent from '@/components/faq';
import HeroSection from './components/hero-section';
import MainSection from './components/main-section';

const faqData = [
	{
		question: 'Bagaimana cara membuat atau mengajukan laporan?',
		answer:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elite, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
	},
	{
		question: 'Bagaimana cara membuat atau mengajukan Banding UKT?',
		answer:
			'Untuk mengajukan banding UKT, Anda perlu mengikuti prosedur yang telah ditetapkan oleh institusi. Silakan hubungi bagian administrasi untuk informasi lebih lanjut mengenai persyaratan dan dokumen yang diperlukan.',
	},
	{
		question: 'Bagaimana cara membaca berita terbaru?',
		answer: 'Berita terbaru dapat diakses melalui portal resmi institusi atau melalui aplikasi mobile yang tersedia. Pastikan Anda selalu mengecek sumber informasi yang kredibel dan resmi.',
	},
	{
		question: 'Bagaimana cara membuat atau mengajukan laporan?',
		answer: 'Proses pembuatan laporan dapat dilakukan melalui sistem online yang tersedia. Pastikan semua data yang diperlukan sudah lengkap sebelum mengirimkan laporan.',
	},
	{
		question: 'Bagaimana cara membuat atau mengajukan laporan?',
		answer: 'Silakan ikuti panduan yang tersedia di portal resmi untuk proses pengajuan laporan. Tim support akan membantu jika ada kendala teknis dalam proses pengajuan.',
	},
];

const Home = () => {
	return (
		<div className="pt-[50px]">
			<HeroSection />
			<MainSection />
			<div className="bg-white flex flex-col px-10 md:px-20 lg:px-32 pb-[100px]">
				<h2 className="text-2xl font-semibold text-[#2A2A2A] mb-2 mt-4">FAQ (Frequently Asked Question)</h2>
				<FaqComponent faqData={faqData} />
			</div>
		</div>
	);
};

export default Home;
