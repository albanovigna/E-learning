import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import NavBarCopy from "../NavBar copy/NavBarcopy";
import Footer from "../Footer/Footer";
import { allCategories, allCourses } from "../../redux/actions";
import CoursesContainer from "../CoursesContainer/CoursesContainer";
import Pagination from "../Pagination/Pagination";
import styles from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "../Carousel/Carousel";
import CarouselSuggestions from "../CarouselSuggestions/CarouselSuggestions";
import { useMediaQuery } from "react-responsive";

export default function Home() {
  const dispatch = useDispatch();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 767px)" });
  useEffect(() => {
    dispatch(allCourses());
    dispatch(allCategories());
  }, [dispatch]);

  const [orderReview, setOrderReview] = useState("");

  const courses = useSelector((state) => state.courses);
  const coursePassed = courses.filter((curs) => curs.state == "passed");
  const loggedUser = useSelector((state) => state.loggedUsers);
  const [currentPage, setCurrentPage] = useState(1);

  const [coursesPerPage] = useState(6);
  const lastCourseIndex = currentPage * coursesPerPage;
  const firstCourseIndex = lastCourseIndex - coursesPerPage;
  const currentCourses = coursePassed.slice(firstCourseIndex, lastCourseIndex);

  return (
    <div className={styles.home}>
      <NavBar />
      {isTabletOrMobile ? (
        <div>
          <Carousel />

          <br />
          <NavBarCopy
            setOrderReview={setOrderReview}
            setCurrentPage={setCurrentPage}
          />
        </div>
      ) : (
        <div>
          <NavBarCopy
            setOrderReview={setOrderReview}
            setCurrentPage={setCurrentPage}
          />

          <br />
          <Carousel />
        </div>
      )}
      {/* // <NavBarCopy
      //   setOrderReview={setOrderReview}
      //   setCurrentPage={setCurrentPage}
      // />

      // <br />
      // <Carousel /> */}

      <CoursesContainer currentCourses={currentCourses} />
      <Pagination
        currentPage={currentPage}
        coursesPerPage={coursesPerPage}
        lastCourseIndex={lastCourseIndex}
        allCourses={coursePassed}
        setCurrentPage={setCurrentPage}
      />
      <br />
      <br />

      {loggedUser.length > 0 ? (
        <CarouselSuggestions loggedUser={loggedUser} />
      ) : (
        <CarouselSuggestions loggedUser={loggedUser} />
      )}

      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
}
