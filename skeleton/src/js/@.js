define([
	"core/util",
	"core/pubsub"
], (u, newPubSub) => {
	const inst = u.extend( newPubSub() );
	
	function init() {
		
	}
	
	inst.beforeReady = beforeReady;
	inst.init = init;
	
	return inst;
});