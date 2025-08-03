import { useMemo } from 'react';
import { reportCategories } from '@/utils/reports';

const useFilteredReports = ({ reports, user, activeTab }) => {
	const filteredReports = useMemo(() => {
		return activeTab === 'laporan-saya' ? reports.filter((r) => r.student_id === user?.id) : reports;
	}, [activeTab, reports, user?.id]);

	const categorizedReports = useMemo(() => {
		if (!filteredReports) return reportCategories.map((cat) => ({ ...cat, quantity: 0 }));

		const categoryMap = filteredReports.reduce((acc, r) => {
			const key = r.category;
			if (!key) return acc;
			acc[key] = acc[key] || { value: key, quantity: 0 };
			acc[key].quantity += 1;
			return acc;
		}, {});

		return reportCategories.map((cat) => ({
			...cat,
			quantity: categoryMap[cat.value]?.quantity || 0,
		}));
	}, [filteredReports]);

	return { filteredReports, categorizedReports };
};

export default useFilteredReports;
