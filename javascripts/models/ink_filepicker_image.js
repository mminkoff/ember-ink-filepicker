((() => {
  'use strict';

  // model to hold and enhance a picked image
  EmberInkFilepicker.InkFilepickerImage = Ember.Object.extend({
    imageReceived(InkBlob) {
      this.set('imageUrl', InkBlob.url);
      this.set('filename', InkBlob.filename);
      this.set('size', Math.round((InkBlob.size / 1024 + 0.00001) * 100) / 100);
    },

    sizeReceived(metadata) {
      this.set('width', metadata.width);
      this.set('height', metadata.height);
      this.set('ready', true);
    },

    // computed properties to get converted images
    thumbImageUrl: (function () {
      // tack on conversion properties for small image
      var params = {};
      params = this.addWidth(params, 50);
      params = this.addHeight(params, 50);
      return this.setupConversion(this.get('imageUrl'), params);
    }).property('imageUrl'),

    mediumImageUrl: (function () {
      // tack on conversion properties for cacheable
      // medium image watermarked with Ink's logo
      var params = {};
      params = this.addHeight(params, 150);
      params = this.addWatermark(params);
      return this.setupConversion(this.get('imageUrl'), params);
    }).property('imageUrl'),

    // the width to use for a mediumImage
    // so it holds its place before the image itself is loaded
    mediumWidth: (function () {
      return Math.round(this.get('width') * 150 / this.get('height'));
    }).property('width'),

    setupConversion(originalUrl, params) {
      params.rotate = 'exif';
      params.cache = true;
      return originalUrl + '/convert?' + jQuery.param(params);
    },

    addWidth(params, width) {
      params.w = width;
      return params;
    },

    addHeight(params, height) {
      params.h = height;
      return params;
    },

    addWatermark(params, watermarkUrl) {
      params.watermark = watermarkUrl ||  'https://d3urzlae3olibs.cloudfront.net/ddfab59/img/ink/logo_inverted.png';
      params.waterposition = 'bottom,right';
      return params;
    }
  });
}))();
