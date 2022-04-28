const { User, Course } = require('../db');

let courses = [ 
    {
        "name": "Fullstack web developer",
        "duration": "12",
        "description": "Modalidad Full Time y Part Time. Apoyo personalizado. Invertimos en ti. 100% Online. Comunidad Henry",
        "review": "5 estrellas :3 ",
        "progress": "casito lo termino",
        "image": "url de imagen",
        "user": "b65232b0-c6a0-11ec-b926-ff69e9773727",
        "category": "frontend"
    },
    {
        "name": "sotftware developer",
        "duration": "23",
        "description": " descripcion del curso sotftware developer ",
        "review": "comentario de sotftware developer ",
        "progress": "3/5",
        "image": "url de imagen",
        "user": "b65232b0-c6a0-11ec-b926-ff69e9773728",
        "category": "backend"

    },
    {
        "name": "data science data science",
        "duration": "23",
        "description": "descripcion de del curso data science",
        "review": "comentario data science",
        "progress": "3/5",
        "image": "url de imagen",
        "user": "b65232b0-c6a0-11ec-b926-ff69e9773727",
        "category": "fullstack"
    
    }
]

const initializeCourses = async() =>{
    try {
        
        courses = courses.forEach(async c =>{
            const course = {
                name : c.name,
                duration : c.duration,
                description : c.description,
                review: c.review,
                progress: c.progress, 
                image: c.image,
            }           
            const createCourse = await Course.create(course);
            await createCourse.addUser(c.user)
            await createCourse.addCategory(c.category)
        })
        
    } catch (error) {
        console.log(error)
        
    }
}
module.exports = initializeCourses;