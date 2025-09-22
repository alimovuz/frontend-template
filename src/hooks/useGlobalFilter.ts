import useAuth from "./useAuth";
import useDebounce from "./useDebounce";

const useGlobalFilters = (arr: Record<string, any>) => {
  const { offset, limit } = useAuth()
  let changed = false;

  const debouncedValues = Object.entries(arr).reduce((acc, [key, value]) => {
    const [debounced, isChanged] = useDebounce(value);
    if (isChanged) changed = true;
    if (debounced || typeof debounced === "number") {
      acc[key] = debounced;
    }
    return acc;
  }, {} as Record<string, any>);

  const params = {
    ...debouncedValues,
    limit,
    offset: changed ? 0 : offset,
    p: true,
  };

  return params;
};

export default useGlobalFilters;
