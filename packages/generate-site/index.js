const fs = require('fs/promises');
const core = require('@actions/core');
const path = require('path');
const { generateSite, wait, generateToml } = require('./utils');


async function run() {
    try {

        const commitHash = await core.getInput('commit-hash');
        const waitMs = parseInt(await core.getInput('wait'));
        const baseDirectory = await core.getInput('base-directory');
        const folderName = '.pr-site'
        const site = generateSite(commitHash);
        const netlifyConfig = generateToml(folderName);

        core.info('Building project...');
        await wait(waitMs);
        core.info('Creating folders...');
        await fs.mkdir(path.join(baseDirectory, folderName, 'publish'), { recursive: true });
        core.info('Folders created');

        core.info('Creating site...')
        core.info(path.join(baseDirectory, folderName, 'publish', 'index.html'))
        await fs.writeFile(path.join(baseDirectory, folderName, 'publish', 'index.html'), site);
        core.info('Site created');

        core.info('Creating .toml file for deployment');
        core.info(path.join(baseDirectory, folderName, 'netlify.toml'))
        await fs.writeFile(path.join(baseDirectory, folderName, 'netlify.toml'), netlifyConfig);
        core.info('Project created successfully');
    } catch(err) {
        core.info('Unable to create project');
        console.error(err);
    }
}






run();