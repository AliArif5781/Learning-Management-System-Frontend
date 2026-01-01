import { useAppDispatch, useAppSelector } from "@/app/hook";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { createCommentThunk } from "@/features/courses/course.thunk";
import { useState } from "react";
import { useParams } from "react-router-dom";
import ShowAllComments from "./ShowAllComments";

const CommentSection = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [comment, setComment] = useState<string>("");
  const { user } = useAppSelector((state) => state.user);
  const { loading } = useAppSelector((state) => state.course);
  const { selectedCourse } = useAppSelector((state) => state.course);

  const handleCommentSubmit = async () => {
    if (!comment.trim() || !id) return;

    await dispatch(
      createCommentThunk({
        id,
        comment,
      })
    );
    console.log(comment, "comment");
    setComment("");
  };

  return (
    <div className="w-full">
      <CardContent className="space-y-4">
        {/* Avatar + Input */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
          <Avatar className="h-9 w-9 shrink-0">
            <AvatarImage
              src={
                user?.thumbnailUrl ||
                "https://th.bing.com/th/id/OIP.6Ozqp7VQSBZZQcpyQhd8IQHaHa?w=181&h=181&c=7&r=0&o=5&cb=ucfimg2&dpr=1.3&pid=1.7&ucfimg=1"
              }
              alt={user?.firstName || "User avatar"}
            />
            <AvatarFallback>
              {user?.firstName?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>

          <Textarea
            rows={3}
            placeholder="What are your thoughts?"
            className="w-full min-h-40 resize-none leading-relaxed"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        {/* Button */}
        <div className="flex justify-end">
          <Button
            size={"sm"}
            disabled={!comment.trim()}
            onClick={handleCommentSubmit}
            className=" disabled:cursor-none"
          >
            {loading.commentLoading ? "loading.. " : "Add Comment"}
          </Button>
          {/* <Button
            size="sm"
            variant={""}
            disabled={!comment.trim()}
            onClick={handleCommentSubmit}
          >
            {loading.commentLoading ? "loading.. " : "Add Comment"}
            abc
          </Button> */}
        </div>
      </CardContent>

      <div className="border-b py-5" />
      {/* All comments */}

      <div>
        {selectedCourse?.comment && selectedCourse.comment.length > 0 ? (
          selectedCourse.comment.map((comment) => (
            <ShowAllComments key={comment._id} comment={comment} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border bg-muted/40 p-6 text-center mt-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-muted-foreground mb-3"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>

            <p className="text-sm font-medium">No comments yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Be the first to share your thoughts and start the discussion.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;

/**
 * A POS (Point of Sale) financial app is software used to manage sales transactions, payments, and related financial operations at a business.

It usually includes features like:

Recording sales and purchases

Handling payments (cash, card, digital wallets)

Managing inventory

Generating receipts

Tracking daily, weekly, or monthly revenue

In short, it’s the system that helps a store or business process transactions and manage finances efficiently.
 */
