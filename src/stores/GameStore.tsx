import React, { createContext, Dispatch, useContext, useReducer } from 'react';
import {
  Action,
  GameState,
  GameStatus,
  GameStoreHook,
  GAME_STATUS_CHANGE,
  LAST_WORD_CHANGE,
  MicMode,
  MICMODE_CHANGE,
  WON_MESSAGE_CHANGE,
} from '../types';

const initialState: GameState = {
  status: 'init',
  turn: 'computer',
  spokenWords: [],
  lastWord: '',
  thinking: true,
  micMode: 'off',
  computerSkor: 0,
  gamerSkor: 0,
  wonMessage: '',
};

const GameStore = createContext<{
  state: GameState;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  dispatch: () => {},
});

const gameStoreReducer = (state: GameState, action: Action): GameState => {
  switch (action.type) {
    case GAME_STATUS_CHANGE:
      if (action.payload === 'init') {
        return initialState;
      }
      return { ...state, status: action.payload };
    case LAST_WORD_CHANGE:
      return {
        ...state,
        thinking: state.turn === 'computer' ? false : true,
        spokenWords: [...state.spokenWords, action.payload],
        turn: state.turn === 'gamer' ? 'computer' : 'gamer',
        lastWord: action.payload,
        gamerSkor: state.turn === 'gamer' ? state.gamerSkor + 1 : state.gamerSkor,
        computerSkor: state.turn === 'computer' ? state.computerSkor + 1 : state.computerSkor,
      };
    case MICMODE_CHANGE:
      return { ...state, micMode: action.payload };
    case WON_MESSAGE_CHANGE:
      return { ...state, wonMessage: action.payload };
    default:
      return state;
  }
};

// eslint-disable-next-line react/prop-types
const GameStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameStoreReducer, initialState);

  return <GameStore.Provider value={{ state, dispatch }}>{children}</GameStore.Provider>;
};

const useGameStore = (): GameStoreHook => {
  const { state, dispatch } = useContext(GameStore);

  const changeGameStatus = (status: GameStatus) =>
    dispatch({ type: GAME_STATUS_CHANGE, payload: status });

  const changeLastWord = (lastWord: string) =>
    dispatch({ type: LAST_WORD_CHANGE, payload: lastWord });

  const changeMicMode = (micMode: MicMode) => dispatch({ type: MICMODE_CHANGE, payload: micMode });

  const changeWonMessage = (message: string) =>
    dispatch({ type: WON_MESSAGE_CHANGE, payload: message });
  return {
    state,
    actions: {
      changeGameStatus,
      changeLastWord,
      changeMicMode,
      changeWonMessage,
    },
  };
};

export { GameStoreProvider, useGameStore };
