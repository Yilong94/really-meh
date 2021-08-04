import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEventHandler } from "react";
import { FC } from "react";

interface Props {
  searchValue: string;
  onSearchValueChange: (value: string) => void;
}

const SearchBar: FC<Props> = ({ searchValue, onSearchValueChange }) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    onSearchValueChange(event.target.value);
  };

  return (
    <>
      <div className="flex items-center">
        <FontAwesomeIcon
          className="m-2 text-xl"
          icon={faSearch}
        ></FontAwesomeIcon>
        <input
          value={searchValue}
          onChange={handleChange}
          placeholder="Search for polls..."
          className="flex-grow"
        ></input>
      </div>
    </>
  );
};

export default SearchBar;
