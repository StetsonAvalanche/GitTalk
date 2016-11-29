export default function (state = [], action) {
	switch (action.type) {
		case 'UPDATE_SUBSCRIPTIONS': 
	    const newState = Object.assign({}, state, {
    		subscriptions: action.subscriptions
    	})
      return newState.subscriptions;
		default: 
			return state;
	}
}