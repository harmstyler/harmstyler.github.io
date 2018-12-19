/*
Language: Smarty
Requires: xml.js
Author: Tyler Harms <tyler.harms@gmail.com>
Description: Smarty - the compiling PHP template engine
Category: template
*/
function (hljs) {
    var PARAMS = {
        className: 'params',
        begin: '\\(',
        end: '\\)'
    };

    var FUNCTION_NAMES = 'append assign config_load def include insert';

    var FUNCTIONS = {
        beginKeywords: FUNCTION_NAMES,
        keywords: {
            name: FUNCTION_NAMES
        },
        relevance: 0,
        contains: [
            PARAMS
        ]
    };

    var FILTER = {
        begin: /\|[A-Za-z_]+:?/,
        keywords: 'capitalize cat count_characters count_paragraphs count_sentences ' +
            'count_words date_format default escape from_charset indent lower nl2br ' +
            'regex_replace replace spacify string_format strip strip_tags to_charset ' +
            'truncate unescape upper wordwrap',
        contains: [
            FUNCTIONS
        ]
    };

    var TAGS = 'block for foreach literal if section strip while';

    TAGS = TAGS + ' ' + TAGS.split(' ').map(function (t) {
        return '/' + t
    }).join(' ');

    return {
        aliases: ['tpl'],
        case_insensitive: false,
        subLanguage: 'xml',
        contains: [
            hljs.COMMENT(/\{\*/, /\*}/),
            {
                className: 'template-tag',
                begin: /\{%/,
                end: /%}/,
                contains: [{
                    className: 'name',
                    begin: /\w+/,
                    keywords: TAGS,
                    starts: {
                        endsWithParent: true,
                        contains: [FILTER, FUNCTIONS],
                        relevance: 0
                    }
                }]
            },
            {
                className: 'template-variable',
                begin: /\{/,
                end: /}/,
                contains: ['self', FILTER, FUNCTIONS]
            }
        ]
    };
}
