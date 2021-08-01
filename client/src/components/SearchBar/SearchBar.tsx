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
          className="text-xl m-2"
          icon={faSearch}
        ></FontAwesomeIcon>
        <input
          value={searchValue}
          onChange={handleChange}
          placeholder="Search"
          className="flex-grow"
        ></input>
      </div>
    </>
  );
};

export default SearchBar;
