$(document).foundation()

var megaRoster = {
  init: function(listSelector) {
    this.studentList = document.querySelector(listSelector);
    this.setupEventListeners();
    this.count = 0;
  },

  setupEventListeners: function() {
    document.querySelector('form#studentForm').onsubmit = this.addStudent.bind(this);
  },

  addStudent: function(ev) {
    ev.preventDefault();
    var f = ev.currentTarget;
    var studentName = f.studentName.value;
    var listItem = this.buildListItem(studentName);

    this.prependChild(this.studentList, listItem);

    f.reset();
    this.count += 1;

    f.studentName.focus();
  },

  prependChild: function(parent, child) {
    parent.insertBefore(child, parent.firstChild)
  },

  buildListItem: function(studentName) {
    var listItem = document.createElement('li');
    var span = document.createElement('span');
    span.innerText = studentName;
    span.className = 'studentName';
    listItem.appendChild(span);
    this.appendLinks(listItem);

    return listItem;
  },

  appendLinks: function(listItem) {
    var span = document.createElement('span');
    span.className += 'actions'
    var removeLink = this.buildLink({
      text: 'remove',
      handler: function() {
        listItem.remove();
      }
    });
    var promoteLink = this.buildLink({
      text: 'promote',
      handler: function() {
        this.promote(listItem);
      }.bind(this)
    });
    var moveUpLink = this.buildLink({
      text: 'Up',
      className:'moveUp',
      handler: function() {
        this.moveUp(listItem);
      }.bind(this)
    });
    var moveDownLink = this.buildLink({
      text: 'down',
      className: 'moveDown',
      handler: function() {
        this.moveDown(listItem);
      }.bind(this)
    });
    span.appendChild(this.buildLink({
          text: 'edit',
          className: 'edit',
          handler: function() {
            this.toggleEditable(listItem.querySelector('span.studentName'));
          }.bind(this)
        }));

    listItem.appendChild(removeLink);
    listItem.appendChild(promoteLink);
    listItem.appendChild(moveUpLink);
    listItem.appendChild(moveDownLink)
    listItem.appendChild(span);
  },

  buildLink: function(options) {
    var link = document.createElement('a');
    link.href = "#";
    link.innerText = options.text;
    link.onclick = options.handler;
    link.className += (options.className || '');
    return link;
  },

  toggleEditable: function(el) {
    var toggleElement = el.parentElement.querySelector('a.edit');
    if (el.contentEditable === 'true') {
      el.contentEditable = 'false';
      toggleElement.innerHTML = 'edit';
    }
    else {
      el.contentEditable = 'true';
      el.focus();
      toggleElement.innerHTML = 'save';
    }
  },

  promote: function(listItem) {
    this.prependChild(this.studentList, listItem);
  },
  moveUp: function(listItem) {
     if (listItem !== this.studentList.firstElementChild) {
       var previousItem = listItem.previousElementSibling;
       this.studentList.insertBefore(listItem, previousItem);
     }
   },
  moveDown: function(listItem) {
    if(listItem !== this.studentList.firstchild) {
      this.moveUp(listItem.nextElementSibling);
    }
  },
};
megaRoster.init('#studentList');
