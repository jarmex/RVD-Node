const isObjEmpty = (obj) => {
  if (!obj) return true;
  return Object.keys(obj).length === 0;
};

export { isObjEmpty };

export default isObjEmpty;
