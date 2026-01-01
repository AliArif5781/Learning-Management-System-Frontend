import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useAppDispatch, useAppSelector } from "@/app/hook";
import { createCourseThunk } from "@/features/courses/course.thunk";
import type { CourseLevel, MediaType, UploadResponse } from "@/types/type";
import { IKContext, IKUpload } from "imagekitio-react";
import { X } from "lucide-react";
import { getOptimizedMedia } from "@/features/ImageKit/OptimizedMedia";
import { authenticator } from "@/features/ImageKit/Authenticator";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

export default function CreateCourseForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [timeToRead, settimeToRead] = useState("");
  const [error, setError] = useState("");
  const [level, setLevel] = useState<CourseLevel | null>(null);
  const [price, setPrice] = useState(0);

  const [mediaUrl, setMediaUrl] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<MediaType | null>(null);
  const [uploading, setUploading] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");

  const { user } = useAppSelector((state) => state.user);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !description.trim() || !level) {
      setError("All fields are required ");
      return;
    }

    await dispatch(
      createCourseThunk({
        name,
        description,
        level,
        price,
        timeToRead,
        mediaUrl,
        mediaType,
        thumbnailUrl,
      })
    );

    toast.success("Course Created Successfully");

    setName("");
    setDescription("");
    setLevel(null);
    setPrice(0);
    setMediaUrl(null);
    setMediaType(null);
    setError("");
    navigate("/dashboard");
  };

  const handleRemoveMedia = () => {
    setMediaUrl(null);
    setMediaType(null);
  };

  return (
    <div className="min-h-screen bg-muted/40 p-4 md:p-8">
      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              Create New Course
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Fill in the details below to publish your course
            </p>
          </CardHeader>

          {/* IMAGEKIT UPLOAD */}
          <IKContext
            publicKey={import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY}
            urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
            authenticator={authenticator}
          >
            <IKUpload
              fileName={name || "course-media"}
              accept="image/*,video/*"
              onUploadStart={() => setUploading(true)}
              onError={(err: Error) => {
                setUploading(false);
                alert("Upload error: " + err.message);
              }}
              onSuccess={(res: UploadResponse) => {
                // console.log("File Type:", res.fileType); // <-- check this
                setUploading(false);

                const optimized = getOptimizedMedia(res);
                setMediaUrl(optimized.url);
                setMediaType(optimized.mediaType);
                setThumbnailUrl(res.thumbnailUrl);

                // console.log("Original URL:", res.url);
                // console.log("Optimized URL:", optimized.url);
                //
              }}
              className="cursor-pointer rounded border border-dashed px-4 py-2 mt-4 mx-4 hover:shadow-md"
            />
          </IKContext>

          {uploading && (
            <p className="text-sm text-center text-muted-foreground px-4 mt-2 animate-pulse">
              Uploading...
            </p>
          )}

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {mediaUrl && (
                <div className="relative rounded-xl">
                  {mediaType === "video" ? (
                    <video
                      controls
                      className=" w-full aspect-video object-contain rounded-xl"
                    >
                      <source src={mediaUrl} />
                    </video>
                  ) : (
                    <img
                      src={mediaUrl}
                      alt="Course Media"
                      className=" w-full aspect-video object-cover rounded-xl"
                    />
                  )}

                  <button
                    type="button"
                    onClick={handleRemoveMedia}
                    className="absolute top-2 right-2 rounded-full w-8 h-8 flex items-center justify-center hover:bg-muted"
                  >
                    <X className="h-5 w-5 text-red-600  cursor-pointer" />
                  </button>
                </div>
              )}

              <div className="space-y-2">
                <Label>Course Title</Label>
                <Input
                  placeholder="e.g. Complete React Mastery"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setError("");
                  }}
                />
              </div>

              <div className="space-y-1">
                <Label>Description:</Label>
                <span className="text-xs text-muted-foreground">
                  "Use Markdown: **bold**, - lists"
                </span>
                <Textarea
                  placeholder="What will students learn?"
                  // className="resize-none min-h-32 max-h-64 whitespace-pre-line leading-relaxed"
                  className="resize-none min-h-32 max-h-64 whitespace-pre-line leading-relaxed"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    setError("");
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label>Difficulty Level</Label>
                <Select
                  value={level ?? ""}
                  onValueChange={(value) => {
                    setLevel(value as CourseLevel);
                    setError("");
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select course level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-between">
                <div className="space-y-2">
                  <Label>Price ($)</Label>
                  <Input
                    type="number"
                    min="0"
                    value={price}
                    onChange={(e) => {
                      setPrice(Number(e.target.value));
                      setError("");
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Time to Read</Label>
                  <Input
                    placeholder="In minute (optional)"
                    type="number"
                    value={timeToRead}
                    onChange={(e) => settimeToRead(e.target.value)}
                    min={1}
                  />
                </div>
              </div>
              {error && <div className="text-red-500 ">{error}</div>}
              <Button type="submit" className="w-full" disabled={uploading}>
                Create Course
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="hidden lg:flex flex-col justify-center border-dashed p-4">
          <CardContent className="space-y-4 text-center">
            <h3 className="text-xl font-semibold">Live Preview</h3>

            <div className="rounded-lg border p-4 text-left space-y-2 bg-background">
              <div className="flex items-center justify-center">
                {mediaUrl ? (
                  mediaType === "video" ? (
                    <video
                      controls
                      className=" w-full aspect-video object-cover rounded-xl"
                    >
                      <source src={mediaUrl} />
                    </video>
                  ) : (
                    <img
                      src={mediaUrl}
                      alt="Preview"
                      className=" w-full aspect-video object-cover rounded-xl"
                    />
                  )
                ) : (
                  <div className="h-52 w-full flex items-center justify-center rounded-xl border border-dashed text-muted-foreground">
                    Preview will appear here
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center">
                <p className="font-medium text-lg">{name || "Course Title"}</p>
                <span className="font-semibold">
                  {price > 0 ? `$${price}` : "free"}
                </span>
              </div>

              <div className="flex items-center justify-between pt-2 text-sm  border-b py-4">
                <div className="flex gap-5">
                  <div className="flex items-end">
                    <span className="text-sm ">
                      {user?.firstName} {user?.lastName}, Author
                    </span>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    {new Date().toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </div>
                <Badge className="capitalize">{level || "Level"}</Badge>
              </div>

              <div className="resize-none min-h-32 whitespace-pre-line leading-relaxed text-muted-foreground">
                <ReactMarkdown>
                  {description || "Course description will appear here..."}
                </ReactMarkdown>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
