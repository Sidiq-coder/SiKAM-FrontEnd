import { useCallback, useEffect, useState } from 'react';
import useUktAppealStore from '@/stores/useUktAppealStore';
import Pagination from '@/components/pagination';
import { getUktAppealsProblem, getUktAppealsStatus } from '@/utils/ukt-appeals';
import dayjs from 'dayjs';
import 'dayjs/locale/id';

dayjs.locale('id');

const ITEMS_PER_PAGE = 10;

const BandingUktItem = ({ data }) => {
	const status = getUktAppealsStatus(data.status);
	const problem = getUktAppealsProblem(data.problem);

	return (
		<div className="bg-white shadow-md rounded-md p-4 text-sm text-dark">
			<div className="mb-2 flex">
				<div className="w-40 font-semibold">ID pengajuan</div>
				<div>
					: <span className="text-dark">{data.id}</span>
				</div>
			</div>
			<div className="mb-2 flex">
				<div className="w-40 font-semibold">Tanggal pengajuan</div>
				<div>
					: <span className="text-dark">{dayjs(data.submitted_at).format('D MMMM YYYY')}</span>
				</div>
			</div>
			<div className="mb-2 flex">
				<div className="w-40 font-semibold">Status</div>
				<div className="flex items-center gap-1">
					<span>: </span>
					<div className={`${status.textColor} font-medium flex items-center gap-1`}>
						<status.icon className="w-4 h-4" />
						<span>{status.label}</span>
					</div>
				</div>
			</div>
			<div className="mb-4 flex">
				<div className="w-40 font-semibold">Tipe bencana</div>
				<div>
					: <span className="text-dark">{problem.label}</span>
				</div>
			</div>
			<div className="text-center font-medium text-sm">
				[ <span className="underline cursor-pointer hover:text-primary transition">Lihat Detail</span> ]
			</div>
		</div>
	);
};

export const BandingUkt = () => {
	const { uktAppeals, getMyUktAppeals, pagination } = useUktAppealStore();

	const [currentPage, setCurrentPage] = useState(1);

	const handlePageChange = useCallback((newPage) => {
		const query = {
			page: newPage,
			itemPerPage: ITEMS_PER_PAGE,
		};

		getMyUktAppeals(query);
		setCurrentPage(newPage);
	}, []);

	useEffect(() => {
		const query = {
			page: 1,
			itemPerPage: ITEMS_PER_PAGE,
		};

		getMyUktAppeals(query);
		setCurrentPage(1);
	}, []);

	return (
		<div className="space-y-6 p-4">
			{!uktAppeals?.length ? (
				<p className="text-center text-gray my-8">Belum ada data banding ukt.</p>
			) : (
				<>
					{uktAppeals.map((data) => (
						<BandingUktItem key={data.id} data={data} />
					))}
				</>
			)}

			{/* Pagination */}
			{uktAppeals?.length > 0 && <Pagination className="mt-8" currentPage={currentPage} totalPages={pagination.total_pages} onPageChange={handlePageChange} />}
		</div>
	);
};
