/**
 * 
 * @param {string} path - 路径
 * @returns {Boolean} - 是否是合法的路径
 */

export function isExternal(path){
    return /^(https?:|mailto:|tel:)/.test(path);
}