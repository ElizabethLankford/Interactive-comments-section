import IconBtn from "./IconBtn";
import { FaEdit, FaHeart, FaReply, FaTrash } from "react-icons/fa";

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
});

export default function Comment({ id, message, user, createdAt }) {
  return (
    <>
      <div>
        <div>
          <span>{user.name}</span>
          <span>{dateFormatter.format(Date.parse(createdAt))}</span>
        </div>
        <div>{message}</div>
        <div>
          <IconBtn Icon={FaHeart} aria-lable="Like">
            2
          </IconBtn>
          <IconBtn Icon={FaReply} aria-lable="Reply" />
          <IconBtn Icon={FaEdit} aria-lable="Edit" />
          <IconBtn Icon={FaTrash} aria-lable="Delete" />
        </div>
      </div>
    </>
  );
}
