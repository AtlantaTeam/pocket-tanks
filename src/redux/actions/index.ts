export type Action<T = string, P = void> = {
    type: T;
    payload: P;
};
