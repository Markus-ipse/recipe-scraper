const cheerio = require('cheerio');
const request = require('request');

const scrapeRecipe = require('./scrape-recipe');

const top10Url = 'http://mittkok.expressen.se/artikel/mitt-kok-kockarnas-10-basta-recept/';

function scrapeTop10Recipes(cb) {

    request(top10Url, (error, response, html) => {
        if (error) {
            cb({msg: 'Failed to fetch top 10', error});
            return;
        }

        const $recipes = cheerio.load(html);
        const recipes = $recipes('.list-item--recept .list-item__link')
            .map((i, r) => $recipes(r).attr('href')).toArray();

        recipes.forEach(scrapeRecipe(cb));
    });
}

module.exports = scrapeTop10Recipes;
