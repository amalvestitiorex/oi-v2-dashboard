import { useSearchParams } from "react-router-dom";
import { Input } from "semantic-ui-react";
import { useDebouncedCallback } from "use-debounce";

const WAIT_BEETWEEN_SEARCH = 300;

interface Props {
  query: string;
  placeholder: string;
}

export function Search({ query, placeholder }: Props) {
  const [, setSearchParams] = useSearchParams();

  const handlerSearch = useDebouncedCallback((term) => {
    if (term) {
      setSearchParams({ page: "1", query: term });
    } else {
      setSearchParams({ page: "1" });
    }
  }, WAIT_BEETWEEN_SEARCH);

  return (
    <Input
      onChange={(e) => handlerSearch(e.target.value)}
      icon="search"
      placeholder={placeholder}
      defaultValue={query || ""}
      style={{ height: 35 }}
    />
  );
}
