require("/tijasmine/tijasmine").infect(this);

describe("Conversation model", function() {
	var Alloy = require("alloy");
	var collection;
	var item;

	beforeEach(function() {
		collection = Alloy.createCollection('Conversation');
		item = Alloy.createModel('Conversation');
	});

	// it('DataBase Length tobe zero(0)', function() {
		// collection.fetch();
		// expect(collection.length).not.toBe(0);
	// });

	it('DataBase rowid, id, userId is not null', function() {
		collection.fetch();
		for (var i = 0; i < collection.length; i++) {
			expect(collection.at(i).get('user_id')).not.toBe(null);
			expect(collection.at(i).get('id')).not.toBe(null);
			expect(collection.at(i).get('rowid')).not.toBe(null);
		}
	});

	it('DataBase rowid, id, userId is not negative', function() {
		collection.fetch();
		var zeroVal = 0;
		for (var i = 0; i < collection.length; i++) {
			expect(collection.at(i).get('user_id')).not.toBeLessThan(zeroVal);
			expect(collection.at(i).get('id')).not.toBeLessThan(zeroVal);
			expect(collection.at(i).get('rowid')).not.toBeLessThan(zeroVal);
		}
	});

	it('DataBase title value is not to be blank', function() {
		collection.fetch();
		for (var i = 0; i < collection.length; i++) {
			expect(collection.at(i).get('title')).not.toBe(null);
		}
	});
});
