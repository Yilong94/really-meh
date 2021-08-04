import { faExpandAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useRef, useState } from "react";
import Sheet, { SheetRef } from "react-modal-sheet";

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
  const ref = useRef<SheetRef>();
  const [expanded, setExpanded] = useState<boolean>(false);
  const snapTo = (i: number) => {
    return ref.current?.snapTo(i);
  };

  return (
    <Sheet
      ref={ref}
      isOpen={isOpen}
      onClose={() => setOpen(false)}
      snapPoints={[300, 200]}
      initialSnap={1}
      onSnap={(snapIndex) => setExpanded(snapIndex === 0)}
    >
      <Sheet.Container>
        <Sheet.Content>
          <div>
            <textarea
              style={{
                flex: 1,
                marginLeft: "auto",
                marginRight: "auto",
                borderRadius: "10px",
                border: "2px solid #F9D040",
                outline: "none",
                padding: "10px",
                height: expanded ? "200px" : "80px",
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
            <FontAwesomeIcon
              onClick={() => snapTo(expanded ? 1 : 0)}
              style={{
                position: "absolute",
                top: "25px",
                right: "45px",
                color: "#757575",
              }}
              icon={faExpandAlt}
            />
          </div>
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
      <Sheet.Backdrop onTap={() => setOpen(false)} />
    </Sheet>
  );
};

export { BottomSheet };
