'use server';

import bcrypt from 'bcrypt';

import { db } from '@/lib/db';

import { RegisterSchema } from '@/schemas';
import { z } from 'zod';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
	const validatedFields = RegisterSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: 'Invalid fields.' };
	}

	//encrypt password
	const { email, password, name } = validatedFields.data;
	const hashedPassword = await bcrypt.hash(password, 10);

	//checking if user exists already
	const existingUser = await db.user.findUnique({
		where: {
			email,
		},
	});

	if (existingUser) {
		return { error: 'Email already in use!' };
	}

	await db.user.create({
		data: {
			name,
			email,
			password: hashedPassword,
		},
	});

	//TODO: send verification token email

	return { success: 'User created !' };
};
