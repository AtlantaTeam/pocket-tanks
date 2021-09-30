import type { State } from '../../reducers';

export const getGameState = (state: State) => state.gameState;

export const getSelectedWeapon = (state: State) => getGameState(state).selectedWeapon;
export const getWeapons = (state: State) => getGameState(state).weapons;
export const getPower = (state: State) => getGameState(state).power;
export const getAngle = (state: State) => getGameState(state).angle;
export const getMoves = (state: State) => getGameState(state).moves;
export const getPlayerPoints = (state: State) => getGameState(state).playerPoints;
export const getEnemyPoints = (state: State) => getGameState(state).enemyPoints;
