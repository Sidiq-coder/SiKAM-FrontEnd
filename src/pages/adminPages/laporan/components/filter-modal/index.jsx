import { Modal } from '@/components/modal';
import FilterButton from '@/components/filter-button';
import Hashtag from '@/components/hashtag';

const FilterModal = ({ openModal, closeModal, selectedFilter, setSelectedFilter, categorizedReports, setCategory }) => {
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
			</div>
		</Modal>
	);
};

export default FilterModal;
