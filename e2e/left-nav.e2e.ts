import { test, expect } from '@playwright/test';

test.describe('Left Navigation Sidebar', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('should be visible and expanded by default', async ({ page }) => {
		const sidebar = page.getByTestId('left-nav');
		await expect(sidebar).toBeVisible();
		await expect(sidebar).toHaveAttribute('data-collapsed', 'false');
		await expect(sidebar.getByText('Navigation')).toBeVisible();
		await expect(sidebar.getByText('Getting Started')).toBeVisible();
	});

	test('should collapse to a rail with toggle button still visible', async ({ page }) => {
		const sidebar = page.getByTestId('left-nav');
		const toggle = page.getByTestId('sidebar-toggle');

		// Collapse
		await toggle.click();
		await expect(sidebar).toHaveAttribute('data-collapsed', 'true');

		// Nav tree content should be hidden
		await expect(sidebar.getByText('Navigation')).not.toBeVisible();
		await expect(sidebar.getByText('Getting Started')).not.toBeVisible();

		// Toggle button must still be visible so user can expand again
		await expect(toggle).toBeVisible();

		// Sidebar should still be visible, just narrow (wait for CSS transition)
		await expect(sidebar).toBeVisible();
		await expect
			.poll(async () => {
				const box = await sidebar.boundingBox();
				return box?.width ?? 0;
			})
			.toBeLessThan(100);
	});

	test('should expand back to full width after collapse', async ({ page }) => {
		const sidebar = page.getByTestId('left-nav');
		const toggle = page.getByTestId('sidebar-toggle');

		// Collapse then expand
		await toggle.click();
		await expect(sidebar).toHaveAttribute('data-collapsed', 'true');

		await toggle.click();
		await expect(sidebar).toHaveAttribute('data-collapsed', 'false');

		// Nav content should be visible again
		await expect(sidebar.getByText('Navigation')).toBeVisible();
		await expect(sidebar.getByText('Getting Started')).toBeVisible();

		// Sidebar should be full width (wait for CSS transition)
		await expect
			.poll(async () => {
				const box = await sidebar.boundingBox();
				return box?.width ?? 0;
			})
			.toBeGreaterThanOrEqual(200);
	});

	test('should toggle multiple times without breaking', async ({ page }) => {
		const sidebar = page.getByTestId('left-nav');
		const toggle = page.getByTestId('sidebar-toggle');

		for (let i = 0; i < 5; i++) {
			await toggle.click();
			await expect(sidebar).toHaveAttribute('data-collapsed', 'true');
			await toggle.click();
			await expect(sidebar).toHaveAttribute('data-collapsed', 'false');
		}

		// After all toggles, everything should still work
		await expect(sidebar.getByText('Navigation')).toBeVisible();
		await expect(toggle).toBeVisible();
	});

	test('should expand tree items within the sidebar', async ({ page }) => {
		const sidebar = page.getByTestId('left-nav');

		// Click "Getting Started" to expand its children
		await sidebar.getByText('Getting Started').click();
		await expect(sidebar.getByText('Overview')).toBeVisible();
		await expect(sidebar.getByText('Installation')).toBeVisible();

		// Collapse sidebar - tree content disappears
		const toggle = page.getByTestId('sidebar-toggle');
		await toggle.click();
		await expect(sidebar.getByText('Overview')).not.toBeVisible();

		// Expand sidebar - tree is rendered again
		await toggle.click();
		await expect(sidebar.getByText('Getting Started')).toBeVisible();
	});
});
