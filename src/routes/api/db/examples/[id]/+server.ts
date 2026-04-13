import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { examples } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const GET: RequestHandler = async ({ params }) => {
	const [item] = await db.select().from(examples).where(eq(examples.id, params.id));
	if (!item) throw error(404, 'Not found');
	return json(item);
};

export const PUT: RequestHandler = async ({ params, request }) => {
	const body = await request.json();
	const updates: Record<string, unknown> = { updatedAt: new Date().toISOString() };
	if (body.title !== undefined) updates.title = String(body.title);
	if (body.description !== undefined) updates.description = String(body.description);
	if (body.priority !== undefined) updates.priority = Number(body.priority);

	const [item] = await db
		.update(examples)
		.set(updates)
		.where(eq(examples.id, params.id))
		.returning();
	if (!item) throw error(404, 'Not found');
	return json(item);
};

export const DELETE: RequestHandler = async ({ params }) => {
	await db.delete(examples).where(eq(examples.id, params.id));
	return new Response(null, { status: 204 });
};
