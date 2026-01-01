import { useAppDispatch, useAppSelector } from "@/app/hook";
import { DashboardAllData } from "./DashboardAllData";
import { useEffect } from "react";
import { getAllCoursesThunk } from "@/features/courses/course.thunk";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { resetCourses } from "@/features/courses/course.slice";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { item, loading, pagination } = useAppSelector((state) => state.course);

  useEffect(() => {
    dispatch(resetCourses());
    dispatch(getAllCoursesThunk({ limit: 5, offset: 0 }));
  }, [dispatch, pagination.limit]);

  const skeletonRows = Array.from({ length: 3 });
  const COL_WIDTHS = [
    "md:w-[12%]",
    "md:w-[10%]",
    "md:w-[46%]",
    "md:w-[10%]",
    "md:w-[12%]",
    "md:w-[10%]",
  ];

  const allLoading =
    loading.titleLoading &&
    loading.descriptionLoading &&
    loading.priceLoading &&
    loading.levelLoading;

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

  return (
    <div className="min-h-screen p-7">
      <div className="px-10">
        <h1 className="text-2xl md:text-4xl font-semibold">Admin Dashboard</h1>
        <div className="flex justify-between my-4">
          <div>
            <span className="text-muted-foreground">
              Welcome,
              <span className="pl-1.5">
                {user?.firstName} {user?.lastName}
              </span>
            </span>
          </div>
          {pagination.hasMore && (
            <Button size={"sm"} onClick={loadMore}>
              Load More
            </Button>
          )}
        </div>

        <div className="w-full overflow-x-auto">
          <Table className="table-fixed w-full min-w-180 md:min-w-0">
            <TableCaption>Course Details</TableCaption>

            <colgroup>
              {COL_WIDTHS.map((w, i) => (
                <col key={i} className={w} />
              ))}
            </colgroup>

            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead className="text-left">Status</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Level</TableHead>
                <TableHead className="text-right">Author</TableHead>
                <TableHead className="text-center">Delete</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {allLoading && item.length === 0
                ? skeletonRows.map((_, i) => (
                    <TableRow key={i} className="align-middle">
                      <TableCell>
                        <Skeleton className="h-4 w-40" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-16 ml-auto" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-16 ml-auto" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-16 ml-auto" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-8 ml-auto" />
                      </TableCell>
                    </TableRow>
                  ))
                : item.map((data) => (
                    <DashboardAllData
                      key={data._id}
                      course={data}
                      loading={loading}
                    />
                  ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
