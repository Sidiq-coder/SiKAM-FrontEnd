import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faFile } from '@fortawesome/free-solid-svg-icons';
import { Modal } from '@/components/modal';
import FilterButton from '@/components/filter-button';
import Button from '@/components/button';

const FILTER_OPTIONS = {
	TERBARU: 'Terbaru',
	TERLAMA: 'Terlama',
};

const FilterModal = ({ openModal, closeModal, selectedFilter, setSelectedFilter, activeStatus, handleStatusClick }) => {
	return (
		<Modal isOpen={openModal} onClose={closeModal} size="xl">
			<div className="flex flex-col gap-10 px-4 pb-10 md:py-6">
				<FilterButton options={Object.values(FILTER_OPTIONS)} selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />

				<div>
					<h1 className="font-bold text-2xl capitalize">berdasarkan status</h1>

					<div className="flex flex-wrap gap-4 mt-4">
						<Button
							label="Publish"
							className={`${activeStatus === 'published' ? 'bg-main-primary hover:bg-main-primary' : 'bg-yellow hover:bg-yellow'} text-xs text-white h-8 flex justify-start items-center w-26`}
							icon={<FontAwesomeIcon icon={faDownload} flip="vertical" />}
							onClick={() => handleStatusClick('published')}
						/>

						<Button
							label="Draft"
							className={`${activeStatus === 'draft' ? 'bg-main-primary hover:bg-main-primary' : 'bg-yellow hover:bg-yellow'} text-xs text-white h-8 flex justify-start items-center w-26`}
							icon={<FontAwesomeIcon icon={faFile} />}
							onClick={() => handleStatusClick('draft')}
						/>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default FilterModal;
