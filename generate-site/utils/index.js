module.exports.generateSite = function(commitHash) {
    return (`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Main project website</title>
</head>
<body>
    <h1>Autogenerate site using a GithubAction</h1>
    <h2>Commit: ${commitHash}</h2>
</body>
</html>
`);
}


module.exports.wait = async function (ms) {
    let timeoutId;
    return new Promise((resolve, _) => {
        timeoutId = setTimeout(resolve, ms);
    }).finally(() => clearTimeout(timeoutId));
}


module.exports.generateToml = function(folderName) {
    return (`
[build]
    base = "${folderName}/"

[context.deploy-preview]
    publish = "publish/"`);
}