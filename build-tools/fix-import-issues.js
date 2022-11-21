import fs from 'fs';
import path from 'path';

function saveFileResult(file, result) {
    fs.writeFileSync(file, result);
}

function replaceOcurrency(file, importSrc, fileContent) {
    let regex = new RegExp(`from\.\*${importSrc}.*`, 'ig');
    let resultContent = fileContent.replaceAll(regex, `from '${importSrc}.js';`);
    saveFileResult(file, resultContent);
}

function isDirectory(directory, file) {
    return fs.lstatSync(path.resolve(path.join(directory, file))).isDirectory();
}

function findJsFilesInDirectory(directory) {
    fs.readdir(directory, function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        files.forEach(function (file) {
            if (isDirectory(directory, file)) {
                findJsFilesInDirectory(path.resolve(directory, file));
            } else {
                checkImports(path.resolve(path.join(directory, file)))
            }
        });
    });
}

function cleanImport(importSrc) {
    importSrc = importSrc[0]
    importSrc = importSrc.replaceAll('"', '')
    importSrc = importSrc.replaceAll('\'', '')
    importSrc = importSrc.replace('from', '')
    importSrc = importSrc.trim()
    return importSrc
}

function resolveFilePath(filePath, importSrc) {
    return path.resolve(path.join(filePath, importSrc));
}

function fixImports(importSrc, file, fileContent) {
    importSrc = cleanImport(importSrc)
    let filePath = path.dirname(file)
    let jsExist = jsFileExists(filePath, importSrc);

    if (jsExist) {
        console.log(jsExist)
        replaceOcurrency(file, importSrc, fileContent);
    }
}

function jsFileExists(filePath, importSrc) {
    return fs.existsSync(resolveFilePath(filePath, `${importSrc}.js`));
}

function isJsFile(file) {
    return !!file.includes(".js");
}

function checkImports(file) {
    let fileContent = fs.readFileSync(file, 'utf-8');

    if (isJsFile(file)) {
        let rgx = /.*import.*from.*/ig
        let ocurrences = fileContent.match(rgx);

        for (let ocurrency of ocurrences) {
            let importSrc = ocurrency.match(/from.*[\',\"].*[\',\"]/g);
            if (!!importSrc) {
                fixImports(importSrc, file, fileContent);
            }
        }
    }
}

const directory = path.resolve('./dist-ssr');
findJsFilesInDirectory(directory)

