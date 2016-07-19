/*global util, ENTER_KEY, ESCAPE_KEY */
jQuery(function ($) {
	'use strict';

	var App = {
		init: function () {
			this.todos = util.store('places');
			this.bindEvents();
			this.render();
		},
		bindEvents: function () {
			$('#add-new').on('click', this.create.bind(this));
		},
		render: function () {
			var list = this.todos.map(t => {
				var image = $('<img />')
					.attr('alt', t.image.filename)
					.attr('src', t.image.data);
				var title = $('<span />')
					.addClass('title').addClass('view')
					.text(t.title);
				var titleEdit = $('<input />')
					.addClass('edit')
					.val(t.title);
				var remove = $('<a />')
					.attr('href', '#')
					.addClass('remove')
					.text('x');
				remove.on('click', this.del.bind(this));
				title.append(titleEdit);
				return $('<li />')
					.data('id', t.id)
					.append(image)
					.append(remove)
					.append(title);
			});
			
			var todoList = $('#todo-list');
			todoList.empty();
			todoList.append(list);
			
			todoList.find('li').on('click', this.edit.bind(this));
			todoList.find('.edit')
				.on('keyup', this.editKeyup.bind(this))
				.on('blur', this.update.bind(this));
		},
		create: function (e) {
			var $form = $(e.target).closest('form');

			var title = $form.find('#new-title');
			var photo = $form.find('#new-photo');

			util.toBase64(photo[0],
				(filename, data) => {
					this.todos.push({
						id: util.uuid(),
						title: title.val(),
						image: { filename, data }
					});

					this.save();

					$form[0].reset();

					this.render();
				}
			);
		},
		save: function() {
			util.store('places', this.todos);
		},
		edit: function (e) {
			var li = $(e.target).parent('li');
			li.addClass('editing');
			li.find('.edit').focus();
		},
		editKeyup: function (e) {
			if (e.which === ENTER_KEY) {
				e.target.blur();
			}

			if (e.which === ESCAPE_KEY) {
				$(e.target).data('abort', true).blur();
				$(e.target).closest('li').removeClass('editing');
			}
		},
		del: function(e) {
			var $id = $(e.target).closest('li').data('id');
			this.todos = this.todos.filter(t => t.id !== $id);
			this.save();
			this.render();
		},
		update: function (e) {
			var el = e.target;
			var $el = $(el);
			var $id = $el.closest('li').data('id');
			var val = $el.val().trim();

			if ($el.data('abort')) {
				$el.data('abort', false);
			} else {
				this.todos.forEach(t => {
					if (t.id !== $id) return;
					t.title = val;
				});

				this.save();
				
				this.render();
			}

		}
	};

	App.init();
});
