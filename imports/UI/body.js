import { Template } from 'meteor/templating';
import { Tasks } from '../api/tasks.js';
// gets the tasks from the collection Tasks

import './task.js';
import './body.html';

Template.body.helpers({
  // tasks:
  // [
  //   { text: 'This is task 1' },
  //   { text: 'This is task 2' },
  //   { text: 'This is task 3' },
  // ],

  tasks() {
    // fetchs data in collection(table) : Tasks
    // show newest tasks at the top
    return Tasks.find({}, {sort: { createdAt: -1}});
  },
});

Template.body.events({
  'submit .new-task'(event) {
    event.preventDefault();

    // get value from form element
    const target = event.target;
    const text = target.text.value;
    console.log(event);

    // insert a task in the collection
    Tasks.insert({
    text,
    createdAt: new Date(), // current time
  });

  // clear form
  target.text.value = '';
},
});
