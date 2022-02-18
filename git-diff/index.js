const core = require('@actions/core');
const { getDiffFiles } = require('./diff');

async function run() {
    try {
        const sourceBranch = core.getInput('source-branch');
        const targetBranch = core.getInput('targe-branch');

        core.info(`source-branch: ${sourceBranch}`);
        core.info(`target-branch: ${targetBranch}`);

        core.info('process.env', process.env);

        const diff = await getDiffFiles(sourceBranch, targetBranch);

        core.setOutput('diff-summary', JSON.stringify(diff));
    } catch(err) {
        core.setFailed(err.message);
    }
}

run();