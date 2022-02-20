const core = require('@actions/core');
const { getDiffFiles } = require('./diff');

async function run() {
    try {
        const sourceBranch = core.getInput('source-branch');
        const targetBranch = core.getInput('target-branch');

        core.info(`source-branch: ${sourceBranch}`);
        core.info(`target-branch: ${targetBranch}`);

        const diff = await getDiffFiles(sourceBranch, targetBranch);

        core.setOutput('diff-summary', JSON.stringify(diff));
    } catch(err) {
        core.setFailed(err.message);
    }
}

run();
