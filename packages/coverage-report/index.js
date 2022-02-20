const fs = require('fs');
const { readFile } = require("fs/promises");
const core = require('@actions/core');
const artifact = require('@actions/artifact');

const artifactClient = artifact.create();

async function retrieveFile(path, artifactName) {
    if(fs.existsSync(path)) {
        return readFile(path, { encoding: 'utf8' });
    }

    return artifactClient.downloadArtifact(artifactName, path);
}

async function run() {
    try {
        const useCoverageReport = core.getInput('use-coverage-report') === 'true';
        const coverageArtifactPath = core.getInput('coverage-artifact-path');
        const coverageArtifactName = core.getInput('coverage-artifact-name');

        core.info(`use-coverage-report: ${useCoverageReport}`);
        core.info(`coverage-artifact-path: ${coverageArtifactPath}`);
        core.info(`coverage-artifact-name: ${coverageArtifactName}`);

        if(useCoverageReport) {
            core.info('Uses coverage report');
            core.info('Trying to retrieve coverage report file...');

            if (!coverageArtifactPath) {
                throw new Error('Coverage artifact path not specified');
            }

            if (!coverageArtifactName) {
                throw new Error('Coverage artifact name not specified');
            }

            const downloadResponse  = await retrieveFile(coverageArtifactPath, coverageArtifactName);

            core.info('Coverage report file retrieved successfully');

            core.info(downloadResponse);
        }
    } catch(err) {
        core.setFailed(err.message);
    }
}

run();
