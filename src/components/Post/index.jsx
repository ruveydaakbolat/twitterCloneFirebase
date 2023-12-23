import { BiMessageRounded } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { AiOutlineHeart } from "react-icons/ai";
import { FiShare2 } from "react-icons/fi";
import moment from "moment/moment";
import "moment/locale/tr";
import { auth, db } from "../../firebase/config";
import DropDown from "./DropDown";
import {
  doc,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { useState } from "react";
import EditMode from "./EditMode";

const Post = ({ tweet }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const date = moment(tweet?.createdAt?.toDate()).fromNow();

  const isLiked = tweet.likes.includes(auth.currentUser.uid);

  const handleDelete = async () => {
    if (confirm("Tweet'i silmeyi onaylıyor musunuz ?")) {
      const tweetRef = doc(db, "tweets", tweet.id);

      await deleteDoc(tweetRef);
    }
  };

  const handleLike = async () => {
    const ref = doc(db, "tweets", tweet.id);

    await updateDoc(ref, {
      likes: isLiked
        ? arrayRemove(auth.currentUser.uid)
        : arrayUnion(auth.currentUser.uid),
    });
  };

  return (
    <div className="relative flex gap-3 px-3 py-6 border-b-[1px] border-gray-700">
      <img
        className="w-12 h-12 rounded-full"
        src={tweet.user.photo}
        alt="user"
      />

      <div className="w-full">
        <div className="flex justify-between">
          <div className="flex items-center gap-3 whitespace-nowrap">
            <p className="font-bold">{tweet.user.name}</p>
            <p className="text-gray-400">
              @{tweet.user.name.toLowerCase().replace(" ", "_")}
            </p>
            <p className="text-gray-400">{date}</p>
          </div>

          {tweet.user.id === auth.currentUser.uid && (
            <DropDown
              setIsEditMode={setIsEditMode}
              handleDelete={handleDelete}
            />
          )}
        </div>

        <div className="my-3">
          {isEditMode && (
            <EditMode tweet={tweet} close={() => setIsEditMode(false)} />
          )}

          {!isEditMode && tweet.textContent && (
            <p className="my-2">{tweet.textContent}</p>
          )}

          {!isEditMode && tweet.imageContent && (
            <img
              className="my-2 rounded-lg w-full object-cover max-h-[400px]"
              src={tweet.imageContent}
            />
          )}
        </div>

        <div className="flex justify-between">
          <div className="py-2 px-3 rounded-full cursor-pointer transition hover:bg-[#00b7ff69]">
            <BiMessageRounded />
          </div>
          <div className="py-2 px-3 rounded-full cursor-pointer transition hover:bg-[#00ff4441]">
            <FaRetweet />
          </div>
          <div
            onClick={handleLike}
            className="flex items-center gap-2 py-2 px-3 rounded-full cursor-pointer transition hover:bg-[#da52a8a5]"
          >
            {isLiked ? <FcLike /> : <AiOutlineHeart />}
            <span>{tweet.likes.length}</span>
          </div>
          <div className="py-2 px-3 rounded-full cursor-pointer transition hover:bg-[#aca3a666]">
            <FiShare2 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
