const slugify = require('voca/slugify');
const fs = require('fs');
const {scrapeTop10Recipes, scrapeRecipe} = require('./top10');
const path = require('path');

const logger = (err, result) => {
    if (err) return console.error('Top10 scraping failed:\n', err);

    console.log(result);
};

// scrapeTop10Recipes(logger);

scrapeRecipe(logger, 'http://mittkok.expressen.se/recept/ungersk-gulasch/');



function write(recipe, outputSubFolder = '') {
    const fileName = slugify(recipe.title) + '.json';
    const outputPath = path.resolve('output/', outputSubFolder, fileName);

    fs.writeFile(outputPath, JSON.stringify(recipe), 'utf8', (err) => {
        if (err) {
            console.error('Failed to create', fileName, err);
        }
        console.log('Created', fileName);
    });
}
