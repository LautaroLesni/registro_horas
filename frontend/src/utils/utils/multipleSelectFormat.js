const multipleSelectFormat = (array, by) => {
  const optionsMap = {};

  array.forEach((opt) => {
    if (by === "id-name") {
      optionsMap[opt.id] = `${opt.name}`;
    }
  });
  const optionsIds = array.map((e) => e.id);

  return { options: optionsMap, ids: optionsIds };
};

export default multipleSelectFormat;
