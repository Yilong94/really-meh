import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faImage, faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { useHistory } from "react-router-dom";

import * as routes from "../../app/routes";
import ResponsiveContainer from "../ResponsiveContainer";

const NewPostSection: FC = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push(routes.NEW_POLL);
  };

  return (
    <ResponsiveContainer className="p-4 mt-2 bg-white">
      <div className="flex-grow border-2 border-yellow-300 rounded-md divide-y-2 divide-yellow-300">
        <div className="p-2">
          <textarea
            className="w-full h-full"
            placeholder="What fake news did you spot today?"
            onClick={handleClick}
          />
        </div>
        <div className="flex border-yellow divide-x-2 divide-yellow-300">
          <button className="flex items-center justify-center flex-grow py-2 text-xs space-x-2">
            <FontAwesomeIcon icon={faImage} />
            <div>Add image</div>
          </button>
          <button className="flex items-center justify-center flex-grow py-2 text-xs space-x-2">
            <FontAwesomeIcon icon={faYoutube} />
            <div>Add video</div>
          </button>
          <button className="flex items-center justify-center flex-grow py-2 text-xs space-x-2">
            <FontAwesomeIcon icon={faLink} />
            <div>Add link</div>
          </button>
        </div>
      </div>
    </ResponsiveContainer>
  );
};

export default NewPostSection;
