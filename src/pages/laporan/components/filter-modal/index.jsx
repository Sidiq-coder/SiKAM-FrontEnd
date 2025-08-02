import { Modal } from '@/components/modal';
import FilterButton from '@/components/filter-button';
import Hashtag from '@/components/hashtag';
import StatusFilter from '@/components/status-filter';

const FilterModal = ({ openModal, closeModal, selectedFilter, setSelectedFilter, categorizedReports, setCategory, filteredStatuses, setStatus }) => {
	return (
		<Modal isOpen={openModal} onClose={closeModal} size="xl">
			<div className="flex flex-col gap-10 px-4 pb-10 md:py-6">
				<FilterButton options={['Terbaru', 'Terpopuler', 'Terlama']} selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />

				<div>
					<h3 className="text-2xl font-bold text-dark mb-4">Kategori Terkait</h3>
					<div className="flex flex-wrap items-start gap-4">
						{categorizedReports.length > 0 ? (
							<>
								{categorizedReports.map(({ label, value, quantity }) => (
									<Hashtag key={value} label={`#${label}`} quantity={quantity} onClick={() => setCategory(value)} className="cursor-pointer" />
								))}
							</>
						) : (
							<p className="text-sm text-gray italic">Belum ada kategori yang tersedia.</p>
						)}
					</div>
				</div>

				<StatusFilter title="Status" statusList={filteredStatuses} onStatusClick={(status) => setStatus(status)} className="" direction="flex-row" />
			</div>
		</Modal>
	);
};

export default FilterModal;
