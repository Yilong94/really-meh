import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import {
  faImage,
  faLink,
  faSpinner,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Multiselect from "multiselect-react-dropdown";
import { useEffect } from "react";
import { useCallback } from "react";
import { FC, useState } from "react";
import Modal from "react-modal";
import { useMutation, useQuery } from "react-query";
import { useHistory } from "react-router-dom";

import { createPost, fetchPosts } from "../../api";
import { POST } from "../../app/routes";
import {
  categoriesKeyValueMap,
  fakeNewsPollLabelMap,
  POLL_QUESTION,
  ReactQueryKey,
} from "../../constants";
import { PollForm } from "../../entities/PollForm";
import { YELLOW } from "../../styles/constants";
import BarPoll from "../BarPoll";
import Card from "../Card";
import FormInput from "../FormInput";
import FormLabel from "../FormLabel";
import ResponsiveContainer from "../ResponsiveContainer";

const NewPollForm: FC = () => {
  const [pollForm, setPollForm] = useState<PollForm>({
    title: "",
    content: "",
    tags: [],
  });
  const [modalIsOpen, setIsOpen] = useState(false);
  const history = useHistory();

  const {
    isLoading: isFetchPostsLoading,
    refetch,
    data: posts,
  } = useQuery(
    ReactQueryKey.POSTS,
    async () => await fetchPosts(pollForm.content),
    {
      enabled: false,
      refetchOnWindowFocus: false,
    }
  );

  const { isLoading: isCreatePostLoading, mutate } = useMutation(
    ReactQueryKey.CREATE_POST,
    createPost
  );

  useEffect(() => {
    if (modalIsOpen) {
      refetch();
    }
  }, [modalIsOpen]);

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

  const handleOpenModalClick = () => {
    setIsOpen(true);
  };

  const handleCloseModalClick = () => {
    setIsOpen(false);
  };

  const handleSubmitclick = useCallback(() => {
    mutate({
      // TODO: hardcoded user id
      creatorUser: 1,
      title: pollForm.title,
      content: pollForm.content,
      tags: pollForm.tags,
    });
  }, [pollForm]);

  return (
    <>
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
        <button
          onClick={handleOpenModalClick}
          className="p-3 mt-8 text-base font-bold bg-yellow-300 rounded-full"
        >
          Submit
        </button>
      </ResponsiveContainer>
      <Modal
        isOpen={modalIsOpen}
        style={{
          overlay: {},
          content: {
            height: "70%",
            top: "50%",
            transform: "translateY(-50%)",
            padding: "16px",
          },
        }}
      >
        <button onClick={handleCloseModalClick}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <div className="mt-8 text-2xl font-bold">Wait a minute...</div>
        <div className="text-2xl font-bold">
          Someone may have already posted similar content
        </div>
        <div className="mt-2 text-xs">Is this what you were looking for?</div>
        <div className="mt-4 space-y-2">
          {isFetchPostsLoading ? (
            <div className="flex justify-center">
              <FontAwesomeIcon
                icon={faSpinner}
                className="w-5 h-5 animate-spin"
              />
            </div>
          ) : posts?.length === 0 ? (
            <div className="text-base">
              Sorry, there are no similar polls found
            </div>
          ) : (
            <>
              {/* Get first two polls */}
              {posts?.slice(0, 2).map(({ postId, content, tags }, index) => {
                return (
                  <Card
                    key={index}
                    title="Poll"
                    content={content}
                    tags={tags}
                    onContentClick={() => {
                      history.push(POST + `/${postId}`);
                    }}
                  />
                );
              })}
            </>
          )}
        </div>
        <div className="flex mt-8 space-x-2">
          {isCreatePostLoading ? (
            <div className="flex justify-center">
              <FontAwesomeIcon
                icon={faSpinner}
                className="w-5 h-5 animate-spin"
              />
            </div>
          ) : (
            <>
              <button
                onClick={handleCloseModalClick}
                className="flex-grow p-3 text-base font-bold border rounded-full border-color-300"
              >
                Edit post
              </button>
              <button
                onClick={handleSubmitclick}
                className="flex-grow p-3 text-base font-bold bg-yellow-300 rounded-full"
              >
                Just post
              </button>
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default NewPollForm;
