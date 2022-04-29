const { Buy } = require('../db');

let buys = [ 
    {
        "id": "394606a0-c77e-11ec-8c73-834ec4650dd3",
        "discount": 2,
        "pay_method": "efectivo",
        "userId": "b65232b0-c6a0-11ec-b926-ff69e9773726",
        "courseId": "760c7440-c70e-11ec-96f7-e913400288b4"
    },
    {
        "id": "394606a0-c77e-11ec-8c73-834ec4650dd4",
        "discount": 2,
        "pay_method": "efectivo",
        "userId": "b65232b0-c6a0-11ec-b926-ff69e9773726",
        "courseId": "760c7440-c70e-11ec-96f7-e913400288b5"
    },
    {
        "id": "394606a0-c77e-11ec-8c73-834ec4650dd5",
        "discount": 2,
        "pay_method": "efectivo",
        "userId": "b65232b0-c6a0-11ec-b926-ff69e9773726",
        "courseId": "760c7440-c70e-11ec-96f7-e913400288b6"
    }
]

const initializeBuys = async() =>{
    try {
        
        buys = buys.forEach(async b =>{
            const buy = {
                id: b.id,
                discount : b.discount,
                pay_method : b.pay_method,
            }           
            const createBuy = await Buy.create(buy);
            await createBuy.setUser(b.userId)
            await createBuy.setCourse(b.courseId)
        })
        
    } catch (error) {
        console.log(error)
        
    }
}
module.exports = initializeBuys;