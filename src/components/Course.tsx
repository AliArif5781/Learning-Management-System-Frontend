import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Course } from "@/types/type";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface InfoCardProps {
  course: Course;
}

export const getLevelBadgeVariant = (level: string) => {
  switch (level.toLowerCase()) {
    case "beginner":
      return "secondary";
    case "intermediate":
      return "outline";
    case "advanced":
      return "destructive";
    default:
      return "default";
  }
};

export function Course({ course }: InfoCardProps) {
  const navigate = useNavigate();

  const hasMedia = Boolean(course.mediaUrl);
  const [mediaLoading, setMediaLoading] = useState(hasMedia);

  return (
    <Card
      className="group flex flex-col cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      onClick={() => navigate(`/courses/${course._id}`)}
    >
      <div className="relative w-full h-56 overflow-hidden px-3">
        {hasMedia && mediaLoading && (
          <div className="absolute inset-0 flex items-center justify-center animate-pulse text-muted-foreground">
            Loading media…
          </div>
        )}

        {!hasMedia && (
          <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground bg-muted rounded-md">
            No media available
          </div>
        )}

        {hasMedia && course.mediaType === "image" && (
          <img
            src={course.mediaUrl}
            alt={course.name}
            loading="lazy"
            onLoad={() => setMediaLoading(false)}
            onError={() => setMediaLoading(false)}
            className={`h-full w-full object-cover transition-opacity duration-300 rounded-md ${
              mediaLoading ? "opacity-0" : "opacity-100"
            }`}
          />
        )}

        {hasMedia && course.mediaType === "video" && (
          <video
            src={course.mediaUrl}
            preload="metadata"
            muted
            onLoadedData={() => setMediaLoading(false)}
            onError={() => setMediaLoading(false)}
            className={`h-full w-full object-cover transition-opacity duration-300 ${
              mediaLoading ? "opacity-0" : "opacity-100"
            }`}
          />
        )}
      </div>

      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold tracking-tight">
            {course.name}
          </CardTitle>

          <Badge variant={getLevelBadgeVariant(course.level)}>
            {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 flex-1">
        <p className="text-sm text-muted-foreground line-clamp-4">
          {course.description}
        </p>

        <div className="mt-auto flex justify-end">
          <span className="text-lg font-semibold text-primary">
            {Number(course.price) > 0 ? `$${course.price}` : "Free"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
