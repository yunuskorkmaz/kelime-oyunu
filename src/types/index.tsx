export const GAME_STATUS_CHANGE = 'GAME_STATUS_CHANGE';
export const LAST_WORD_CHANGE = 'LAST_WORD_CHANGE';
export const MICMODE_CHANGE = 'MICMODE_CHANGE';
export const WON_MESSAGE_CHANGE = 'WON_MESSAGE_CHANGE';

export type GameStatus =
  | 'init'
  | 'unsupport'
  | 'micAccessDenied'
  | 'started'
  | 'gameover'
  | 'nomatch'
  | 'error'
  | 'timeover'
  | 'firstCharError'
  | 'repeatWord'
  | 'gamerWon';
export type Turn = 'computer' | 'gamer';
export type MicMode = 'listening' | 'processing' | 'off';

export type GameState = {
  status: GameStatus;
  turn: Turn;
  spokenWords: Array<string>;
  lastWord: string;
  thinking: boolean;
  micMode: MicMode;
  computerSkor: number;
  gamerSkor: number;
  wonMessage: string;
};

export type Action = {
  type:
    | typeof GAME_STATUS_CHANGE
    | typeof LAST_WORD_CHANGE
    | typeof MICMODE_CHANGE
    | typeof WON_MESSAGE_CHANGE;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
};

export type GameStoreHook = {
  state: GameState;
  actions: {
    changeGameStatus: (status: GameStatus) => void;
    changeLastWord: (lastWord: string) => void;
    changeMicMode: (micMode: MicMode) => void;
    changeWonMessage: (message: string) => void;
  };
};

export type RecognitionHook = {
  start: () => void;
  stop: () => void;
  onResult: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  on: (event: string, callback: (data: any) => void) => void;
  isSupported: () => boolean;
};
