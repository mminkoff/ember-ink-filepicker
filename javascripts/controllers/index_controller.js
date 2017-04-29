((() => {
  'use strict';

  EmberInkFilepicker.IndexController = Ember.ArrayController.extend({
    actions: {
      pickWithFilepicker() {
        var newImg;
        var fp;
        newImg = EmberInkFilepicker.InkFilepickerImage.create({ready: false});
        this.get('model').pushObject(newImg);
        this.set('selectedImage', newImg);
        fp = EmberInkFilepicker.FilepickerController.create({
          content: newImg,
          errors: this.get('errors')
        });
        fp.pick('image');
      },

      clearErrors() {
	this.get('errors').clear();
      },

      setSelected(newSelection) {
	this.set('selectedImage', newSelection);
      }
    },

    showTable: (function () {
      return this.get('content').any( item => item.get('ready'));
    }).property('content.@each.ready')
  });
}))();
