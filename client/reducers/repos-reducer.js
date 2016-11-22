// const initialState = {
//   repos: []
// };

// export default function (state = initialState, action) {
//     switch (action.type) {
//         case 'UPDATE_REPOS':
//             return action.repos;
//             break;
//     }
//     return state;
// }


export default function () {
    return [
        {
            id: 1,
            name: "Gittalk",
            description: "Thesis project",
        },
        {
            id: 2,
            name: "GreenCast",
            description: "Legacy project"
        },
        {
            id: 3,
            name: "Hello World",
            description: "Demo"
        }
    ]
}