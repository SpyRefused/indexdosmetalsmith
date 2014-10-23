var metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var highlight = require('highlight.js');
var templates = require('metalsmith-templates');
var permalinks = require('metalsmith-permalinks');
var collections = require('metalsmith-collections');

metalsmith(__dirname)

.source('src')

.use(collections({
    articles: {
        pattern: 'articles/**/*.md',
        sortBy: 'date',
        reverse: true
    }
}))

.use(markdown({
    gfm: true,
    tables: true,
    highlight: function(code, lang) {
        if (!lang) {
            return code;
        }

        try {
            return highlight.highlight(lang, code).value;
        } catch (e) {
            return code;
        }
    }
}))

.use(permalinks())

.use(templates({
    engine: 'jade',
    directory: 'templates'
}))

.destination('build')

.build(function(err) {
    if (err) {
        throw err;
    }
    console.log('done');
});