import { createContext, useContext, useMemo, useReducer } from 'react';
import reducer, { initialState } from '../reducer/cartReducer';

const CartContext = createContext();

const withProvider = (Component) => (props) => {
  const WrapperComponent = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = useMemo(() => ({
      ...state,
      dispatch,
    }));
    return (
      <CartContext.Provider value={value}>
        <Component {...props} />
      </CartContext.Provider>
    );
  };

  return WrapperComponent;
};

export default withProvider;

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('CartContext needs to be inside TemplatesProvider');
  }

  return context;
};
