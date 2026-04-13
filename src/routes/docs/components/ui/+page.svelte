<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Alert from '$lib/components/ui/Alert.svelte';
	import Tabs from '$lib/components/ui/Tabs.svelte';
	import Avatar from '$lib/components/ui/Avatar.svelte';
	import Spinner from '$lib/components/ui/Spinner.svelte';
	import Breadcrumb from '$lib/components/ui/Breadcrumb.svelte';
	import Modal from '$lib/components/ui/Modal.svelte';

	let activeTab = $state('buttons');
	let modalOpen = $state(false);
	let alertVisible = $state(true);

	const tabs = [
		{ id: 'buttons', label: 'Buttons' },
		{ id: 'badges', label: 'Badges' },
		{ id: 'alerts', label: 'Alerts' },
		{ id: 'avatars', label: 'Avatars' },
		{ id: 'misc', label: 'Misc' },
	];
</script>

<div class="space-y-6 p-6">
	<Breadcrumb items={[{ label: 'Docs', href: '/docs' }, { label: 'Components' }, { label: 'UI Elements' }]} />

	<div>
		<h1 class="text-2xl font-bold text-gray-900">UI Elements</h1>
		<p class="mt-1 text-sm text-gray-500">Core building blocks for the application.</p>
	</div>

	<Tabs {tabs} bind:activeTab>
		{#if activeTab === 'buttons'}
			<Card title="Button Variants">
				<div class="flex flex-wrap items-center gap-3">
					<Button>Primary</Button>
					<Button variant="secondary">Secondary</Button>
					<Button variant="ghost">Ghost</Button>
					<Button variant="danger">Danger</Button>
					<Button disabled>Disabled</Button>
				</div>
			</Card>
			<div class="mt-4">
				<Card title="Button Sizes">
					<div class="flex flex-wrap items-center gap-3">
						<Button size="sm">Small</Button>
						<Button size="md">Medium</Button>
						<Button size="lg">Large</Button>
					</div>
				</Card>
			</div>
		{:else if activeTab === 'badges'}
			<Card title="Badge Variants">
				<div class="flex flex-wrap items-center gap-3">
					<Badge>Default</Badge>
					<Badge variant="primary">Primary</Badge>
					<Badge variant="success">Success</Badge>
					<Badge variant="warning">Warning</Badge>
					<Badge variant="danger">Danger</Badge>
					<Badge variant="info">Info</Badge>
				</div>
			</Card>
			<div class="mt-4">
				<Card title="Badge Sizes">
					<div class="flex flex-wrap items-center gap-3">
						<Badge size="sm">Small</Badge>
						<Badge size="md">Medium</Badge>
					</div>
				</Card>
			</div>
		{:else if activeTab === 'alerts'}
			<div class="space-y-3">
				<Alert variant="info" title="Information">This is an informational alert.</Alert>
				<Alert variant="success" title="Success">Operation completed successfully.</Alert>
				<Alert variant="warning" title="Warning">Please review before continuing.</Alert>
				<Alert variant="error" title="Error">Something went wrong.</Alert>
				{#if alertVisible}
					<Alert variant="info" title="Dismissible" dismissible ondismiss={() => (alertVisible = false)}>
						Click the X to dismiss this alert.
					</Alert>
				{:else}
					<button class="text-sm text-indigo-600 hover:text-indigo-500" onclick={() => (alertVisible = true)}>Show dismissible alert again</button>
				{/if}
			</div>
		{:else if activeTab === 'avatars'}
			<Card title="Avatar Variants">
				<div class="flex flex-wrap items-end gap-4">
					<div class="text-center">
						<Avatar size="xs" name="Alice" />
						<p class="mt-1 text-xs text-gray-500">XS</p>
					</div>
					<div class="text-center">
						<Avatar size="sm" name="Bob Smith" />
						<p class="mt-1 text-xs text-gray-500">SM</p>
					</div>
					<div class="text-center">
						<Avatar size="md" name="Carol White" />
						<p class="mt-1 text-xs text-gray-500">MD</p>
					</div>
					<div class="text-center">
						<Avatar size="lg" name="Dan Brown" />
						<p class="mt-1 text-xs text-gray-500">LG</p>
					</div>
					<div class="text-center">
						<Avatar size="xl" name="Eve Davis" />
						<p class="mt-1 text-xs text-gray-500">XL</p>
					</div>
					<div class="text-center">
						<Avatar size="md" />
						<p class="mt-1 text-xs text-gray-500">No name</p>
					</div>
				</div>
			</Card>
		{:else if activeTab === 'misc'}
			<div class="space-y-4">
				<Card title="Spinners">
					<div class="flex items-center gap-6">
						<div class="text-center">
							<Spinner size="sm" />
							<p class="mt-2 text-xs text-gray-500">Small</p>
						</div>
						<div class="text-center">
							<Spinner size="md" />
							<p class="mt-2 text-xs text-gray-500">Medium</p>
						</div>
						<div class="text-center">
							<Spinner size="lg" />
							<p class="mt-2 text-xs text-gray-500">Large</p>
						</div>
					</div>
				</Card>
				<Card title="Modal">
					<Button onclick={() => (modalOpen = true)}>Open Modal</Button>
					<Modal bind:open={modalOpen} title="Example Modal" onclose={() => (modalOpen = false)}>
						<p class="text-sm text-gray-600">This is a modal dialog. Press Escape or click the backdrop to close.</p>
						{#snippet actions()}
							<Button variant="secondary" onclick={() => (modalOpen = false)}>Cancel</Button>
							<Button onclick={() => (modalOpen = false)}>Confirm</Button>
						{/snippet}
					</Modal>
				</Card>
				<Card title="Breadcrumb">
					<Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Docs', href: '/docs' }, { label: 'Components' }, { label: 'Current Page' }]} />
				</Card>
			</div>
		{/if}
	</Tabs>
</div>
