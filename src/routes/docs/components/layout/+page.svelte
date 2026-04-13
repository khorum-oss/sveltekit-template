<script lang="ts">
	import Card from '$lib/components/ui/Card.svelte';
	import Breadcrumb from '$lib/components/ui/Breadcrumb.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
</script>

<div class="space-y-6 p-6">
	<Breadcrumb items={[{ label: 'Docs', href: '/docs' }, { label: 'Components' }, { label: 'Layout' }]} />

	<div>
		<h1 class="text-2xl font-bold text-gray-900">Layout Components</h1>
		<p class="mt-1 text-sm text-gray-500">Structural components that form the application shell.</p>
	</div>

	<div class="space-y-4">
		<Card title="AppShell" subtitle="src/lib/components/layout/AppShell.svelte">
			<p class="text-sm text-gray-600">
				The root layout component. Composes TopNav, LeftNav, and the content area. Handles
				responsive sidebar behavior — desktop toggle and mobile overlay drawer.
			</p>
			<div class="mt-3 flex flex-wrap gap-2">
				<Badge variant="primary">TopNav</Badge>
				<Badge variant="primary">LeftNav</Badge>
				<Badge variant="primary">AuthGuard</Badge>
				<Badge>Responsive</Badge>
			</div>
		</Card>

		<Card title="TopNav" subtitle="src/lib/components/layout/TopNav.svelte">
			<p class="text-sm text-gray-600">
				Horizontal navigation bar with section tabs, dev mode toggle, and user menu.
				Sections are defined in <code class="rounded bg-gray-100 px-1">nav.config.ts</code>.
			</p>
			<div class="mt-3 flex flex-wrap gap-2">
				<Badge>Section Tabs</Badge>
				<Badge>DevModeToggle</Badge>
				<Badge>UserMenu</Badge>
				<Badge>Mobile Hamburger</Badge>
			</div>
		</Card>

		<Card title="LeftNav + NavTree" subtitle="src/lib/components/layout/LeftNav.svelte">
			<p class="text-sm text-gray-600">
				Collapsible sidebar with a recursive tree navigation. Tree depth is limited by
				<code class="rounded bg-gray-100 px-1">MAX_NAV_DEPTH</code> (default 3). Items
				are defined in <code class="rounded bg-gray-100 px-1">nav.config.ts</code>.
			</p>
			<div class="mt-3 flex flex-wrap gap-2">
				<Badge>Collapsible</Badge>
				<Badge>Recursive Tree</Badge>
				<Badge>Depth Limited</Badge>
				<Badge>Active State</Badge>
			</div>
		</Card>

		<Card title="UserMenu" subtitle="src/lib/components/layout/UserMenu.svelte">
			<p class="text-sm text-gray-600">
				Avatar dropdown on the far right of TopNav. Shows user initials/avatar, profile info,
				settings link, and sign out. Adapts based on auth state and whether auth is enabled.
			</p>
		</Card>

		<Card title="AuthGuard" subtitle="src/lib/components/auth/AuthGuard.svelte">
			<p class="text-sm text-gray-600">
				Wraps content area. When auth is enabled, checks authentication before rendering children.
				Redirects unauthenticated users to <code class="rounded bg-gray-100 px-1">/login</code>.
				When auth is disabled, renders immediately.
			</p>
		</Card>
	</div>
</div>
