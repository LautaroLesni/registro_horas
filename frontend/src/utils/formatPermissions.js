const formatPermissions = (values, arr) => {
  const result = Object.entries(values)
    .filter(([prop, value]) => value)
    .map(([prop, value]) => arr.find((item) => item.name === prop))
    .filter((item) => item !== undefined)
    .map((item) => item.id);

  return result;
};

export default formatPermissions;
