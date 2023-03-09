import axios from 'axios'
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../../Contexts/Auth.context.jsx'
import * as s from './styles.jsx'
import chessTable from './../../Assets/chess-gif.gif'
import { Button, TextField } from '@mui/material'
import { toast } from "react-toastify"
export function SignUPComponent() {
	const { url } = useContext(AuthContext)
	const navigate = useNavigate()
	const [infosInput, setInfosInput] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	})
	async function loginAccount() {
		console.log(infosInput)

		console.log(url)
		axios({
			method: 'post',
			url: `${url}/signup`,
			data: infosInput,
		})
			.then((response) => {
				console.log(response)
				navigate('/sign-in')
			})
			.catch((error) => {
				if(error.response.data[0].split(" ")[0].replace(/"|'/g, '')==='password'){
					alert("Password need to have numbers.")
				
				}
				else{
					alert(error.response.data)

				}
				console.log(error.response.data[0].split(" ")[0].replace(/"|'/g, ''))
			})
	}
    
	return (
		<>
		<s.signupContainer>
			<div
			 className="top"
			>

			<h1>Queen's Gambit</h1>
			<div className='input'>

			<TextField  id="outlined-basic" label="Username" variant="outlined" value={infosInput.username}
						onChange={(e) => {
							setInfosInput({
								...infosInput,
								username: e.target.value,
							})
						}}/>
			</div>
			<div className='input'>

			<TextField  id="outlined-basic" label="Email"  variant="outlined" value={infosInput.email}
						onChange={(e) => {
							setInfosInput({
								...infosInput,
								email: e.target.value,
							})
						}}/>
			</div>
			<div className='input'>

			<TextField  id="outlined-basic" label="Password" type='password'  variant="outlined" value={infosInput.password} 	onChange={(e) => {
							setInfosInput({
								...infosInput,
								password: e.target.value,
							})
						}}
						
						/>
			</div>
			<div className='input'>

			<TextField  id="outlined-basic" label="Confirm Password" type='password'  variant="outlined" 	value={infosInput.confirmPassword}
						onChange={(e) => {
							setInfosInput({
								...infosInput,
								confirmPassword: e.target.value,
							})
						}}
						
						/>
			</div>
			<Button variant="outlined" onClick={loginAccount}>create account</Button>
			
					<Link to={'/sign-in'}  underline="none">
						<h2>Already have an account? Sign in!</h2>
					</Link>
			
			</div>
			<div className='bottom'>

			<img className='chessTable' src={chessTable} alt="chessTable" />
			</div>
		</s.signupContainer>
		
		</>
		
	)
}
