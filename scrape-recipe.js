const cheerio = require('cheerio');
const request = require('request');
const curry = require('ramda/src/curry');

const {getText} = require('./utils');

const scrapeRecipe = curry((cb, url) => {

    url = url.startsWith('http:') ? url: 'http:' + url;

    request(url, (error, response, html) => {
        if (error) {
            cb({msg: 'Failed to fetch url: ' + url, error});
            return;
        }

        const $recipe = cheerio.load(html);

        const title = getText($recipe('.recipe__title'));
        const portions = getText($recipe('.recipe__ingredients--inner .recipe__portions'));

        const ingredients = $recipe('.recipe__ingredients--inner li')
            .map((i, node) => getText(node))
            .toArray();

        const recipe = {title, portions, ingredients, url};

        if (!title || !portions || ingredients.length === 0) {
            return console.warn('Couldn\'t create create complete recipe', recipe);
        }

        cb(null, recipe);

    });
});

module.exports = scrapeRecipe;
