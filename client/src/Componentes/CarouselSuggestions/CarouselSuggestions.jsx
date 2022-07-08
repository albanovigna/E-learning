import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./CarouselSuggestions.module.css";
import { useMediaQuery } from "react-responsive";

function CarouselSuggestions({ loggedUser }) {
  const courses = useSelector((state) => state.coursesBackUp);
  const user = useSelector((state) => state.userDetail);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 768px)" });
  let userCategory = null;
  let suggestedCourses = null;
  if (user.categories) {
    userCategory =
      user.categories && user.categories.map((category) => category.name);
    suggestedCourses = courses.filter((course) => {
      return course.categories.some((category) => {
        return userCategory.includes(category.name);
      });
    }); // filter courses by categories of user and return the courses with the same categories
  }

  const [currentSlide, setCurrentSlide] = useState(0);
  let length = null;

  if (
    !suggestedCourses ||
    suggestedCourses.length === 0 ||
    loggedUser.length === 0
  ) {
    length = courses.length;
  } else {
    length = suggestedCourses.length;
  }

  const autoScroll = true;
  let slideInterval = null;

  const nextSlide = () => {
    setCurrentSlide(currentSlide === length - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? length - 1 : currentSlide - 1);
  };

  function auto() {
    let intervalTime = 6000;
    slideInterval = setInterval(nextSlide, intervalTime);
  }

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    if (autoScroll) {
      auto();
    }
    return () => {
      clearInterval(slideInterval);
    };
  }, [currentSlide]);

  if (!Array.isArray(suggestedCourses)) {
    return null;
  }

  const coursesToRandom = courses.map((courses) => courses);

  function randomCourses(coursesToRandom) {
    let i = coursesToRandom.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = coursesToRandom[i];
      coursesToRandom[i] = coursesToRandom[j];
      coursesToRandom[j] = temp;
    }
    return coursesToRandom;
  }
  const newCourses = randomCourses(coursesToRandom);

  // const newCourses = courses

  if (suggestedCourses.length <= 0 || loggedUser.length === 0) {
    return (
      <div className={styles.carouselSuggestions}>
        <div className={styles.carouselTitle}>Podria gustarte...</div>
        <div className={styles.carouselContainer}>
          <div className={styles.carouselArrows}>
            <button className={styles.button1} onClick={() => prevSlide()}>
              {" "}
              &#9664;
            </button>
          </div>

          <div className={styles.carouselSlides}>
            {newCourses.map((course, index) => {
              return (
                <div
                  className={
                    index === currentSlide
                      ? styles.carouselSlideActive
                      : styles.carouselSlide
                  }
                  key={index}
                >
                  {index === currentSlide && (
                    <div className={styles.carouselSlideContent}>
                      <img
                        className={styles.carouselSlideContentImage}
                        src={course.image}
                        alt={course.name}
                      />
                      <div className={styles.carouselSlideInfo}>
                        <h1 className={styles.carouselSlideContentTitle}>
                          {course.name}
                        </h1>
                        <div className={styles.carouselSlideContentRewiew}>
                          {course.review === 0 ? (
                            <p>Este curso no tiene calificacion</p>
                          ) : course.review === 1 ? (
                            <p>Valoracion : ⭐</p>
                          ) : course.review === 2 ? (
                            <p>Valoracion : ⭐⭐</p>
                          ) : course.review === 3 ? (
                            <p>Valoracion : ⭐⭐⭐</p>
                          ) : course.review === 4 ? (
                            <p>Valoracion : ⭐⭐⭐⭐</p>
                          ) : (
                            <p>Valoracion : ⭐⭐⭐⭐⭐</p>
                          )}
                        </div>
                        <div className={styles.carouselSlideContentDescription}>
                          {course.description}
                        </div>
                        <h4 className={styles.carouselSlideContentPrice}>
                          {" "}
                          Precio : ${course.price}
                        </h4>
                        <Link to={`/courses/id/${course.id}`}>
                          <button>Ver curso</button>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {/* {isTabletOrMobile && (
            <div className={styles.divButtons}>
              <div className={styles.carouselArrows}>
                <button className={styles.button2} onClick={() => prevSlide()}>
                  {" "}
                  &#9664;
                </button>
              </div>
              <div className={styles.carouselArrows}>
                <button className={styles.button2} onClick={() => nextSlide()}>
                  &#9654;
                </button>
              </div>
            </div>
          )} */}
          <div className={styles.carouselArrows}>
            <button className={styles.button1} onClick={() => nextSlide()}>
              &#9654;
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.carouselSuggestions}>
        <div className={styles.carouselTitle}>
          {user.name[0].toUpperCase() + user.name.slice(1, user.name.length)},
          cursos que podrian gustarte...
        </div>
        <div className={styles.carouselContainer}>
          <div className={styles.carouselArrows}>
            <button className={styles.button1} onClick={() => prevSlide()}>
              &#9664;
            </button>
          </div>
          <div className={styles.carouselSlides}>
            {suggestedCourses.map((course, index) => {
              return (
                <div
                  className={
                    index === currentSlide
                      ? styles.carouselSlideActive
                      : styles.carouselSlide
                  }
                  key={index}
                >
                  {index === currentSlide && (
                    <div className={styles.carouselSlideContent}>
                      <img
                        className={styles.carouselSlideContentImage}
                        src={course.image}
                        alt={course.name}
                      />
                      <div className={styles.carouselSlideInfo}>
                        <h1 className={styles.carouselSlideContentTitle}>
                          {course.name}
                        </h1>
                        <div className={styles.carouselSlideContentRewiew}>
                          {course.review === 0 ? (
                            <p>Este curso no tiene calificacion</p>
                          ) : course.review === 1 ? (
                            <p>Valoracion : ⭐</p>
                          ) : course.review === 2 ? (
                            <p>Valoracion :⭐⭐</p>
                          ) : course.review === 3 ? (
                            <p>Valoracion :⭐⭐⭐</p>
                          ) : course.review === 4 ? (
                            <p>Valoracion :⭐⭐⭐⭐</p>
                          ) : (
                            <p>Valoracion :⭐⭐⭐⭐⭐</p>
                          )}
                        </div>
                        <div className={styles.carouselSlideContentDescription}>
                          {course.description}
                        </div>
                        <h4 className={styles.carouselSlideContentPrice}>
                          {" "}
                          Precio : ${course.price}
                        </h4>
                        <Link
                          className={styles.linkBtn}
                          to={`/courses/id/${course.id}`}
                        >
                          <button className={styles.carouselSlideContentButton}>
                            Ver curso
                          </button>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            {isTabletOrMobile && (
              <div className={styles.divButtons}>
                <div className={styles.carouselArrows}>
                  <button
                    className={styles.button2}
                    onClick={() => prevSlide()}
                  >
                    {" "}
                    &#9664;
                  </button>
                </div>
                <div className={styles.carouselArrows}>
                  <button
                    className={styles.button2}
                    onClick={() => nextSlide()}
                  >
                    &#9654;
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className={styles.carouselArrows}>
            <button className={styles.button1} onClick={() => nextSlide()}>
              &#9654;
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CarouselSuggestions;
