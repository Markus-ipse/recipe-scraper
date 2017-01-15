const cheerio = require('cheerio');

const consecutiveSpaces = /\s\s+/g;
const lineBreaks = /\n/gm;

const normalize = (value) => {
    if (typeof value !== 'string') return value;
    return value.trim()
        .replace(consecutiveSpaces, ' ')
        .replace(lineBreaks, '');
};

const wrapNode = (node) => typeof node.text === 'function' ? node: cheerio(node);
const getText = (node) => normalize(wrapNode(node).text());


module.exports = {
    getText,
    normalize,
    wrapNode
};
