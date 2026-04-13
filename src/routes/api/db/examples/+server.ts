import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { examples } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const GET: RequestHandler = async () => {
	const items = await db.select().from(examples).all();
	return json(items);
};

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json();
	const [item] = await db
		.insert(examples)
		.values({
			title: body.title,
			description: body.description ?? '',
			priority: body.priority ?? 1
		})
		.returning();
	return json(item, { status: 201 });
};
