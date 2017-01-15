const cheerio = require('cheerio');
const request = require('request');

const scrapeRecipe = require('./scrape-recipe');

function scrapeTop10Recipes(url, cb) {

    request(url, (error, response, html) => {
        if (error) {
            cb({msg: 'Failed to fetch gratin recipes page', error});
            return;
        }

        const $recipes = cheerio.load(html);
        const recipes = $recipes('.entry .title')
            .map((i, r) => $recipes(r).attr('href')).toArray();

        recipes.forEach(scrapeRecipe(cb));
    });
}

module.exports = scrapeTop10Recipes;