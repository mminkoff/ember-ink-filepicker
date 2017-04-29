((() => {
  'use strict';

  EmberInkFilepicker.FilepickerController = Ember.ObjectController.extend({
    textServices: ['BOX', 'COMPUTER', 'DROPBOX', 'EVERNOTE', 'FTP', 'GITHUB', 'GOOGLE_DRIVE', 'SKYDRIVE', 'WEBDAV', 'GMAIL', 'URL'],
    textTypes: ['text/plain'],
    imageServices: ['COMPUTER', 'FACEBOOK', 'GMAIL', 'BOX', 'DROPBOX', 'FLICKR', 'PICASA', 'INSTAGRAM'],
    imageTypes: ['image/*'],

    pick(serviceType) {
      var _this = this;

      serviceType = serviceType || 'image';

      filepicker.pick(
	{
	  container: 'window',
	  mimetypes: this.get(serviceType + 'Types'),
	  services: this.get(serviceType + 'Services')
	},
	InkBlob => {
	  _this.get('content').imageReceived(InkBlob);

	  // get image's width and height, then add to controller's content
	  filepicker.stat(InkBlob,
			  {width: true, height: true},
			  metadata => {
			    var pendingImage = _this.get('content');
			    pendingImage.sizeReceived(metadata);
			    pendingImage.set('ready', true);
			    _this.destroy();
			  },
			  FPError => {
			    // unless dialog closed by user
			    if (FPError.code !== 101) {
			      _this.get('errors').pushObject(FPError.toString());
			    }
			    _this.destroy();
			  }
			 );
	},
	FPError => {
	  // unless dialog closed by user
	  if (FPError.code !== 101) {
	    _this.get('errors').pushObject(FPError.toString());
	  }
	  _this.destroy();
	}
      );
    }
  });
}))();
