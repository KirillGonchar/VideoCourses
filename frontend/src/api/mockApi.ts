import type { Course } from "../types/course.ts";

/*
const mockCourses: Course[] = [
    {
        id: "1",
        title: "React for Beginners",
        description: "Learn the basics of React step by step.",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        price: 100,
    },
    {
        id: "2",
        title: "Advanced TypeScript",
        description: "Deep dive into TypeScript for large projects.",
        videoUrl: "https://www.w3schools.com/html/movie.mp4",
        price: 200,
    },
];*/

const mockCourses: Course[] = Array.from({ length: 10 }).map((_, i) => ({
  id: `${i + 1}`,
  title: `React for Beginners ${i + 1}`,
  description: `Learn the basics of React step by step. This is the description for Course ${i + 1}.`,
  price: (i + 1) * 10,
  videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // sample MP4
})).concat(Array.from({ length: 10 }).map((_, i) => ({
  id: `${i + 11}`,
  title: `Advanced TypeScript ${i + 11}`,
  description: `Deep dive into TypeScript for large projects. This is the description for Course ${i + 11}.`,
  price: (i + 11) * 10,
  videoUrl: "https://www.w3schools.com/html/movie.mp4", // sample MP4
}))) ;

export const getCourses = (): Promise<Course[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.3) {
        reject(new Error("Network error: Failed to fetch courses"));
      } else {
        resolve(mockCourses);
      }
    }, 500);
  });
};

export const handlePurchase = (id: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() > 0.2
        ? resolve(`Successfully purchased course ${id}`)
        : reject("Payment failed. Please try again.");
    }, 700);
  });
};