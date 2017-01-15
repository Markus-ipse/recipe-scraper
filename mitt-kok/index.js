const slugify = require('voca/slugify');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const curry = require('ramda/src/curry');

const scrapeTop10Recipes = require('./mitt-kok/top10-page');
const scrapeCategoryPage = require('./mitt-kok/catergory-page');

const logger = (err, result) => {
    if (err) return console.error('Scraping failed:\n', err);

    console.log(result);
};

const write = (outputSubFolder, err, recipe) => {
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
};

const scrape = () => {
    const baseUrl = 'http://mittkok.expressen.se';
    scrapeTop10Recipes(curry(write)('top10'));
    scrapeCategoryPage('/gratang-recept-fran-mitt-kok/', curry(write)('gratin'));
    scrapeCategoryPage(baseUrl + '/recept-och-tips/grytor-recept-fran-mitt-kok-expressen/', curry(write)('casserole'));
    scrapeCategoryPage(baseUrl + '/recept-och-tips/grytor-vegetariska-recept-fran-mitt-kok-expressen/', curry(write)('veg-casserole'));
    scrapeCategoryPage(baseUrl + '/recept-och-tips/grytor-med-fisk-recept-fran-mitt-kok-expressen/', curry(write)('fish-casserole'));
    scrapeCategoryPage(baseUrl + '/recept-och-tips/pajer-recept-fran-mitt-kok-expressen/', curry(write)('pie'));
    scrapeCategoryPage(baseUrl + '/kottfars/', curry(write)('minced-meat'));
    scrapeCategoryPage(baseUrl + '/pasta/', curry(write)('pasta'));
    scrapeCategoryPage(baseUrl + '/grilla/', curry(write)('grilled'));
    scrapeCategoryPage(baseUrl + '/lax/', curry(write)('salmon'));
};

module.exports = scrape;