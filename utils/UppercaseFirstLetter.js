module.exports = string => {
  const arr = string.split(' ');
  return arr
    .map(word => word.slice(0, 1).toUpperCase() + word.slice(1))
    .join(' ');
};
