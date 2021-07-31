import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";

import * as routes from "../../app/routes";
import ResponsiveContainer from "../ResponsiveContainer";

const NewPostSection = () => {
  const history = useHistory();

  const handleClick = () => {
    alert("clicked");
    // history.push(routes.POST);
  };

  return (
    <ResponsiveContainer className="flex bg-gray-400 p-4">
      <div className="h-24 flex-grow p-2 bg-white">
        <textarea
          className="h-full w-full"
          placeholder="What fake news did you spot today?"
          onClick={handleClick}
        ></textarea>
      </div>

      <div className="rounded-full bg-gray-200 ml-2 p-2 w-8 h-8 self-start flex justify-center items-center">
        <FontAwesomeIcon icon={faImage} />
      </div>
      <div className="rounded-full bg-gray-200 ml-2 p-2 w-8 h-8 self-start flex justify-center items-center">
        <FontAwesomeIcon icon={faYoutube} />
      </div>
    </ResponsiveContainer>
  );
};

export default NewPostSection;
