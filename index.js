const slugify = require('voca/slugify');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const curry = require('ramda/src/curry');

const {scrapeTop10Recipes, scrapeRecipe} = require('./top10');

const logger = (err, result) => {
    if (err) return console.error('Scraping failed:\n', err);

    console.log(result);
};

scrapeTop10Recipes(curry(write)('top10'));

// scrapeRecipe(logger, 'http://mittkok.expressen.se/recept/ungersk-gulasch/');

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
