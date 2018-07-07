'use strict';

module.exports = function(Model, options) {
  const sanitizeHtml = require('sanitize-html');

  const sanitize = (dirty) => {
    return sanitizeHtml(dirty, {
      allowedTags: [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'u', 'b',
        'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div', 'table',
        'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'img', 'span',
        'ul', 'ol', 'nl', 'li',
      ],
      allowedAttributes: {
        '*': ['style', 'class'],
        a: ['href'],
        img: ['src'],
      },
      selfClosing: [
        'img', 'br', 'hr', 'area', 'base', 'basefont', 'input', 'link', 'meta',
      ],
      transformTags: {
        'a': sanitizeHtml.simpleTransform('a', {
          target: '_blank',
          rel: 'nofollow',
        }),
      },
    });
  };

  Model.observe('before save', function event(ctx, next) {
    if (ctx.instance) {
      options.fields.forEach(field => {
        ctx.instance[field] = sanitize(ctx.instance[field]);
      });
    } else {
      options.fields.forEach(field => {
        ctx.data[field] = sanitize(ctx.instance[field]);
      });
    }
    next();
  });
};
