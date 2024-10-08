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

<button
	bind:this={buttonRef}
	onclick={onClick}
	class={`border-reveal relative flex items-center gap-2 bg-white border border-2 border-transparent
  before:absolute after:absolute
  before:rounded-xl after:rounded-xl
  before:-z-1 after:-z-1
  before:inset-[-2px] after:inset-[-2px]
  before:bg-gray-100
  focus-visible:outline-2 rounded-xl
  focus-visible:outline-offset-2 px-4 py-2 cursor-pointer font-sans
  text-gray-600  ${style}`}
>
	{@render children()}
</button>

<style scoped>
	:root {
		--border: 2;
		--border-gradient: linear-gradient(65deg, hsl(280 90% 60%), hsl(35 100% 55%), hsl(10 100% 55%));
	}

	@property --complete {
		initial-value: 0;
		syntax: '<number>';
		inherits: true;
	}

	.border-reveal:is(:hover, :focus-visible) {
		--complete: 100;
	}

	.border-reveal {
		background: linear-gradient(var(--color-white, #fff), var(--color-white, #fff)) padding-box;
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
