import type { Course } from "../types/course.ts";

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
];

export const getCources = (): Promise<Course[]> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(mockCourses), 500);
    });
};

export const handlePurchase = (id: string) => {
    alert(`Purchased course with id: ${id}`);
};