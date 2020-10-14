import React, {Component} from 'react'
import background from '../Img/dark_vador.png'

class Error extends React.Component {

    render(){
        return(
            <div className="background"
            style={{ backgroundImage: `url(${background})` }}>
            </div>
        )
    }
}

export default Error;