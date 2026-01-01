import { useAppSelector } from "@/app/hook";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ProfilePage = () => {
  const { user } = useAppSelector((state) => state.user);

  return (
    <div>
      <h1 className="flex justify-center items-center text-4xl font-bold leading-relaxed mt-2">
        User Profile
      </h1>
      <div className="min-h-screen px-6 flex justify-center">
        <div className="h-full px-6 py-5 flex flex-col md:flex-row justify-center gap-10">
          {" "}
          {/* Left Panel: Profile Info */}
          <Card className="rounded-2xl shadow-lg p-10 flex flex-col items-center text-center">
            {" "}
            <h1 className="text-4xl font-extrabold mb-1">
              {user?.firstName} {user?.lastName}
            </h1>
            <Badge className=" font-semibold mb-8">{user?.role} </Badge>
            <Avatar className="h-36 w-36 md:w-52 md:h-52 ring-8 ring-gray-700 mb-8">
              {user?.mediaType === "image" && user?.thumbnailUrl ? (
                <AvatarImage
                  src={user.thumbnailUrl}
                  alt={`${user.firstName} avatar`}
                />
              ) : (
                <AvatarFallback className="text-6xl font-bold">
                  {user?.firstName?.[0]}
                  {user?.lastName?.[0]}
                </AvatarFallback>
              )}
            </Avatar>
          </Card>
          {/* Right Panel: Bio & Details */}
          <Card className="rounded-2xl shadow-lg p-8 flex flex-col">
            {" "}
            <CardHeader>
              <CardTitle className="text-2xl font-bold mb-2">
                Bio & other details
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-12 gap-x-6 gap-y-4">
              <div className="col-span-6 space-y-6">
                <div>
                  <CardTitle className="py-1">My Role</CardTitle>
                  <span className="text-muted-foreground text-sm">
                    {user?.role || ""}
                  </span>
                </div>
                <div>
                  <CardTitle className="py-1">Education</CardTitle>
                  <span className="text-muted-foreground text-sm">
                    {user?.Education || ""}
                  </span>
                </div>
                <div>
                  <CardTitle className="py-1">Country</CardTitle>
                  <span className="text-muted-foreground text-sm">
                    {user?.country || ""}
                  </span>
                </div>
              </div>
              <div className="col-span-6 space-y-6">
                <div>
                  <CardTitle className="py-1">Profession</CardTitle>
                  <span className="text-muted-foreground text-sm">
                    {user?.profession || ""}
                  </span>
                </div>

                <div>
                  <CardTitle className="py-1">Tech Stack</CardTitle>
                  <span className="text-muted-foreground text-sm">
                    {user?.techStack || ""}
                  </span>
                </div>
              </div>
            </CardContent>
            <Link
              to={"/update-profile"}
              className="flex justify-end items-end h-full pr-5"
            >
              <Button>Update Profile</Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
