export default function (state = [], action) {
	switch (action.type) {
		case 'ADD_SUBSCRIPTIONS': 
			// const newState = Object.assign({}, state, {
			// 	subscriptions: action.subscriptions
			// })
			return state.concat(action.subscriptions);
		default: 
			return state;
	}
}