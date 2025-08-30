import React from "react";
import type { Course } from "../types/course.ts";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store.ts";

interface CourseCardProps {
  course: Course;
  onSelect: (course: Course) => void;
  onPurchase: (id: string) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onSelect, onPurchase }) => {
  const purchased = useSelector((state: RootState) => state.courses.purchasedCourses);
  const isPurchased = purchased.includes(course.id);
  return (
    <div className="course-card">
      <h3 className="course-title">{course.title}</h3>
      <p className="course-description">{course.description}</p>
      <div className="course-actions">
      <p className="course-price">€{course.price}</p>
        <button onClick={() => onSelect(course)}>Preview</button>
        {isPurchased ? (
          <span className="purchased-label">Purchased</span>
        ) : (
          <button onClick={() => onPurchase(course.id)}>Buy</button>
        )}
      </div>
    </div>
  );
};

export default CourseCard;