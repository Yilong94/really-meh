import { FC } from "react";
import Sheet from "react-modal-sheet";

interface Props {
  handleCommentChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handlePostComment: () => void;
  isOpen: boolean;
  setOpen: (btmSheetState: boolean) => void;
  comment: string;
}

const BottomSheet: FC<Props> = (Props) => {
  const { handleCommentChange, handlePostComment, isOpen, setOpen, comment } =
    Props;
  return (
    <Sheet
      isOpen={isOpen}
      onClose={() => setOpen(false)}
      snapPoints={[400]}
      initialSnap={0}
    >
      <Sheet.Container>
        <Sheet.Content>
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
  );
};

export { BottomSheet };
