const slugify = require('voca/slugify');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const curry = require('ramda/src/curry');

const scrapeTop10Recipes = require('./top10-page');
const scrapeCategoryPage = require('./catergory-page');

const logger = (err, result) => {
    if (err) return console.error('Scraping failed:\n', err);

    console.log(result);
};

// scrapeTop10Recipes(curry(write)('top10'));

const baseUrl = 'http://mittkok.expressen.se/recept-och-tips';
// scrapeCategoryPage('/gratang-recept-fran-mitt-kok/', curry(write)('gratin'));
// scrapeCategoryPage(baseUrl + '/grytor-recept-fran-mitt-kok-expressen/', curry(write)('casserole'));
// scrapeCategoryPage(baseUrl + '/grytor-vegetariska-recept-fran-mitt-kok-expressen/', curry(write)('veg-casserole'));
// scrapeCategoryPage(baseUrl + '/grytor-med-fisk-recept-fran-mitt-kok-expressen/', curry(write)('fish-casserole'));
// scrapeCategoryPage(baseUrl + '/pajer-recept-fran-mitt-kok-expressen/', curry(write)('pie'));
// scrapeCategoryPage('http://mittkok.expressen.se/kottfars/', curry(write)('minced-meat'));
// scrapeCategoryPage('http://mittkok.expressen.se/pasta/', curry(write)('pasta'));
// scrapeCategoryPage('http://mittkok.expressen.se/grilla/', curry(write)('grilled'));
scrapeCategoryPage('http://mittkok.expressen.se/lax/', curry(write)('salmon'));

function write(outputSubFolder, err, recipe) {
    if (err) return console.error('Scraping failed:\n', err);

    const fileName = slugify(recipe.title) + '.json';
    const outputPath = path.resolve('output/', outputSubFolder, fileName);

    mkdirp(path.dirname(outputPath), (err) => {
        if (err) return console.error('Couldn\'t create path', path, err);

        fs.writeFile(outputPath, JSON.stringify(recipe), 'utf8', (err) => {
            if (err) return console.error('Failed to create', fileName, err);
            console.log('Created', fileName);
        });
    });
}
