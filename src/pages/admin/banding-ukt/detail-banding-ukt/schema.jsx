import { z } from 'zod';
import { uktAppealsStatusOptions } from '@/utils/ukt-appeals';

export const updateAppealStatusSchema = z.object({
	status: z.enum(
		uktAppealsStatusOptions.map((appeal) => appeal.value),
		{
			required_error: 'Status wajib diisi',
			invalid_type_error: 'Status hanya boleh bernilai pending, under_review, approved, atau rejected',
		}
	),

	admin_note: z.string().optional(),
});
