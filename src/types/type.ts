export type MediaType = "image" | "video" | null;

export type Login = {
  email: string;
  password: string;
};

export type Signup = {
  firstName: string;
  lastName: string;
  email: string;
  mediaUrl?: string | null;
  mediaType?: MediaType | null;
  thumbnailUrl?: string | null;
  password: string;
};

export type TokenResponse = {
  accessToken: string;
};

export type AuthUser = {
  _id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  profession?: string;
  Education?: string;
  techStack?: string;
  country?: string;
  role?: string;
  mediaUrl?: string;

  mediaType?: MediaType;
  thumbnailUrl?: string;
  // avatarUrl?: string;
};

// course.slice.ts:
// export interface Author {
//   user: string;
// }

export interface likeUser {
  _id?: string;
  likeUser: string;
  firstName?: string;
  lastName?: string;
  thumbnailUrl?: string;
  commentId: string;
  createdAt?: string;
}

export interface CourseComment {
  _id: string;
  user: AuthUser;
  comment: string;
  createdAt: string;
  likes?: likeUser[];
}

export interface Course {
  _id: string;
  name: string;
  description: string;
  level: string;
  price: string;
  user: AuthUser;
  mediaUrl?: string;
  timeToRead?: string;
  mediaType?: MediaType;
  thumbnailUrl?: string;
  createdAt?: string;

  comment?: CourseComment[];
}

export interface CourseState {
  item: Course[];
  selectedCourse: Course | null;
  pagination: {
    limit: number;
    offset: number;
    total: number;
    hasMore: boolean;
  };

  loading: {
    titleLoading: boolean;
    descriptionLoading: boolean;
    loadingSelectedCourse: boolean;
    priceLoading: boolean;
    levelLoading: boolean;
    deleteLoading: boolean;
    commentLoading: boolean;
    likeLoading: boolean;
  };
  deleteCourse: Course | null;
  // error: string | null;
  error: {
    error: string | null;
    errorSelectedCourse: string | null;
    errorDeletedCourse: string | null;
    commentError: string | null;
    likeError: string | null;
  };
  createdAt?: string;
}

// types/course.ts
export type CourseLevel = "beginner" | "intermediate" | "advanced";
// export type SignupProfilePhotoType = "image" | null;

export interface CreateCourse {
  name: string;
  description: string;
  level: CourseLevel;
  timeToRead?: string;
  price: number;
  mediaUrl?: string | null;
  mediaType?: MediaType | null;
  thumbnailUrl?: string;
  createdAt?: string;
}

export interface UploadResponse {
  fileId: string;
  name: string;
  url: string;
  thumbnailUrl: string;
  height?: number;
  width?: number;
  size: number;
  fileType: string;
  mime?: string;
}

export interface OptimizedMedia {
  url: string;
  mediaType: MediaType | null;
}
