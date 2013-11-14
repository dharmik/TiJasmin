exports.definition = {
    config: {
        columns: {
            id: "INTEGER",
            user_id: "INTEGER",
            title: "text",
            created_at: "text",
            updated_at: "text",
            type_human: "text",
            status: "text",
            unread: "text",
            last_viewed_at: "text"
        },
        adapter: {
            type: "sql",
            collection_name: "Conversation",
            idAttribute: "id"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {
            toString: function() {
                return String.format("%s (%s)", this.get("title"), this.get("created_at"), this.get("updated_at"), this.get("type_human"), this.get("status"), this.get("unread"), this.get("last_viewed_at"));
            }
        });
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {
            deleteContent: function() {
                var collection = this;
                collection.config.adapter.db_name;
                var table = collection.config.adapter.collection_name;
                collection.config.columns;
                var sql = "DELETE FROM " + table;
                db = Ti.Database.open(collection.config.adapter.db_name);
                db.execute(sql);
                db.close();
                collection.trigger("sync");
            }
        });
        _.extend(Collection.prototype, {
            fetchRead: function() {
                var table = definition.config.adapter.collection_name;
                this.fetch({
                    query: "SELECT * from " + table + " where user_id=1"
                });
            }
        });
        return Collection;
    }
};

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("Conversation", exports.definition, []);

collection = Alloy.C("Conversation", exports.definition, model);

exports.Model = model;

exports.Collection = collection;