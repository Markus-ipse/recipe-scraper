const cheerio = require('cheerio');
const request = require('request');
const slugify = require('voca/slugify');
const path = require('path');
const fs = require('fs');

function normalize(value) {
    if (typeof value !== 'string') return value;
    return value.trim().replace(/\s\s+/g, ' ').replace(/\n/gm, '')
}

const top10Url = 'http://mittkok.expressen.se/artikel/mitt-kok-kockarnas-10-basta-recept/';

request(top10Url, (error, response, html) => {
    if (error) {
        console.error('Failed to fetch top 10', error);
        return;
    }

    const $recipes = cheerio.load(html);
    const recipes = $recipes('.list-item--recept .list-item__link').map((i, r) => $recipes(r).attr('href')).toArray();

    recipes.forEach(url => {
        url = 'http:' + url;
        request(url, (error, response, html) => {
            if (error) {
                console.error('Failed to fetch url', url, error);
                return;
            }

            const $recipe = cheerio.load(html);

            const title = $recipe('.recipe__title').text();
            const portions = normalize($recipe('.recipe__ingredients--inner .recipe__portions').text());

            const ingredients = $recipe('.recipe__ingredients--inner li').map((i, r) => normalize(normalize($recipe(r).text()))).toArray();

            const recipe = {title, portions, ingredients, url};

            const fileName = slugify(title) + '.json';

            fs.writeFile('output/' + fileName, JSON.stringify(recipe), 'utf8', (err) => {
                if (err) {
                    console.error('Failed to create', fileName, err);
                }
                console.log('Created', fileName);
            });

        });
    });
});


/*

 */
