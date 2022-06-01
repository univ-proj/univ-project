import { Tree, formatFiles, installPackagesTask } from '@nrwl/devkit';

import { componentGenerator, storiesGenerator } from '@nrwl/react';

export default async function (tree: Tree, schema: any) {
  await componentGenerator(tree, {
    project: 'ui',
    directory: `lib/${schema.directory}`,
    name: schema.componentName,
    style: 'css',
  });

  await storiesGenerator(tree, { project: 'ui', generateCypressSpecs: false });

  await formatFiles(tree);
  return () => {
    installPackagesTask(tree);
  };
}
