import fs from 'node:fs';

import type { Load } from "@sveltejs/kit";

export const prerender = true;

const getDirectories = (source: string) => {
  return fs.readdirSync(source).reduce((acc, name) => {
    const path = `${source}/${name}`;
    if (fs.statSync(path).isDirectory()) {
      const readmePath = `${path}/README.md`;
      if (fs.existsSync(readmePath)) {
        const readme = fs.readFileSync(readmePath, 'utf-8');

        const yaml = readme.match(/---([\s\S]*?)---/)?.[1];

        if (yaml) {
          const meta = yaml.split('\n').reduce((acc, line) => {
            const index = line.indexOf(':');
            if (index === -1) return acc;
            const key = line.slice(0, index);
            const value = line.slice(index + 1);

            acc[key.trim()] = value?.trim();
            return acc;
          }, {} as { [key: string]: string });

          acc.push({ path: path.replace('src/components/', ''), ...meta });
        } else {
          acc.push({ path: path.replace('src/components/', '') });
        }
      } else {
        acc.push(...getDirectories(path));
      }
    }

    return acc.filter(Boolean);
  }, [] as { path: string, [key: string]: string }[]);
}


export const load: Load = async () => {
  const components = getDirectories('src/components');

  return { components };
};
