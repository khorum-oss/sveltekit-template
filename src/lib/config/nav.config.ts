import type { NavItem, NavSection } from '$lib/types/nav';

export const MAX_NAV_DEPTH = 3;

export const topNavSections: NavSection[] = [
	{ id: 'dashboard', label: 'Dashboard', href: '/' },
	{ id: 'examples', label: 'Examples', href: '/examples' },
	{ id: 'docs', label: 'Docs', href: '/docs' }
];

export const leftNavItems: NavItem[] = [
	{
		id: 'getting-started',
		label: 'Getting Started',
		children: [
			{ id: 'overview', label: 'Overview', href: '/' },
			{ id: 'installation', label: 'Installation', href: '/docs/installation' },
			{
				id: 'configuration',
				label: 'Configuration',
				children: [
					{ id: 'env-vars', label: 'Environment Variables', href: '/docs/env' },
					{ id: 'data-sources', label: 'Data Sources', href: '/docs/data-sources' }
				]
			}
		]
	},
	{
		id: 'examples-nav',
		label: 'Examples',
		children: [
			{ id: 'data-table', label: 'Data Table', href: '/examples' },
			{ id: 'file-tree', label: 'File Tree', href: '/examples/file-tree' }
		]
	},
	{
		id: 'components',
		label: 'Components',
		children: [
			{ id: 'layout-components', label: 'Layout', href: '/docs/components/layout' },
			{ id: 'form-components', label: 'Forms', href: '/docs/components/forms' },
			{ id: 'ui-components', label: 'UI Elements', href: '/docs/components/ui' }
		]
	},
	{
		id: 'api',
		label: 'API Reference',
		href: '/docs/api'
	}
];
