<script lang="ts">
	import type { Snippet } from 'svelte';

	type BorderRevealProps = {
		onClick: () => void;
		children: Snippet;
		style?: 'single' | 'double';
	};

	let { style = 'double', onClick, children }: BorderRevealProps = $props();
	let buttonRef: HTMLButtonElement;

	const setAngle = (event: PointerEvent) => {
		const { clientX: x, clientY: y } = event;
		const { left, top, width, height } = buttonRef.getBoundingClientRect();
		const center = {
			x: left + width * 0.5,
			y: top + height * 0.5
		};
		const delta = {
			x: x - center.x,
			y: y - center.y
		};
		const radians = Math.atan2(delta.y, delta.x);
		const degrees = radians * (180 / Math.PI);

		buttonRef.style.setProperty('--from', ((degrees + 360 + 90) % 360).toString());
	};

	$effect(() => {
		buttonRef.addEventListener('pointerenter', setAngle);
		buttonRef.addEventListener('pointerleave', setAngle);
	});
</script>

<button bind:this={buttonRef} onclick={onClick} class={`border-reveal ${style}`}>
	{@render children()}
</button>

<style scoped>
	:root {
		--border: 2;
		--border-gradient: linear-gradient(65deg, hsl(280 90% 60%), hsl(35 100% 55%), hsl(10 100% 55%));
		--bg: #fff;
		--color: #4b5563;
	}

	.border-reveal:is(:hover, :focus-visible) {
		--complete: 100;
	}
	.border-reveal {
		cursor: pointer;
		color: var(--color);
		position: relative;
		padding: 0.5rem 1rem;
		border: calc(var(--border) * 1px) solid transparent;
		background: linear-gradient(var(--bg), var(--bg)) padding-box;
		font-family: sans-serif;
		border-radius: 12px;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		outline-offset: 0.25rem;
		outline-color: hsl(210 100% 60%);
	}

	.border-reveal::after,
	.border-reveal::before {
		content: '';
		border-radius: 12px;
		position: absolute;
		inset: calc(var(--border) * -1px);
		z-index: -1;
	}

	.border-reveal::before {
		background: #f3f4f6;
	}

	.border-reveal::after {
		background: var(--border-gradient);
		transition: --complete 0.6s;
		transition-timing-function: linear(
			0 0%,
			0.0027 3.64%,
			0.0106 7.29%,
			0.0425 14.58%,
			0.0957 21.87%,
			0.1701 29.16%,
			0.2477 35.19%,
			0.3401 41.23%,
			0.5982 55.18%,
			0.7044 61.56%,
			0.7987 68.28%,
			0.875 75%,
			0.9297 81.25%,
			0.9687 87.5%,
			0.9922 93.75%,
			1 100%
		);
	}

	.single::after {
		mask: conic-gradient(
			from calc(var(--from, 0) * 1deg),
			#000 calc(var(--complete) * 1%),
			#0000 calc(var(--complete) * 1%)
		);
	}

	.double::after {
		mask: conic-gradient(
			from calc(var(--from, 0) * 1deg),
			#000 calc(var(--complete) * 1%),
			#0000 calc(var(--complete) * 1%),
			#0000 calc((100 - var(--complete)) * 1%),
			#000 calc((100 - var(--complete)) * 1%)
		);
	}
</style>
