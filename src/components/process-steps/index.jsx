import { Check, ClipboardPenLine, CornerUpRight, MessagesSquare } from 'lucide-react';

const ProcessSteps = () => {
	const steps = [
		{
			icon: <ClipboardPenLine className="w-12 h-12" />,
			title: 'Ajukan Laporan',
			description: 'Laporkan keluhan atau aspirasi anda dengan jelas dan lengkap',
		},
		{
			icon: <CornerUpRight className="w-12 h-12" />,
			title: 'Proses Verifikasi',
			description: 'Dalam 3 hari, laporan Anda akan diverifikasi dan diteruskan kepada instansi berwenang',
		},
		{
			icon: <MessagesSquare className="w-12 h-12" />,
			title: 'Proses Tindak Lanjut',
			description: 'Dalam 5 hari, instansi akan menindaklanjuti dan membalas laporan Anda',
		},
		{
			icon: <Check className="w-12 h-12" />,
			title: 'Selesai',
			description: 'Laporan Anda akan terus ditindaklanjuti hingga terselesaikan',
		},
	];

	return (
		<section className="py-20">
			<div className="container mx-auto px-4">
				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
					<div className="hidden lg:block absolute top-8 left-1/2 transform -translate-x-1/2 w-3/4 h-[2px] bg-[#0E50A0]"></div>
					{steps.map((step, index) => (
						<div key={index} className="text-center relative z-10">
							<div className="w-18 h-18 bg-yellow rounded-full flex items-center justify-center mx-auto mb-4 text-[#0B4D9B]">{step.icon}</div>
							<h3 className="text-xl font-semibold mb-3 text-dark">{step.title}</h3>
							<p className="text-dark leading-relaxed">{step.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default ProcessSteps;
