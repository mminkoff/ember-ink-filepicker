((() => {
  'use strict';

  EmberInkFilepicker.Router.map(() => {
  });

  EmberInkFilepicker.IndexRoute = Ember.Route.extend({
    model() {
      return [];
    },
    setupController(controller, model) {
      controller.set('errors', []);
    }
  });
}))();
