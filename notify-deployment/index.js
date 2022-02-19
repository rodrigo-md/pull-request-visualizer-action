const core = require('@actions/core');
const github = require('@actions/github');
const { createMessage } = require('./utils');


async function run() {
    try {
    core.info('Initializating Octokit');

    const GITHUB_TOKEN = await core.getInput('GITHUB_TOKEN');
    const websiteUrl = await core.getInput('website-url');
    const octokit = github.getOctokit(GITHUB_TOKEN);
    const { context } = github;

    core.info(`Website url: ${websiteUrl}`);

    core.info('Writing comment in PR');

    await octokit.rest.issues.createComment({
        ...context.repo,
        issue_number: context.payload.pull_request.number,
        body: createMessage(websiteUrl)
    });



    core.info('Commented website url successfully');
    } catch(err) {
        core.setFailed(err.message);
    }
}

run();
