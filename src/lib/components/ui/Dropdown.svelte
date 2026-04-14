<script lang="ts">
	interface Option {
		value: string;
		label: string;
		disabled?: boolean;
	}

	interface Props {
		options: Option[];
		value?: string;
		placeholder?: string;
		label?: string;
		id?: string;
		disabled?: boolean;
		onchange?: (value: string) => void;
	}

	let { options, value = $bindable(''), placeholder = 'Select...', label, id, disabled = false, onchange }: Props = $props();

	function handleChange(e: Event) {
		const target = e.currentTarget as HTMLSelectElement;
		value = target.value;
		onchange?.(value);
	}
</script>

<div>
	{#if label}
		<label for={id} class="block text-sm font-medium text-gray-700">{label}</label>
	{/if}
	<select
		{id}
		{disabled}
		{value}
		onchange={handleChange}
		class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none disabled:bg-gray-50 disabled:text-gray-500"
	>
		{#if placeholder}
			<option value="" disabled>{placeholder}</option>
		{/if}
		{#each options as opt (opt.value)}
			<option value={opt.value} disabled={opt.disabled}>{opt.label}</option>
		{/each}
	</select>
</div>
