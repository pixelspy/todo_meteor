import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Tasks } from '../api/tasks.js';
// gets the tasks from the collection Tasks

import './task.js';
import './body.html';

Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('tasks');
});

Template.body.helpers({
  tasks() {
    const instance = Template.instance();
    if (instance.state.get('hideCompleted')) {
      return Tasks.find({ checked: { $ne: true } },
      {sort: { createdAt: -1}});
    }
    return Tasks.find({}, { sort: { createdAt: -1 } });
  },
  incompleteCount() {
    return Tasks.find({ checked: { $ne: true } }).count();
  },
    // fetchs data in collection(table) : Tasks
    // show newest tasks at the top
});

Template.body.events({
  'submit .new-task'(event) {
    event.preventDefault();

    // get value from form element
    const target = event.target;
    const text = target.text.value;
    console.log(event);

    // insert a task in the collection
    Meteor.call('tasks.insert', text);

  // clear form
  target.text.value = '';
},

'change .hide-completed input'(event, instance) {
  instance.state.set('hideCompleted', event.target.checked);
},
});
