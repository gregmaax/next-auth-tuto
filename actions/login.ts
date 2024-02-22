'use server';

import { LoginSchema } from '@/schemas';
import { z } from 'zod';

export const login = async (values: z.infer<typeof LoginSchema>) => {
	const validatedFields = LoginSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: 'Invalid fields.' };
	}

	if (validatedFields.success) {
		return { success: 'Email sent !' };
	}
	console.log(values);
};
