import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./CarouselSuggestions.module.css";

function CarouselSuggestions( {loggedUser} ) {
    const courses = useSelector((state) => state.coursesBackUp);
    const user = useSelector((state) => state.userDetail); 

    let userCategory = user.categories.map((category) => category.name);

    let suggestedCourses = courses.filter((course) => {
        return course.categories.some((category) => {
            return userCategory.includes(category.name);
        });
    }); // filter courses by categories of user and return the courses with the same categories
    console.log(suggestedCourses, "suggestedCourses");

    const [currentSlide, setCurrentSlide] = useState(0);
    let length = null;

    if(suggestedCourses.length === 0 || loggedUser.length === 0) {
        length = courses.length;
    } else {
        length = suggestedCourses.length;
    }

    const autoScroll = true;
    let slideInterval = null;

    const nextSlide = () => {
        setCurrentSlide(currentSlide === length - 1 ? 0 : currentSlide + 1);
    }

    const prevSlide = () => {
        setCurrentSlide(currentSlide === 0 ? length - 1 : currentSlide - 1);
    }

    function auto() {
        let intervalTime = 6000;
        slideInterval = setInterval(nextSlide, intervalTime);
    }

    useEffect(() => {
        setCurrentSlide(0);
    }, [])

    useEffect(() => {
        if (autoScroll) {
            auto();
        }
        return () => { clearInterval(slideInterval) }
    }, [currentSlide])

    if(!Array.isArray(suggestedCourses)) {
        return null;
    }

    function randomCourses(courses) {
        let i = courses.length - 1;
        for (; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const temp = courses[i];
          courses[i] = courses[j];
          courses[j] = temp;
        }
        return courses;
      }
      const newCourses = randomCourses(courses);

      
      if(suggestedCourses.length <= 0 || loggedUser.length === 0) {
    return(
        <div className={styles.carouselSuggestions}>
            <div className={styles.carouselTitle} >Podria gustarte...</div>
            <div className={styles.carouselContainer}>
                <div className={styles.carouselArrows}>
                    <button onClick={() => prevSlide()} >Flecha Izquierda</button>
                </div>
                <div className={styles.carouselSlides}>
                    {newCourses.map((course, index) => {
                        return(
                            <div className={index === currentSlide ? styles.carouselSlideActive : styles.carouselSlide}
                                key={index}
                            > 

                            {index === currentSlide && (
                                <div className={styles.carouselSlideContent}>
                                    <img className={styles.carouselSlideContentImage} src={course.image} alt={course.name}/>
                                    <div className={styles.carouselSlideInfo}> 
                                        <div className={styles.carouselSlideContentTitle}>{course.name}</div>
                                        <div className={styles.carouselSlideContentRewiew}>{course.review === 0 ? (
                                        <p>Este curso no tiene calificacion</p>
                                        ) : course.review === 1 ? (
                                        <p>⭐</p>
                                        ) : course.review === 2 ? (
                                        <p>⭐⭐</p>
                                        ) : course.review === 3 ? (
                                        <p>⭐⭐⭐</p>
                                        ) : course.review === 4 ? (
                                        <p>⭐⭐⭐⭐</p>
                                        ) : (
                                        <p>⭐⭐⭐⭐⭐</p>
                                        )}</div>
                                        <div className={styles.carouselSlideContentDescription}>{course.description}</div>
                                        <div className={styles.carouselSlideContentPrice}>${course.price}</div>
                                    </div>
                                </div>
                            )}
                            </div>
                        )
                    })}              
                </div>
                <div className={styles.carouselArrows}>
                    <button onClick={() => nextSlide()}>Flecha Derecha</button>
                </div>
            </div>
                      
        </div>
    );
    } else {
        return(
            <div className={styles.carouselSuggestions}>
                <div className={styles.carouselTitle} >{user.name[0].toUpperCase() + user.name.slice(1, user.name.length)}, cursos que podrian gustarte...</div>
                <div className={styles.carouselContainer}>
                    <div className={styles.carouselArrows}>
                        <button onClick={() => prevSlide()} >Flecha Izquierda</button>
                    </div>
                    <div className={styles.carouselSlides}>
                        {suggestedCourses.map((course, index) => {
                            return(
                                <div className={index === currentSlide ? styles.carouselSlideActive : styles.carouselSlide}
                                    key={index}
                                > 
    
                                {index === currentSlide && (
                                    <div className={styles.carouselSlideContent}>
                                        <img className={styles.carouselSlideContentImage} src={course.image} alt={course.name}/>
                                        <div className={styles.carouselSlideInfo}> 
                                            <div className={styles.carouselSlideContentTitle}>{course.name}</div>
                                            <div className={styles.carouselSlideContentRewiew}>{course.review === 0 ? (
                                            <p>Este curso no tiene calificacion</p>
                                            ) : course.review === 1 ? (
                                            <p>⭐</p>
                                            ) : course.review === 2 ? (
                                            <p>⭐⭐</p>
                                            ) : course.review === 3 ? (
                                            <p>⭐⭐⭐</p>
                                            ) : course.review === 4 ? (
                                            <p>⭐⭐⭐⭐</p>
                                            ) : (
                                            <p>⭐⭐⭐⭐⭐</p>
                                            )}</div>
                                            <div className={styles.carouselSlideContentDescription}>{course.description}</div>
                                            <div className={styles.carouselSlideContentPrice}>${course.price}</div>
                                        </div>
                                    </div>
                                )}
                                </div>
                            )
                        })}              
                    </div>
                    <div className={styles.carouselArrows}>
                        <button onClick={() => nextSlide()}>Flecha Derecha</button>
                    </div>
                </div>
                          
            </div>
        );
    }
}

export default CarouselSuggestions;