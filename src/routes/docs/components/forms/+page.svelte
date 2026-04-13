<script lang="ts">
	import Input from '$lib/components/ui/Input.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Dropdown from '$lib/components/ui/Dropdown.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Breadcrumb from '$lib/components/ui/Breadcrumb.svelte';

	let name = $state('');
	let email = $state('');
	let role = $state('');
	let bio = $state('');
	let submitted = $state(false);

	const roleOptions = [
		{ value: 'admin', label: 'Admin' },
		{ value: 'editor', label: 'Editor' },
		{ value: 'viewer', label: 'Viewer' },
		{ value: 'guest', label: 'Guest (read-only)', disabled: true },
	];

	function handleSubmit(e: Event) {
		e.preventDefault();
		submitted = true;
		setTimeout(() => (submitted = false), 2000);
	}
</script>

<div class="space-y-6 p-6">
	<Breadcrumb items={[{ label: 'Docs', href: '/docs' }, { label: 'Components' }, { label: 'Forms' }]} />

	<div>
		<h1 class="text-2xl font-bold text-gray-900">Form Components</h1>
		<p class="mt-1 text-sm text-gray-500">Input fields, dropdowns, and form patterns.</p>
	</div>

	<div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
		<Card title="Text Inputs">
			<div class="space-y-4">
				<Input id="name" label="Name" bind:value={name} placeholder="Enter your name" />
				<Input id="email" label="Email" type="email" bind:value={email} placeholder="you@example.com" />
				<Input id="error-demo" label="With Error" value="bad input" error="This field has an error" />
				<Input id="disabled-demo" label="Disabled" value="Can't edit this" disabled />
			</div>
		</Card>

		<Card title="Dropdown Select">
			<div class="space-y-4">
				<Dropdown
					id="role"
					label="Role"
					options={roleOptions}
					bind:value={role}
					placeholder="Choose a role..."
				/>
				<Dropdown
					id="disabled-dropdown"
					label="Disabled Dropdown"
					options={roleOptions}
					value="editor"
					disabled
				/>
				<p class="text-sm text-gray-500">Selected: <span class="font-medium">{role || 'none'}</span></p>
			</div>
		</Card>
	</div>

	<Card title="Example Form">
		<form onsubmit={handleSubmit} class="space-y-4">
			<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<Input id="form-name" label="Full Name" bind:value={name} required />
				<Input id="form-email" label="Email" type="email" bind:value={email} required />
			</div>
			<Dropdown id="form-role" label="Role" options={roleOptions} bind:value={role} />
			<div>
				<label for="bio" class="block text-sm font-medium text-gray-700">Bio</label>
				<textarea
					id="bio"
					bind:value={bio}
					rows={3}
					class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none"
					placeholder="Tell us about yourself..."
				></textarea>
			</div>
			<div class="flex items-center gap-3">
				<Button type="submit">Submit</Button>
				<Button variant="secondary" type="reset">Reset</Button>
				{#if submitted}
					<span class="text-sm text-green-600">Form submitted!</span>
				{/if}
			</div>
		</form>
	</Card>
</div>
