import React from "react";
import type { Course } from "../types/course.ts";

interface CourseCardProps {
  course: Course;
  onSelect: (course: Course) => void;
  onPurchase: (id: string) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onSelect, onPurchase }) => {
  return (
    <div className="course-card">
      <h3 className="course-title">{course.title}</h3>
      <p className="course-description">{course.description}</p>
      <p className="course-price">€{course.price}</p>
      <div className="course-actions">
        <button onClick={() => onSelect(course)}>Preview</button>
        <button onClick={() => onPurchase(course.id)}>Buy</button>
      </div>
    </div>
  );
};

export default CourseCard;