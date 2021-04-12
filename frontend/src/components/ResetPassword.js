import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory} from "react-router-dom";
import { store } from 'react-notifications-component';
import axios from 'axios'


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: 'rgb(80, 77, 193)'
  },
}));

export default function ResetPassword() {
  let history = useHistory();
  const classes = useStyles();
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const token = localStorage.getItem('token')




  const onClick = async () =>{
    await axios.patch('http://localhost:5000/seller/resetPassword',{
        password : password,
        newPassword : newPassword
    },{
    headers : {
        'auth-token' : token
    }}).then(response => {
        store.addNotification({
            title: "Success !",
            message: "Password Reseted successfully",
            type: "success",
            insert: "top",
            container: "bottom-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 5000,
                onScreen: true
            }
            });
            history.push('/Home')
    }).catch(err =>{
        store.addNotification({
            title: "Error !",
            message: err.response.data,
            type: "danger",
            insert: "top",
            container: "bottom-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 5000,
                onScreen: true
            }
            });
    })
}



  return (
    <div className="main">

    <Container component="main" maxWidth="xs" style={{marginBottom : '100px'}}>
      <CssBaseline />
      <div className={classes.paper}>
      <div className="form-section mt-5">

       
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            autoComplete="password"
            type="password"
            autoFocus
            onChange={(event)=>{setPassword(event.target.value)}}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="newPassword"
            label="New Password"
            type="password"
            id="newPassword"
            autoComplete="current-password"
            onChange={(event)=>{setNewPassword(event.target.value)}}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onClick}
          >
            Reset Password 
          </Button>
        </form>
      </div>
      </div>
    </Container>
    </div>

  );
}