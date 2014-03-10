(function () {
  'use strict';

  EmberInkFilepicker.IndexController = Ember.ArrayController.extend({
    actions: {
      pickWithFilepicker: function () {
	var newImg, fp;
	newImg = EmberInkFilepicker.InkFilepickerImage.create({ready: false});
	this.get('model').pushObject(newImg);
	this.set('selectedImage', newImg);
	fp = EmberInkFilepicker.FilepickerController.create({
	  content: newImg,
	  errors: this.get('errors')
	});
	fp.pick('image');
      },

      clearErrors: function () {
	this.get('errors').clear();
      },

      setSelected: function (newSelection) {
	this.set('selectedImage', newSelection);
      }
    },

    showTable: (function () {
      return this.get('content').any( function (item) {
	return item.get('ready');
      });
    }).property('content.@each.ready')
  });
})();
