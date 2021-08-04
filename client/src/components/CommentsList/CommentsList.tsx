import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useState } from "react";
import Sheet from "react-modal-sheet";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";

import { commentPost } from "../../api";
import { ReactQueryKey, SortBy } from "../../constants";
import { Comment } from "../../entities/Comment";
import CommentsListItem from "../CommentsListItem";
interface Props {
  comments: Comment[];
}

const CommentsList: FC<Props> = ({ comments }) => {
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.TOP);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const { id: postId } = useParams<{ id: string }>();
  const { mutate, isLoading, data } = useMutation(
    ReactQueryKey.VOTE_COMMENT,
    commentPost
  );

  const numComments = comments.length;

  const handleSortByClick = () => {
    if (sortBy === SortBy.TOP) {
      setSortBy(SortBy.BOTTOM);
    } else {
      setSortBy(SortBy.TOP);
    }
  };

  const handleAddComment = () => {
    setOpen(true);
  };

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setComment(event.target.value);
  };

  const handlePostComment = () => {
    mutate({
      userId: "f9cb1ec8-9d4b-479d-afe6-2146cacb92ce",
      postId,
      comment,
    });
  };

  return (
    <div className="mt-2 space-y-2">
      <div className="flex flex-col p-4 bg-white">
        <div className="text-xs">
          {numComments} comments sorted by <b>{sortBy}</b>
          <button onClick={handleSortByClick}>
            <FontAwesomeIcon
              icon={sortBy === SortBy.TOP ? faChevronDown : faChevronUp}
            />
          </button>
        </div>
        <>
          <Sheet
            isOpen={isOpen}
            onClose={() => setOpen(false)}
            snapPoints={[400]}
            initialSnap={0}
          >
            <Sheet.Container>
              <Sheet.Content
                style={{
                  justifyContent: "center",
                  display: "block",
                }}
              >
                <textarea
                  style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    borderRadius: "10px",
                    border: "2px solid #F9D040",
                    outline: "none",
                    padding: "10px",
                    height: "80px",
                    marginTop: "16px",
                    display: "flex",
                    width: "90%",
                    resize: "none",
                  }}
                  placeholder="Add a comment..."
                  onFocus={(e) => (e.target.placeholder = "")}
                  onBlur={(e) => (e.target.placeholder = "Add a comment...")}
                  value={comment}
                  onChange={handleCommentChange}
                />
                <button
                  onClick={handlePostComment}
                  className="p-1 my-2 text-base font-bold bg-yellow-300 rounded-full"
                  style={{
                    justifyContent: "center",
                    marginLeft: "auto",
                    marginRight: "auto",
                    borderRadius: "25px",
                    border: "2px solid #F9D040",
                    outline: "none",
                    padding: "3px",
                    marginTop: "16px",
                    display: "flex",
                    width: "90%",
                    resize: "none",
                  }}
                >
                  Post
                </button>
              </Sheet.Content>
            </Sheet.Container>
            <Sheet.Backdrop />
          </Sheet>
        </>
        <button
          onClick={handleAddComment}
          className="p-1 my-2 text-base font-bold bg-yellow-300 rounded-full"
        >
          Add a comment
        </button>
      </div>
      <div className="bg-white">
        {comments.map((comment, index) => {
          return <CommentsListItem key={index} {...comment} />;
        })}
      </div>
    </div>
  );
};

export default CommentsList;
