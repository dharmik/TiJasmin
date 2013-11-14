exports.definition = {
	config : {
		columns : {
			"id" : "INTEGER",
			"user_id" : "INTEGER",
			"title" : "text",
			"created_at" : "text",
			"updated_at" : "text",
			"type_human" : "text",
			"status" : "text",
			"unread" : "text",
			"last_viewed_at" : "text"
		},
		adapter : {
			type : "sql",
			collection_name : "Conversation",
            idAttribute: "id"
		}
	},
	extendModel : function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
			toString : function() {
				return String.format("%s (%s)", this.get('title'), this.get('created_at'), this.get('updated_at'), this.get('type_human'), this.get('status'), this.get('unread'), this.get('last_viewed_at'));
			},
		});

		return Model;
	},
	extendCollection : function(Collection) {
		_.extend(Collection.prototype, {

			// extended functions and properties go here
			/**
			 * DELETE SPECIFIC LEAGUE OR SPECIFIC RECORD
			 * @param {Object} [opts] An optional dictionary of parameters to pass to the SQL QUERY
			 */
			deleteContent : function() {
				var collection = this;
				var dbName = collection.config.adapter.db_name;
				var table = collection.config.adapter.collection_name;
				var columns = collection.config.columns;
				var sql = "DELETE FROM " + table;
				db = Ti.Database.open(collection.config.adapter.db_name);
				db.execute(sql);
				db.close();
				collection.trigger('sync');
			}
		});

		_.extend(Collection.prototype, {
			fetchRead : function() {
				var table = definition.config.adapter.collection_name;

				this.fetch({
					query : 'SELECT * from ' + table + ' where user_id=1'
				});
			}
		});

		return Collection;
	}
};

