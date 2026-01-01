import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hook";
import { getCourseByIdThunk } from "@/features/courses/course.thunk";
import DescriptionSkeleton from "@/components/DescriptionSkeleton";
import { ArrowLeft } from "lucide-react";
import CommentSection from "./CommentSection";
import ReactMarkdown from "react-markdown";

export default function CourseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [click, setClick] = useState<boolean>(false);

  const { selectedCourse, loading, error } = useAppSelector(
    (state) => state.course
  );

  useEffect(() => {
    if (id) {
      dispatch(getCourseByIdThunk(id));
    }
  }, [id, dispatch]);

  if (loading.loadingSelectedCourse) return <DescriptionSkeleton />;
  if (error.errorSelectedCourse)
    return <p className="text-red-500">{error.errorSelectedCourse}</p>;
  if (!selectedCourse) return <p>Course not found</p>;

  const handleBack = () => {
    navigate(-1);
  };

  const handleClickPost = () => {
    setClick(true);
  };

  return (
    <div className="min-h-screen max-w-3xl mx-auto p-5 space-y-6">
      <div
        className="flex text-sm items-center text-muted-foreground hover:cursor-pointer hover:text-primary"
        onClick={handleBack}
      >
        <ArrowLeft className="h-3" />
        <span className="text-muted-foreground">Go back</span>
      </div>
      <h1 className="text-3xl font-bold">{selectedCourse.name}</h1>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img
            src={
              selectedCourse.user.thumbnailUrl ||
              "https://th.bing.com/th/id/OIP.6Ozqp7VQSBZZQcpyQhd8IQHaHa?w=181&h=181&c=7&r=0&o=5&cb=ucfimg2&dpr=1.3&pid=1.7&ucfimg=1"
            }
            alt=""
            className="h-6 rounded-3xl"
          />
          <span className="text-sm dark:text-white font-medium pl-2">
            {selectedCourse.user.firstName} {selectedCourse.user.lastName},
            Author
          </span>

          <span className="px-5 text-muted-foreground text-sm">
            {selectedCourse.createdAt
              ? new Date(selectedCourse.createdAt).toLocaleDateString("en-us", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : "N/A"}
          </span>
        </div>
        <p>
          <strong>Level:</strong> {selectedCourse.level}
        </p>
      </div>
      <div className="text-muted-foreground text-end text-sm">
        {selectedCourse.timeToRead && (
          <span>{selectedCourse.timeToRead} min read</span>
        )}
      </div>
      <div className="border-b p-2"></div>

      <div className="py-2">
        {click && (
          <div
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center rounded-2xl transition-all duration-300 ease-in-out"
            onClick={() => setClick(false)}
          >
            <div
              className="max-w-5xl w-full p-4"
              onClick={(e) => e.stopPropagation()} // prevent close on media click
            >
              {selectedCourse.mediaType === "image" ? (
                <img
                  src={selectedCourse.mediaUrl || ""}
                  alt="Full Preview"
                  className="w-full max-h-[90vh] object-contain rounded-lg"
                />
              ) : (
                <video
                  controls
                  autoPlay
                  className="w-full max-h-[90vh] rounded-lg"
                >
                  <source src={selectedCourse.mediaUrl || ""} />
                </video>
              )}
            </div>
          </div>
        )}

        {selectedCourse.mediaType === "image" ? (
          <img
            src={selectedCourse.mediaUrl || ""}
            alt={selectedCourse.name}
            className="w-full rounded-md cursor-pointer hover:shadow-md"
            onClick={handleClickPost}
            loading="lazy"
          />
        ) : selectedCourse.mediaType === "video" ? (
          <video
            controls
            className="w-full rounded-md cursor-pointer hover:shadow-md"
            src={selectedCourse.mediaUrl || ""}
            preload="none"
          />
        ) : (
          <div className="text-center py-5 border">No media available</div>
        )}
      </div>

      <div className="text-muted-foreground whitespace-pre-line text-lg leading-relaxed">
        <ReactMarkdown>{selectedCourse.description}</ReactMarkdown>
      </div>

      {/* Comment Section */}
      <CommentSection />
    </div>
  );
}
