import { CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { CourseComment } from "@/types/type";
import { ThumbsUp } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/hook";
import { courseLikeThunk } from "@/features/courses/course.thunk";
import { useState } from "react";
import Show from "@/components/CommentLikeUsers";
import CommentLikeHover from "@/components/CommentLikeUsers";

interface ShowAllCommentsProps {
  comment: CourseComment;
}

const ShowAllComments = ({ comment }: ShowAllCommentsProps) => {
  const [showLikes, setShowLikes] = useState(false);

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const handleLike = async () => {
    if (!user?._id) return;

    await dispatch(
      courseLikeThunk({
        likeUser: user._id,
        commentId: comment._id,
      })
    );
  };

  return (
    <div className="mt-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="flex items-start gap-4 p-4 overflow-visible">
        {/* Avatar */}
        <Avatar
          className="relative h-10 w-10 shrink-0"
          onMouseEnter={() => setShowLikes(true)}
          onMouseLeave={() => setShowLikes(false)}
        >
          <AvatarImage
            src={
              comment.user.thumbnailUrl ||
              "https://th.bing.com/th/id/OIP.6Ozqp7VQSBZZQcpyQhd8IQHaHa"
            }
            alt={comment.user.firstName || "User avatar"}
          />
          <AvatarFallback>
            {comment.user.firstName?.charAt(0).toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>

        {/* Comment Content */}
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold">
              {comment.user.firstName} {comment.user.lastName}
            </h4>
            <span className="text-xs text-muted-foreground">
              {new Date(comment.createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>

          <p className="text-sm text-muted-foreground whitespace-pre-line">
            {comment.comment}
          </p>

          {/* 👍 Like Section */}
          <div className="relative inline-flex items-center gap-1">
            <ThumbsUp
              onClick={handleLike}
              className={`h-4 w-4 cursor-pointer ${
                comment.likes?.some((u) => u._id === user?._id)
                  ? "text-red-600"
                  : "text-muted-foreground"
              }`}
            />

            <span className="text-sm font-medium">
              {comment.likes?.length || 0}
            </span>

            {/* Hover Card (ABOVE 👍) */}
            {showLikes && (
              <div className="absolute bottom-full left-0 mb-2 z-50">
                <CommentLikeHover commentId={comment._id} />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </div>
  );
};

export default ShowAllComments;
