import { useAppDispatch, useAppSelector } from "@/app/hook";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { updateUserProfileThunk } from "@/features/user/user.thunk";
import { useNavigate } from "react-router-dom";

const UpdateUserProfile = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    profession: user?.profession || "",
    Education: user?.Education || "",
    techStack: user?.techStack || "",
    country: user?.country || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(updateUserProfileThunk(formData));

    navigate("/dashboard");
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex justify-center items-start p-6 bg-muted/20">
      <Card className="w-full max-w-3xl rounded-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Update Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1">
                <Label>First Name</Label>
                <Input
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  name="firstName"
                />
              </div>
              <div className="flex flex-col space-y-1">
                <Label>Last Name</Label>
                <Input
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  name="lastName"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-1">
              <Label>Email</Label>
              <Input
                disabled
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                name="email"
                className=" disabled:cursor-none"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <Label>Profession</Label>
              <Input
                value={formData.profession}
                onChange={handleChange}
                name="profession"
                placeholder="Profession"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <Label>Education</Label>
              <Input
                value={formData.Education}
                onChange={handleChange}
                placeholder="Education"
                name="Education"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <Label>Tech Stack</Label>
              <Textarea
                value={formData.techStack}
                onChange={handleChange}
                placeholder="React, Typescript, Node.js..."
                className="resize-none"
                name="techStack"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <Label>Country</Label>
              <Input
                value={formData.country}
                onChange={handleChange}
                placeholder="Country"
                name="country"
              />
            </div>

            <Button type="submit" className="w-full mt-4">
              Update Profile
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateUserProfile;
