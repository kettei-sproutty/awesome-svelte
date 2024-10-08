import fs from 'node:fs';

import type { Load } from '@sveltejs/kit';

export const prerender = true;
// export const csr = false
type Components = {} & { [key: string]: string | string[] };

const analyze = (path: string): Components[] => {
	const readme = fs.readFileSync(`${path}/README.md`, 'utf-8');

	const yaml = readme.match(/---([\s\S]*?)---/)?.[1];
	if (!yaml) return [];

	// TODO: use a yaml parser
	const meta = yaml.split('\n').reduce(
		(acc, line) => {
			const index = line.indexOf(':');
			if (index === -1) return acc;

			const key = line.slice(0, index);
			const value = line.slice(index + 1);

			acc[key.trim()] = value?.trim();
			return acc;
		},
		{} as { [key: string]: string }
	);

	const otherVersions = fs
		.readdirSync(path)
		.filter((f) => f !== 'README.md' && f !== 'index.svelte')
		.map((f) => f.replace(path, '').replace('.svelte', ''));

	return [
		{
			...meta,
			otherVersions
		}
	];
};

const walk = (dir: string): Components[] => {
	return fs.readdirSync(dir).flatMap((f) => {
		const path = `${dir}/${f}`;
		const stat = fs.statSync(path);

		const readmePath = `${path}/README.md`;

		if (fs.existsSync(readmePath)) {
			return analyze(path);
		} else if (stat.isDirectory()) {
			return walk(path);
		}

		return [];
	});
};

export const load: Load = async () => {
	const components = walk('src/components');

	return { components };
};
