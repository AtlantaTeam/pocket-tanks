export const cookieToString = (
    obj: Record<string, string | number>,
): string => {
    let str = '';
    Object.entries(obj).forEach(([k, v]) => {
        str += `${k}=${v}; `;
    });
    return str.substring(str.length - 2, 0);
};
