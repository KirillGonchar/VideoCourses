import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import type { Course } from "../types/course.ts";
import { getCources, handlePurchase } from "../api/mockApi.ts";

const CourseList: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  useEffect(() => {
    getCources().then(setCourses).catch(console.error);
  }, []);

  const handleCloseVideo = () => setSelectedCourse(null);

  return (
    <div className="course-list">
      <h2>Available Courses</h2>
      <div className="course-grid">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onSelect={setSelectedCourse}
            onPurchase={handlePurchase}
          />
        ))}
      </div>

      {selectedCourse && (
        <div className="video-modal" onClick={handleCloseVideo}>
          <div className="video-content" onClick={(e) => e.stopPropagation()}>
            <h3>{selectedCourse.title}</h3>
            <video controls autoPlay width="600">
              <source src={selectedCourse.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <button onClick={handleCloseVideo}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseList;
