var EventEmitter = require('events').EventEmitter;

function DataStore () {
	EventEmitter.call(this);

	// initialize internal cache
	var storage = this.cache = {
		session: {}
	};
	var self = this;

}

Object.assign(DataStore.prototype, EventEmitter.prototype);

// Intents
DataStore.prototype.joinSession = function (session) {
	this.cache.session = session;
};

DataStore.prototype.star = function ({ id }, starred, callback) {
	this.starQueue.push({ id, starred }, callback);
};

// Getters
DataStore.prototype.getSession = function () { return this.cache.session; };

module.exports = DataStore;
