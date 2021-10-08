import React, { useEffect } from 'react'
import axios from 'axios'

export const Pagination = () => {

    useEffect(() => {
        axios.get('http://localhost:3000/api/pages').then((res)=>{
            console.log("Pagination>>>>>> ",res.data)
        })
    }, [])

    return (
        <div>
            
        </div>
    )
}

export default Pagination;