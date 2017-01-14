const path = require('path');
const read = require('fs').readFileSync;
const html = read(path.resolve(__dirname, 'pages/mitt_kok_10_best_recepies.html'));
const html2 = read(path.resolve(__dirname, 'pages/mitt_kok_hamburger.html'));
const x = require('x-ray')({
    filters: {
        normalize: function(value) {
            if (typeof value !== 'string') return value;
            return value.trim().replace(/\s\s+/g, ' ').replace(/\n/gm,'')
        }
    }
});

x(html, '.list-item--recept', [{
    title: '.list-item__content__title',
    link: '.list-item__link@href',
    recipe: x('.list-item__link@href', '.recipe__ingredients--inner', [{
        portions: '.recipe__portions | normalize',
        ingredients: ['li | normalize']
    }])
}])(console.log);

// http://mittkok.expressen.se/artikel/mitt-kok-kockarnas-10-basta-recept/
/*
x(html, '.list-item--recept', [{
    title: '.list-item__content__title',
    link: '.list-item__link@href'
}])(console.log);
*/

/*
x(html2, '.recipe__ingredients--inner', [{
    portions: '.recipe__portions | normalize',
    ingredients: ['li | normalize']
}])(console.log);*/
