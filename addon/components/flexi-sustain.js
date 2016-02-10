import Ember from 'ember';
import layout from '../templates/components/flexi-sustain';

const {
  Component,
  inject
  } = Ember;

const component = Component.extend({
  layout,
  tagName: 'sustain',
  model: null,
  sustain: null,
  sustains: inject.service('-sustains'),

  copy: false,
  expires: null,

  willInsertElement() {
    // console.log('will insert sustain');
    this.get('sustains')
      .didInsert({
        name: this.get('sustain'),
        element: this.element,
        model: this.get('model'),
        copy: this.get('copy'),
        expires: this.get('expires')
      });
  },

  didInsertElement() {
    // console.log('did insert sustain');
  },

  willDestroyElement() {
    this.get('sustains').uninstall(this.element, this.get('sustain'));
  },

  init() {
    this._super();
    this.get('sustains').install(
      this.get('sustain'),
      this.get('model'),
      this.get('copy'),
      this.get('expires')
    );
  }

});

component.reopenClass({
  positionalParams: ['sustain', 'model']
});

export default component;
