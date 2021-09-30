import { Weapon } from '../../../components/Pages/Game/types';
import type { Action } from '..';

export const SELECT_WEAPON = 'SELECT_WEAPON';
export const REMOVE_WEAPON_BY_ID = 'REMOVE_WEAPON_BY_ID';
export const SET_WEAPONS = 'SET_WEAPONS';
export const INCREASE_POWER = 'INCREASE_POWER';
export const CHANGE_POWER = 'CHANGE_POWER';
export const INCREASE_ANGLE = 'INCREASE_ANGLE';
export const CHANGE_ANGLE = 'CHANGE_ANGLE';
export const INCREASE_MOVES = 'INCREASE_MOVES';
export const CHANGE_MOVES = 'CHANGE_MOVES';
export const INCREASE_PLAYER_POINTS = 'INCREASE_PLAYER_POINTS';
export const CHANGE_PLAYER_POINTS = 'CHANGE_PLAYER_POINTS';
export const INCREASE_ENEMY_POINTS = 'INCREASE_ENEMY_POINTS';
export const CHANGE_ENEMY_POINTS = 'CHANGE_ENEMY_POINTS';

export type SelectWeaponAction = Action<typeof SELECT_WEAPON, Weapon>;
export type RemoveWeaponByIdAction = Action<typeof REMOVE_WEAPON_BY_ID, number>;
export type SetWeaponsAction = Action<typeof SET_WEAPONS, Weapon[]>;
export type IncreasePower = Action<typeof INCREASE_POWER, number>;
export type ChangePower = Action<typeof CHANGE_POWER, number>;
export type IncreaseAngle = Action<typeof INCREASE_ANGLE, number>;
export type ChangeAngle = Action<typeof CHANGE_ANGLE, number>;
export type IncreaseMoves = Action<typeof INCREASE_MOVES, number>;
export type ChangeMoves = Action<typeof CHANGE_MOVES, number>;
export type IncreasePlayerPoints = Action<typeof INCREASE_PLAYER_POINTS, number>;
export type ChangePlayerPoints = Action<typeof CHANGE_PLAYER_POINTS, number>;
export type IncreaseEnemyPoints = Action<typeof INCREASE_ENEMY_POINTS, number>;
export type ChangeEnemyPoints = Action<typeof CHANGE_ENEMY_POINTS, number>;

export const selectWeapon = (payload: Weapon) => ({
    type: SELECT_WEAPON,
    payload,
} as SelectWeaponAction);

export const removeWeaponById = (payload: number) => ({
    type: REMOVE_WEAPON_BY_ID,
    payload,
} as RemoveWeaponByIdAction);

export const setWeapons = (payload: Weapon[]) => ({
    type: SET_WEAPONS,
    payload,
} as SetWeaponsAction);

export const increasePower = (payload: number) => ({
    type: INCREASE_POWER,
    payload,
} as IncreasePower);

export const changePower = (payload: number) => ({
    type: CHANGE_POWER,
    payload,
} as ChangePower);

export const increaseAngle = (payload: number) => ({
    type: INCREASE_ANGLE,
    payload,
} as IncreaseAngle);

export const changeAngle = (payload: number) => ({
    type: CHANGE_ANGLE,
    payload,
} as ChangeAngle);

export const increaseMoves = (payload: number) => ({
    type: INCREASE_MOVES,
    payload,
} as IncreaseMoves);

export const changeMoves = (payload: number) => ({
    type: CHANGE_MOVES,
    payload,
} as ChangeMoves);

export const increasePlayerPoints = (payload: number) => ({
    type: INCREASE_PLAYER_POINTS,
    payload,
} as IncreasePlayerPoints);

export const changePlayerPoints = (payload: number) => ({
    type: CHANGE_PLAYER_POINTS,
    payload,
} as ChangePlayerPoints);

export const increaseEnemyPoints = (payload: number) => ({
    type: INCREASE_ENEMY_POINTS,
    payload,
} as IncreaseEnemyPoints);

export const changeEnemyPoints = (payload: number) => ({
    type: CHANGE_ENEMY_POINTS,
    payload,
} as ChangeEnemyPoints);
