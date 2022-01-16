import React from 'react'
import { Notes } from './Notes'

export const Home = (props) => {
    const {showAlert_prop} = props
    return (
        <div className='container my-3'>
            <Notes showAlert_prop={showAlert_prop} />
        </div>
    )
}
