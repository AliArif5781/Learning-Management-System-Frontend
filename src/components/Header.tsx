// src/components/LmsHeader.tsx
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/hook";
// import { logout } from "@/features/user.slice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { logoutUserThunk } from "@/features/user/user.thunk";

export default function LmsHeader() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((s) => s.user);

  const handleLogout = async () => {
    await dispatch(logoutUserThunk());
    navigate("/login", { replace: true });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
      <div className="container mx-auto px-4 md:px-14">
        <div className="flex h-14 items-center justify-between">
          {/* Left: App Name / Logo */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="font-semibold text-lg tracking-tight">
              LMS
            </Link>
          </div>

          <div className="flex items-center gap-3 cursor-pointer">
            {loading?.getPRofileLoading && (
              <div className="h-9 w-40 animate-pulse rounded-md bg-muted" />
            )}

            {!loading?.getPRofileLoading && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="cursor-pointer">
                  <Button variant="ghost" className="h-10 px-2">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <img
                          src={
                            user.thumbnailUrl ||
                            "https://th.bing.com/th/id/OIP.6Ozqp7VQSBZZQcpyQhd8IQHaHa?w=181&h=181&c=7&r=0&o=5&cb=ucfimg2&dpr=1.3&pid=1.7&ucfimg=1"
                          }
                          alt={user.firstName}
                          className=" rounded-full object-cover"
                          loading="lazy"
                        />
                      </Avatar>
                      <div className="hidden sm:flex flex-col items-start">
                        <span className="text-sm font-medium leading-tight">
                          {user?.firstName} {user?.lastName}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {user?.email}
                        </span>
                      </div>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    {user.role === "Admin" && (
                      <DropdownMenuItem asChild>
                        <Link to="/">Home</Link>
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuItem>
                  {user.role === "Admin" && (
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                  )}
                  {user.role === "Admin" && (
                    <DropdownMenuItem asChild>
                      <Link to="/create-course">Create course</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link to="/user-profile">User Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-red-600 focus:text-red-600"
                    onClick={handleLogout}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild size="sm">
                  <Link to="/signup">Sign up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
