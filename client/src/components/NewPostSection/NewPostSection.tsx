import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";

import * as routes from "../../app/routes";
import ResponsiveContainer from "../ResponsiveContainer";

const NewPostSection = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push(routes.NEW_POLL);
  };

  return (
    <ResponsiveContainer className="flex p-4 bg-gray-400">
      <div className="flex-grow h-24 p-2 bg-white">
        <textarea
          className="w-full h-full"
          placeholder="What fake news did you spot today?"
          onClick={handleClick}
        ></textarea>
      </div>

      <div className="flex items-center self-start justify-center w-8 h-8 p-2 ml-2 bg-gray-200 rounded-full">
        <FontAwesomeIcon icon={faImage} />
      </div>
      <div className="flex items-center self-start justify-center w-8 h-8 p-2 ml-2 bg-gray-200 rounded-full">
        <FontAwesomeIcon icon={faYoutube} />
      </div>
    </ResponsiveContainer>
  );
};

export default NewPostSection;
