import { Modal } from '@/components/modal';
import FilterButton from '@/components/filter-button';
import Hashtag from '@/components/hashtag';
import StatusFilter from '@/components/status-filter';
import { reportCategories } from '@/utils/reports';

const FilterModal = ({ openModal, closeModal, selectedFilter, setSelectedFilter, totalPerCategory, activeCategory, setCategory, filteredStatuses, activeStatus, setStatus }) => {
	return (
		<Modal isOpen={openModal} onClose={closeModal} size="xl">
			<div className="flex flex-col gap-10 px-4 pb-10 md:py-6">
				<FilterButton options={['Terbaru', 'Terpopuler', 'Terlama']} selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />

				<div>
					<h3 className="text-2xl font-bold text-dark mb-4">Kategori Terkait</h3>
					<div className="flex flex-wrap items-start gap-4">
						{Object.values(totalPerCategory).some((qty) => qty > 0) ? (
							Object.entries(totalPerCategory).map(([key, quantity]) => {
								const category = reportCategories.find((c) => c.value === key);
								if (!category) return null; // kategori tidak dikenal

								return (
									<Hashtag
										key={key}
										label={`#${category.label}`}
										quantity={quantity}
										onClick={() => setCategory((prev) => (prev === key ? null : key))}
										active={activeCategory === key}
										className="cursor-pointer"
									/>
								);
							})
						) : (
							<p className="text-sm text-gray italic">Belum ada kategori yang tersedia.</p>
						)}
					</div>
				</div>

				<StatusFilter
					title="Status"
					statusList={filteredStatuses}
					onStatusClick={(status) => setStatus((prev) => (prev === status ? null : status))}
					activeStatus={activeStatus}
					className=""
					direction="flex-row"
				/>
			</div>
		</Modal>
	);
};

export default FilterModal;
