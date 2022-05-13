import React from 'react'
import styles from './adminSalesPage.module.css'
import NavBar from "../NavBar/NavBar"
import Footer from './../Footer/Footer';
import { useEffect, useState } from 'react';
import { useDispatch , useSelector} from 'react-redux';
import { getAllReviews, deleteReview, filterByReported, 
    allUser, searchReviewById, allCourses, 
    getAllPurchases, filterPurchasesByCourse} from '../../redux/actions';

export default function AdminSalesPage(){
const dispatch = useDispatch()
const allPurchases = useSelector(state => state.purchases)
const allUsers = useSelector(state => state.reviews)
const allIds = allUsers.filter(e => e.id)
const courses = useSelector(state => state.courses)
console.log(allPurchases, 'esto es all purchases')


    useEffect(() => dispatch(allUser()), [dispatch])
    useEffect(() => dispatch(allCourses()), [dispatch])
    useEffect(() => dispatch( getAllPurchases()), [dispatch])
    const [input, setInput] = useState("")

    function handleDelete(e){
        e.preventDefault(e);
        if (window.confirm("¿Desea eliminar este comentario?") === true) {
            dispatch(deleteReview(e.target.name));
            alert("Comentario eliminado.");
            dispatch(getAllReviews());
       
          } else {
            alert("Cancelado.")
          }
    }

    function handleFilterReported(e){
        e.preventDefault(e);
        dispatch(filterByReported(e.target.value));
    }
    function handleSearch(e){
        e.preventDefault(e);
        dispatch(searchReviewById(input))
    }

    function handleInputChange(e){
        setInput(e.target.value)
    }

    function handleFilterCourse(e){
        e.preventDefault(e);
        dispatch(filterPurchasesByCourse(e.target.value));
    }

    return(
    <div>
        <NavBar/>
        <div className={styles.container}>
        <div className={styles.title}>
             <h2>Administrar Ventas</h2>
        </div>
        <div className={styles.body}>
         <div className={styles.top}>
         <h3>Filtrar por: </h3>
            <select onChange={handleFilterCourse}>
            <option value="all">Curso</option>
            {courses && courses.map(e => {
                return(
                    <option value={e.name}>{e.name}</option>
                )
            })}
                
            </select>

            <select onChange={handleFilterReported}>
                <option value="all">Todas</option>
                <option value="payed">Pagadas</option>
                <option value="notPayed">Sin pagar</option>
            </select>

            {/* <select>
                <option>ID Usuario</option>
            </select> */}
            <h3>Buscar por ID Instructor </h3>
            <input onChange={handleInputChange} value={input} />
            <button className={styles.buscar} onClick={handleSearch}>Buscar</button>
         </div>
         <div className={styles.bottom}>

         <table className={styles.table} border="1" >
        <tbody>
            <tr>
            <th width='20%'>Nombre del Curso</th>
            <th width='15%'>ID Instructor</th>
            <th width='15%'>CBU Instructor</th>
            <th width='10%'>Precio del Curso</th>
            <th width='10%'>Ganancia Admin</th>
            <th width='10%'>Ganancia Instructor</th>
            <th width='10%'>Pagado al Instructor</th>
            <th width='10%'>Acción</th>
            </tr>
         { allPurchases && allPurchases.map( e => {
             return (
                <tr>
                <td width='20%'>{e.courseName}</td>
                <td width='15%'></td>
                <td width='15%'></td>
                <td width='10%'>$ {e.total_price}</td>
                <td width='10%'>$ {e.total_price/5}</td>
                <td width='10%'>$ {e.total_price/5*4}</td>
                <td width='10%'></td>
                <td width='10%'><button>Marcar como Pagado</button></td>
                </tr>
             )
         })}
            
     
        </tbody>
        </table>
         </div>
        </div>
        </div>
        <Footer/>
        </div>
        
       
    )
}