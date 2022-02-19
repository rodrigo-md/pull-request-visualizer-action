module.exports.createMessage = function(websiteUrl) {
    return (`
### :heavy_check_mark: Pull request preview ready!
:eyes: Browse the preview here: ${websiteUrl}

    `);
}