import { useState, useEffect } from 'react';
import { Home, ArrowLeft, RefreshCw } from 'lucide-react';

export default function NotFoundPage() {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const handleMouseMove = (e) => {
			setMousePosition({ x: e.clientX, y: e.clientY });
		};

		window.addEventListener('mousemove', handleMouseMove);
		return () => window.removeEventListener('mousemove', handleMouseMove);
	}, []);

	const handleRefresh = () => {
		setIsLoading(true);
		setTimeout(() => {
			setIsLoading(false);
			window.location.reload();
		}, 1000);
	};

	const parallaxStyle = {
		transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
	};

	const floatingElements = Array.from({ length: 6 }, (_, i) => (
		<div
			key={i}
			className={`absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 animate-bounce`}
			style={{
				left: `${20 + i * 15}%`,
				top: `${30 + (i % 3) * 20}%`,
				animationDelay: `${i * 0.5}s`,
				animationDuration: `${2 + i * 0.3}s`,
			}}
		/>
	));

	return (
		<div className="min-h-screen bg-[url('/images/top-blue-bg.png')] bg-cover bg-center bg-no-repeat relative overflow-hidden">
			{/* Animated background elements */}
			<div className="absolute inset-0">
				{floatingElements}
				<div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse" />
				<div className="absolute bottom-20 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl animate-pulse animation-delay-1000" />
				<div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/10 rounded-full blur-xl animate-pulse animation-delay-2000" />
			</div>

			{/* Main content */}
			<div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
				<div className="text-center max-w-2xl mx-auto" style={parallaxStyle}>
					{/* 404 Number */}
					<div className="relative mb-8">
						<h1 className="text-9xl md:text-[12rem] font-bold text-transparent bg-clip-text bg-white animate-pulse select-none">404</h1>
						<div className="absolute inset-0 text-9xl md:text-[12rem] font-bold text-white/5 animate-ping">404</div>
					</div>

					{/* Title and Description */}
					<div className="space-y-6 mb-12">
						<h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Halaman Tidak Ditemukan</h2>
						<p className="text-lg text-gray-300 leading-relaxed max-w-md mx-auto">Oops! Sepertinya halaman yang Anda cari telah berpindah ke dimensi lain atau mungkin tidak pernah ada.</p>
					</div>

					{/* Action Buttons */}
					<div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
						<button
							onClick={() => window.history.back()}
							className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 cursor-pointer"
						>
							<ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
							Kembali
						</button>

						<button
							onClick={() => (window.location.href = '/')}
							className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 cursor-pointer"
						>
							<Home className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
							Beranda
						</button>

						<button
							onClick={handleRefresh}
							disabled={isLoading}
							className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-pink-500/25 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
						>
							<RefreshCw className={`w-5 h-5 transition-transform duration-300 ${isLoading ? 'animate-spin' : 'group-hover:rotate-180'}`} />
							{isLoading ? 'Memuat...' : 'Refresh'}
						</button>
					</div>

					{/* Fun Facts */}
					<div className="mt-12 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
						<p className="text-sm text-gray-400 mb-2">💡 Tahukah Anda?</p>
						<p className="text-white text-sm">Error 404 pertama kali muncul di CERN pada tahun 1992. Angka 404 merujuk pada nomor ruangan tempat server web pertama berada!</p>
					</div>
				</div>
			</div>
		</div>
	);
}
