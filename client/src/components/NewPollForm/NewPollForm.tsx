import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { faImage, faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Multiselect from "multiselect-react-dropdown";
import { FC, useState } from "react";

import {
  categoriesKeyValueMap,
  fakeNewsPollLabelMap,
  POLL_QUESTION,
} from "../../constants";
import { PollForm } from "../../entities/PollForm";
import { YELLOW } from "../../styles/constants";
import BarPoll from "../BarPoll";
import FormInput from "../FormInput";
import FormLabel from "../FormLabel";
import ResponsiveContainer from "../ResponsiveContainer";

const NewPollForm: FC = () => {
  const [pollForm, setPollForm] = useState<PollForm>({
    title: "",
    content: "",
    tags: [],
  });

  const optionsFormatted = Object.keys(categoriesKeyValueMap).map((key) => ({
    id: key,
    name: categoriesKeyValueMap[key],
  }));

  const handleFormChange = ({
    id,
    value,
  }: {
    id: keyof PollForm;
    value: PollForm[keyof PollForm];
  }) => {
    setPollForm({ ...pollForm, [id]: value });
  };

  return (
    <ResponsiveContainer className="flex flex-col flex-grow p-4 bg-white">
      <div className="text-lg font-bold">New Poll</div>
      <div className="mb-4 text-xs">What fake news did you spot today?</div>
      <div className="space-y-2">
        <div className="flex flex-col">
          <FormLabel>What is the title of your post?</FormLabel>
          <FormInput
            id="title"
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              const id = target.id as keyof PollForm;
              const value = target.value;

              handleFormChange({ id, value });
            }}
            placeholder="Title"
            type="text"
          />
        </div>
        <div className="flex flex-col">
          <FormLabel>What categories does your news fall under?</FormLabel>
          <FormInput
            Component={
              <Multiselect
                id="tags"
                selectedValues={pollForm.tags}
                options={optionsFormatted}
                displayValue="name"
                placeholder="Choose an option"
                style={{
                  searchBox: { border: "none", padding: "0" },
                  chips: {
                    background: YELLOW,
                    color: "black",
                    fontWeight: "700",
                  },
                }}
                customCloseIcon={
                  <FontAwesomeIcon className="ml-2" icon={faTimesCircle} />
                }
                onSelect={(selectedList) => {
                  handleFormChange({ id: "tags", value: selectedList });
                }}
                onRemove={(selectedList) => {
                  handleFormChange({ id: "tags", value: selectedList });
                }}
              />
            }
          />
        </div>
        <div className="flex flex-col ">
          <FormLabel>What news do you need clarification on?</FormLabel>
          <FormInput
            style={{ padding: 0 }}
            className="overflow-hidden"
            Component={
              <>
                <div className="flex flex-col px-4 py-2">
                  <textarea
                    id="content"
                    className="min-h-24"
                    placeholder="Copy paste the information you saw / received here"
                    onChange={(e) => {
                      const target = e.target as HTMLTextAreaElement;
                      const id = target.id as keyof PollForm;
                      const value = target.value;

                      handleFormChange({ id, value });
                    }}
                  />
                  <div className="opacity-30">
                    <BarPoll
                      question={POLL_QUESTION}
                      label={fakeNewsPollLabelMap}
                      onClick={() => null}
                    />
                  </div>
                </div>
                <div className="flex border-t border-black divide-x divide-black">
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
              </>
            }
          />
        </div>
      </div>
      <button className="p-3 mt-8 text-base font-bold bg-yellow-300 rounded-full">
        Submit
      </button>
    </ResponsiveContainer>
  );
};

export default NewPollForm;
