'use babel';

import AtomCformView from './atom-cform-view';
import { CompositeDisposable } from 'atom';

export default {

  atomCformView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomCformView = new AtomCformView(state.atomCformViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomCformView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-cform:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomCformView.destroy();
  },

  serialize() {
    return {
      atomCformViewState: this.atomCformView.serialize()
    };
  },

  toggle() {
    console.log('AtomCform was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
