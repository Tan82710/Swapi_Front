import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import background from '../Img/bgLogin.jpg'
import jedi from '../Img/jedi.png'
import sith from '../Img/sith.png'
import './component.css'
import axios from 'axios'
import Auth from './auth'

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    paper: {
        minWidth: 400,
        width: '40%',
        margin: 'auto',
        marginTop: 100,
        padding: 10,
        opacity: 0.9,
        textAlign: "center",

    }
}));

export default function LoginSwapi() {
    const classes = useStyles();
    const history = useHistory();

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [status, setStatus] = useState("")
    const [isAuth, setIsAuth] = useState(false)

    //Récupération du status
    const log = () => {
        axios({
            method: "POST",
            data: {
                username: username,
                password: password,
            },
            withCredentials: false,
            url: "http://localhost:4200/login"
        })
            .then((res) => setStatus(res.status))
    };

    async function checkStatus() {
        console.log(status)
        if (status == 200) {
            Auth.authenticate()
            setIsAuth(true)
        }
    }

    //Vérification du status et redirection après connexion
    useEffect(() => {

        checkStatus()
        if (isAuth) {
            return history.push('/peoples')
        }
    })


    return (
        <div className="background"
            style={{ backgroundImage: `url(${background})` }}>
            <Paper className={classes.paper}>
                <img src={jedi} style={{ position: "fixed", width: 100, height: 100, left: '510px', top: '150px' }} />
                <img src={sith} style={{ position: "fixed", width: 100, height: 100, right: '510px', top: '150px' }} />
                <form className={classes.root}>
                    <TextField label="username" type="search" variant="outlined"
                        onChange={e => setUsername(e.target.value)} />
                    <br />
                    <TextField
                        id="outlined-password-input"
                        label="password"
                        type="password"
                        autoComplete="current-password"
                        variant="outlined"
                        onChange={e => setPassword(e.target.value)}
                    />
                    <div style={{ height: 20 }} />
                    <Button color='primary' variant="contained" onClick={log}>Log In with The Force</Button>
                </form>
            </Paper>
        </div>
    )
}