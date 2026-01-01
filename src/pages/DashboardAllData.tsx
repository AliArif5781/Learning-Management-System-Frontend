import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button"; // if you have a button component
import { Trash2 } from "lucide-react";
import type { Course, CourseState } from "@/types/type";
import { getLevelBadgeVariant } from "@/components/Course";
import { useAppDispatch } from "@/app/hook";
import { DeleteCourseThunk } from "@/features/courses/course.thunk";
import { AlertDialogBox } from "@/components/ui/AlertDialogBox";

interface CourseProps {
  course: Course;
  loading: CourseState["loading"];
}

export function DashboardAllData({ course, loading }: CourseProps) {
  const dispatch = useAppDispatch();

  const handleDeleteCourse = async () => {
    await dispatch(DeleteCourseThunk(course._id));
  };
  return (
    <TableRow className="align-middle">
      <TableCell className="font-medium truncate p-2 md:p-3">
        {loading.titleLoading ? (
          <Skeleton className="block h-4 w-40" />
        ) : (
          course.name
        )}
      </TableCell>

      <TableCell className="text-left tabular-nums">
        {loading.priceLoading ? (
          <Skeleton className="block h-4 w-16" />
        ) : Number(course.price) > 0 ? (
          `$${course.price}`
        ) : (
          "free"
        )}
      </TableCell>

      <TableCell
        className="truncate text-muted-foreground"
        title={course.description}
      >
        {loading.descriptionLoading ? (
          <Skeleton className="block h-4 w-64" />
        ) : (
          course.description
        )}
      </TableCell>

      <TableCell className="text-right truncate">
        {loading.levelLoading ? (
          <Skeleton className="block h-4 w-16 ml-auto" />
        ) : (
          <Badge variant={getLevelBadgeVariant(course.level)}>
            {course.level}
          </Badge>
        )}
      </TableCell>

      <TableCell className="text-right text-muted-foreground truncate">
        {loading.levelLoading ? (
          <Skeleton className="block h-4 w-24 ml-auto" />
        ) : (
          `${course.user.firstName || ""} ${course.user.lastName || ""}`.trim()
        )}
      </TableCell>

      <TableCell className="text-center truncate">
        {loading.deleteLoading ? (
          <Skeleton className="block h-4 w-16 ml-auto" />
        ) : (
          <AlertDialogBox
            trigger={
              <Button
                variant="ghost"
                size="icon"
                aria-label={`Delete ${course.name}`}
              >
                <Trash2 className="h-4 w-4 text-red-500 cursor-pointer" />
              </Button>
            }
            title="Are you sure?"
            description="The course will be permanently deleted."
            onConfirm={handleDeleteCourse}
          />
        )}
      </TableCell>
    </TableRow>
  );
}
