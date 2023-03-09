import axios from 'axios'
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../../Contexts/Auth.context.jsx'
import * as s from './styles.jsx'
import chessTable from './../../Assets/chess-gif.gif'
import { Button, TextField } from '@mui/material'

export function SignINComponent() {
	const { url } = useContext(AuthContext)
	const navigate = useNavigate()
	const [infosInput, setInfosInput] = useState({
		email:'',
		password: '',
	})
	function loginAccount() {
		console.log(url)
		axios({
			method: 'post',
			url: `${url}/signin`,
			data: infosInput,
		})
			.then((response) => {
				console.log(response)
				localStorage.setItem('token', response.data)
				navigate('/')
			})
			.catch((error) => {
				alert(error.response.data)
				console.log(error)
			})
	}
	return (
		<>
		<s.signinContainer>
			<div
			 className="top"
			>

			<h1>Queen's Gambit</h1>
			<div className='input'>

			<TextField  id="outlined-basic" label="Email" variant="outlined" value ={infosInput.email} onChange={(e)=>{setInfosInput({...infosInput,email:e.target.value})}}/>
			</div>
			<div className='input'>

			<TextField  id="outlined-basic" label="Password" type='password' variant="outlined" value ={infosInput.password} onChange={(e)=>{setInfosInput({...infosInput,password:e.target.value})}}/>
			</div>
			<Button variant="outlined" onClick={loginAccount}>login</Button>
			
					<Link to={'/sign-up'}  underline="none">
						<h2>Create a new account now!</h2>
					</Link>
			
			</div>
			<div className='bottom'>

			<img className='chessTable' src={chessTable} alt="chessTable" />
			</div>
		</s.signinContainer>
		
		</>
		
	)
}
