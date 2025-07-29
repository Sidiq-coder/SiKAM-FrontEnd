export function formatDate(dateString) {
	const date = new Date(dateString);
	return new Intl.DateTimeFormat('en-GB', {
		day: '2-digit',
		month: 'short',
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
	}).format(date);
}

export function timeAgo(dateString) {
	const now = new Date();
	const date = new Date(dateString);
	const diffMs = now.getTime() - date.getTime();

	const diffMinutes = Math.floor(diffMs / (1000 * 60));
	const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
	const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

	if (diffMinutes < 1) return 'baru saja';
	if (diffMinutes < 60) return `${diffMinutes} menit lalu`;
	if (diffHours < 24) return `${diffHours} jam lalu`;
	return `${diffDays} hari lalu`;
}
