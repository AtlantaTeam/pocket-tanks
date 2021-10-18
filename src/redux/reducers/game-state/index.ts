import { Weapon } from '../../../components/Pages/Game/types';
import {
    INCREASE_ANGLE, CHANGE_ANGLE,
    INCREASE_ENEMY_POINTS, CHANGE_ENEMY_POINTS,
    INCREASE_MOVES, CHANGE_MOVES,
    INCREASE_PLAYER_POINTS, CHANGE_PLAYER_POINTS,
    INCREASE_POWER, CHANGE_POWER,
    REMOVE_WEAPON_BY_ID,
    SELECT_WEAPON,
    SET_WEAPONS,
    IncreaseAngle,
    ChangeAngle,
    IncreaseEnemyPoints,
    ChangeEnemyPoints,
    IncreaseMoves,
    ChangeMoves,
    IncreasePlayerPoints,
    ChangePlayerPoints,
    IncreasePower,
    ChangePower,
    RemoveWeaponByIdAction,
    SelectWeaponAction, SetWeaponsAction,
} from '../../actions/game-state';

export type GameStateAction =
    | SelectWeaponAction
    | RemoveWeaponByIdAction
    | SetWeaponsAction
    | IncreasePower
    | ChangePower
    | IncreaseAngle
    | ChangeAngle
    | IncreaseMoves
    | ChangeMoves
    | IncreasePlayerPoints
    | ChangePlayerPoints
    | IncreaseEnemyPoints
    | ChangeEnemyPoints;

export type GameState = {
    weapons: Weapon[],
    selectedWeapon: Weapon,
    angle: number,
    power: number,
    moves: number,
    playerPoints: number,
    enemyPoints: number,
};

const emptyWeapon = { id: 0, name: '-' };

export const initialState: GameState = {
    weapons: [emptyWeapon],
    selectedWeapon: emptyWeapon,
    power: 10,
    angle: 0,
    moves: 4,
    playerPoints: 0,
    enemyPoints: 0,
};

export const gameState = (state: GameState = initialState, action: GameStateAction) => {
    switch (action.type) {
        case SELECT_WEAPON: {
            state.selectedWeapon = action.payload;
            break;
        }
        case REMOVE_WEAPON_BY_ID: {
            state.weapons = state.weapons.filter(({ id }) => id !== action.payload);
            if (state.selectedWeapon.id === action.payload) {
                state.selectedWeapon = state.weapons.length ? state.weapons[0] : emptyWeapon;
            }
            break;
        }
        case SET_WEAPONS: {
            state.weapons = action.payload;
            break;
        }
        case INCREASE_POWER: {
            state.power += action.payload;
            break;
        }
        case CHANGE_POWER: {
            state.power = action.payload;
            break;
        }
        case INCREASE_ANGLE: {
            state.angle += action.payload;
            break;
        }
        case CHANGE_ANGLE: {
            state.angle = action.payload;
            break;
        }
        case INCREASE_MOVES: {
            state.moves += action.payload;
            break;
        }
        case CHANGE_MOVES: {
            state.moves = action.payload;
            break;
        }
        case INCREASE_PLAYER_POINTS: {
            state.playerPoints = state.playerPoints + action.payload < 0 ? 0 : state.playerPoints + action.payload;
            break;
        }
        case CHANGE_PLAYER_POINTS: {
            state.playerPoints = action.payload;
            break;
        }
        case INCREASE_ENEMY_POINTS: {
            state.enemyPoints = state.enemyPoints + action.payload < 0 ? 0 : state.enemyPoints + action.payload;
            break;
        }
        case CHANGE_ENEMY_POINTS: {
            state.enemyPoints = action.payload;
            break;
        }
        // no default
    }
    return state;
};
