import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import type { Course } from "../types/course.ts";
import { handlePurchase } from "../api/mockApi.ts";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../store/store.ts";
import { fetchCourses, purchaseCourse } from "../store/slices/coursesSlice";
import { playVideo } from "../store/slices/videoSlice";

const COURSES_PER_PAGE = 4;

const CourseList: React.FC = () => {
    const [page, setPage] = useState(1);

    const dispatch = useDispatch<AppDispatch>();
    const { allCourses, loading, error, purchasedCourses } = useSelector(
        (state: RootState) => state.courses
    );
    const currentVideoId = useSelector(
        (state: RootState) => state.video.currentVideoId
    );

    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

    useEffect(() => {
        dispatch(fetchCourses());
    }, [dispatch]);

    const startIndex = (page - 1) * COURSES_PER_PAGE;
    const paginatedCourses = allCourses.slice(startIndex, startIndex + COURSES_PER_PAGE);
    const totalPages = Math.ceil(allCourses.length / COURSES_PER_PAGE);

    const handlePurchaseClick = async (id: string) => {
        try {
            const message = await handlePurchase(id);
            alert(message);
            dispatch(purchaseCourse(id));
        } catch (err: any) {
            alert(err);
        }
    };

    const handleCloseVideo = () => {
        setSelectedCourse(null);
        dispatch(playVideo(null));
    };

    if (loading) return <p>Loading courses...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div className="course-list">
            <h2>Available Courses</h2>
            <div className="course-grid">
                {!loading && !error && paginatedCourses.map((course) => (
                    <CourseCard
                        key={course.id}
                        course={course}
                        onSelect={(course) => {
                            setSelectedCourse(course);
                            dispatch(playVideo(course.id));
                        }}
                        onPurchase={handlePurchaseClick}
                    />
                ))}
            </div>


            {!loading && !error && (
                <div className="pagination">
                    <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>Prev</button>
                    <span>Page {page} of {totalPages}</span>
                    <button disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>Next</button>
                </div>
            )}

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
