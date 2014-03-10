(function () {
  'use strict';

  EmberInkFilepicker.Router.map(function () {
  });

  EmberInkFilepicker.IndexRoute = Ember.Route.extend({
    model: function () {
      return [];
    },
    setupController: function (controller, model) {
      controller.set('errors', []);
    }
  });
})();
