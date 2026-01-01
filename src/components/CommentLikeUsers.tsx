import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppSelector } from "@/app/hook";

interface CommentLikeHoverProps {
  commentId: string;
}

const CommentLikeHover = ({ commentId }: CommentLikeHoverProps) => {
  const { selectedCourse, loading } = useAppSelector((state) => state.course);

  const comment = selectedCourse?.comment?.find((c) => c._id === commentId);

  // Loading state (course still fetching)
  if (loading.loadingSelectedCourse) {
    return (
      <div className="w-56 rounded-md border bg-background p-3 shadow-md">
        <p className="text-xs text-muted-foreground">Loading...</p>
      </div>
    );
  }

  // Safety fallback
  if (!comment || !comment.likes || comment.likes.length === 0) return null;

  return (
    <div className="w-56 rounded-md border bg-background p-5 shadow-md">
      <ul className="space-y-4">
        {comment.likes.map((user) => (
          <li key={user._id} className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={user.thumbnailUrl} />
              <AvatarFallback>
                {user?.firstName?.slice(0, 1)}
                {user.lastName?.slice(0, 1)}
              </AvatarFallback>
            </Avatar>

            <span className="text-sm font-medium">
              {user.firstName} {user.lastName}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentLikeHover;
