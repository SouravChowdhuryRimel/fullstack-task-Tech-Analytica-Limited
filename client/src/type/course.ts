export type CourseModule = {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
};

export type Lesson = {
  id: string;
  title: string;
  duration: number;
  content: string;
  videoUrl?: string;
  order: number;
};

export type Course = {
  id: string;
  title: string;
  description: string;
  isPaid: boolean;
  thumbnail: string;
  category: string[];
  modules?: CourseModule[];
  createdAt: string;
  updatedAt: string;
};

export type CourseFormValues = {
  title: string;
  description: string;
  isPaid: boolean;
  thumbnail: string;
  category: string[];
};

export type Content = {
  id: string;
  title: string;
  fileUrl: string;
  duration: number; // in seconds
  description: string;
  tags: string[];
  moduleId: string;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
  thumbnailUrl?: string;
};

export type ContentFormValues = {
  title: string;
  file: File | null;
  duration: number;
  description: string;
  tags: string[];
  moduleId: string;
  viewCount: number;
};

export type Module = {
  id: string;
  title: string;
  courseId: string;
  order: number;
};
