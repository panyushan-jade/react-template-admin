type LocalStorageDataType = string | number | boolean | object;
function setLocalStorageItem(key: string, value: LocalStorageDataType): void {
  localStorage.setItem(key, JSON.stringify(value));
}
function getLocalStorageItem<T extends LocalStorageDataType>(
  key: string
): T | null {
  const value = localStorage.getItem(key);
  if (value) {
    try {
      return JSON.parse(value) as T;
    } catch (error) {
      console.error(`Error parsing local storage item "${key}": ${error}`);
      return null;
    }
  }
  return null;
}
function removeLocalStorageItem(key: string): void {
  localStorage.removeItem(key);
}
export { setLocalStorageItem, getLocalStorageItem, removeLocalStorageItem };
