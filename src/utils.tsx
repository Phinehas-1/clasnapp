export const convertObjectToString = (value: any) => {
  const newValue: String[] = [];
  for (const key in value) {
    if (value.hasOwnProperty(key)) {
      if (typeof value[key] === "object") {
        newValue.push(Object.values(value[key]).toString());
      } else {
        newValue.push(Object.values(value).toString());
      }
    }
  }
  return newValue.toString();
};
