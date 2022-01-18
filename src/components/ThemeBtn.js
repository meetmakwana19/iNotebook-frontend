import React, { useContext } from 'react'
import themeContext from '../context/theme/ThemeContext';

export default function ThemeBtn() {
    const{handleTheme} = useContext(themeContext);

    return (
        <div>
            <div className="form-check form-switch mx-2">
                <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onClick={handleTheme}/>
                    <label className="form-check-label text-dark" htmlFor="flexSwitchCheckDefault">Dark Mode</label>
            </div>
        </div>
    )
}
