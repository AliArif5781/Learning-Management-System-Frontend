import { useAppDispatch, useAppSelector } from "@/app/hook";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authenticator } from "@/features/ImageKit/Authenticator";
import { getOptimizedMedia } from "@/features/ImageKit/OptimizedMedia";
import { clearError } from "@/features/user/user.slice";
import { fetchProfileThunk, signupUserThunk } from "@/features/user/user.thunk";
import type { MediaType, UploadResponse } from "@/types/type";
import { IKContext, IKUpload } from "imagekitio-react";
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<MediaType | null>(null);
  const [uploading, setUploading] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");

  const HandleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const signupResult = await dispatch(
      signupUserThunk({
        firstName,
        lastName,
        email,
        password,
        mediaType,
        mediaUrl,
        thumbnailUrl,
      })
    );
    if (signupUserThunk.fulfilled.match(signupResult)) {
      await dispatch(fetchProfileThunk());

      navigate("/", { replace: true });
    }
  };

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={HandleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">First Name</FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="John"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  dispatch(clearError());
                }}
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="lastname">First Name</FieldLabel>
              <Input
                id="lastname"
                type="text"
                placeholder="Doe"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  dispatch(clearError());
                }}
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  dispatch(clearError());
                }}
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  dispatch(clearError());
                }}
                placeholder="Enter your password"
                required
              />
            </Field>

            <IKContext
              publicKey={import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY}
              urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
              authenticator={authenticator}
            >
              <IKUpload
                accept="image/*"
                onUploadStart={() => setUploading(true)}
                onError={(err: Error) => {
                  setUploading(false);
                  alert("Upload error: " + err.message);
                }}
                onSuccess={(res: UploadResponse) => {
                  setUploading(false);

                  const optimized = getOptimizedMedia(res);
                  setMediaUrl(optimized.url);
                  setMediaType(optimized.mediaType);
                  setThumbnailUrl(res.thumbnailUrl);
                }}
                className="cursor-pointer rounded border border-dashed px-4 py-2 mt-4 mx-4 hover:shadow-md"
              />
            </IKContext>

            {uploading && (
              <p className="text-sm text-center text-muted-foreground px-4 mt-2 animate-pulse">
                Uploading...
              </p>
            )}

            {mediaUrl && (
              <div className="flex justify-center items-center w-full rounded-full">
                {mediaUrl && (
                  <img
                    src={mediaUrl}
                    alt={`${firstName} profile photo`}
                    className="h-20 w-20 object-cover rounded-full"
                    loading="lazy"
                  />
                )}
              </div>
            )}
            {error && (
              <span className="text-sm text-red-500 text-center">{error}</span>
            )}
            <FieldGroup>
              <Field>
                <Button type="submit" disabled={loading.signUpLoading}>
                  {loading.signUpLoading ? "loading..." : "Create Account"}
                </Button>
                {/* <Button variant="outline" type="button">
                  Sign up with Google
                </Button> */}
                <FieldDescription className="px-6 text-center font-medium">
                  Already have an account? <Link to={"/login"}>Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
