import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
	test('should load the dashboard', async ({ page }) => {
		await page.goto('/');
		await expect(page.locator('h1')).toContainText('Dashboard');
	});

	test('should show top nav sections', async ({ page }) => {
		await page.goto('/');
		await expect(page.locator('header')).toBeVisible();
		await expect(page.locator('header a:text("Dashboard")')).toBeVisible();
	});

	test('should show left nav tree', async ({ page }) => {
		await page.goto('/');
		const sidebar = page.getByTestId('left-nav');
		await expect(sidebar.locator('nav')).toBeVisible();
		await expect(sidebar.getByText('Getting Started')).toBeVisible();
	});

	test('should expand/collapse nav tree items', async ({ page }) => {
		await page.goto('/');
		const sidebar = page.getByTestId('left-nav');
		const gettingStarted = sidebar.getByText('Getting Started');
		await gettingStarted.click();
		await expect(sidebar.getByText('Overview')).toBeVisible();
		await gettingStarted.click();
		await expect(sidebar.getByText('Overview')).not.toBeVisible();
	});

	test('should show user menu', async ({ page }) => {
		await page.goto('/');
		await page.getByTestId('user-menu-toggle').click();
		await expect(page.getByText('Settings')).toBeVisible();
	});

	test('should navigate to settings', async ({ page }) => {
		await page.goto('/settings');
		await expect(page.locator('h1')).toContainText('Settings');
	});

	test('should show health endpoint', async ({ page }) => {
		const response = await page.request.get('/__health');
		expect(response.ok()).toBeTruthy();
		const body = await response.json();
		expect(body.status).toBe('ok');
	});
});
