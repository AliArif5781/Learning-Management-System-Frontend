import { useAppDispatch, useAppSelector } from "@/app/hook";
import { Course } from "@/components/Course";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { resetCourses } from "@/features/courses/course.slice";
import { getAllCoursesThunk } from "@/features/courses/course.thunk";
import { useEffect } from "react";

const CourseList = () => {
  const dispatch = useAppDispatch();
  const { item, loading, error, pagination } = useAppSelector(
    (state) => state.course
  );

  useEffect(() => {
    // dispatch(resetCourses());
    if (item.length === 0) {
      dispatch(getAllCoursesThunk({ limit: pagination.limit, offset: 0 }));
    }
  }, []);

  const loadMore = () => {
    if (pagination.hasMore && !loading.titleLoading) {
      dispatch(
        getAllCoursesThunk({
          limit: pagination.limit,
          offset: pagination.offset,
        })
      );
    }
  };

  const skeletonArray = Array.from({ length: 5 });

  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-5">
        {loading.titleLoading || loading.descriptionLoading ? (
          skeletonArray.map((_, index) => (
            <div key={index} className="space-y-3 rounded-xl border p-4">
              <Skeleton className="h-56 w-full rounded-xl" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-5 w-1/4 mt-3" />
            </div>
          ))
        ) : error.error ? (
          <p className="text-red-500">{error.error}</p>
        ) : (
          item.map((course, index) => <Course key={index} course={course} />)
        )}
      </div>
      <div className="flex justify-center pb-5">
        {pagination.hasMore && (
          <Button onClick={loadMore} className="cursor-pointer">
            Load More
          </Button>
        )}
      </div>
    </div>
  );
};

export default CourseList;
