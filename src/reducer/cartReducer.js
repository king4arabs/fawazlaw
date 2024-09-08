export const initialState = {
    cart: [],
    loading: false,
}

export const ACTIONS = {
    GET_CART_ITEMS: 'get_cart_items',
    ADD_ITEM_TO_CART: 'add_item_to_cart',
    DELETE_ITEM_FROM_CART: 'delete_item_from_cart',
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.GET_CART_ITEMS:
            return { ...state, cart: action.payload }
        case ACTIONS.ADD_ITEM_TO_CART:
            return { ...state, cart: [...state.cart, action.payload] }
        case ACTIONS.DELETE_ITEM_FROM_CART:
            console.log({ action })
            return { ...state, cart: state.cart.filter((item) => item._id !== action.payload) }
        default:
            break;
    }
}

export default reducer