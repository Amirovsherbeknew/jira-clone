const sortByField = <I>(lst: I[], field: keyof I): void => {
  lst.sort((x, y) => {
    if (x[field] < y[field]) {
      return -1;
    } else if (x[field] > y[field]) {
      return 1;
    } else {
      return 0;
    }
  });
};

export default sortByField;
