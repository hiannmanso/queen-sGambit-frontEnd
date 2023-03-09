import { useContext, useEffect, useState } from 'react'
import AuthContext from '../../Contexts/Auth.context.jsx'
import * as s from './styles.jsx'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
export function NewGameTable() {
	const { url, setTokengame } = useContext(AuthContext)
	const [invites, setInvites] = useState()
	const token = localStorage.getItem('token')
	const { tokenGAME } = useParams()
	const [table, setTable] = useState([])
	const [whitePlaying, setWhitePlaying] = useState(true)
	const tableIndex = []
	const [boolMove, setBoolMove] = useState(true)
	let initialPositions = {
		a8: 'rook-black',
		b8: 'knight-black',
		c8: 'bishop-black',
		d8: 'queen-black',
		e8: 'king-black',
		f8: 'bishop-black',
		g8: 'knight-black',
		h8: 'rook-black',

		a7: 'pawn-black',
		b7: 'pawn-black',
		c7: 'pawn-black',
		d7: 'pawn-black',
		e7: 'pawn-black',
		f7: 'pawn-black',
		g7: 'pawn-black',
		h7: 'pawn-black',

		a2: 'pawn-white',
		b2: 'pawn-white',
		c2: 'pawn-white',
		d2: 'pawn-white',
		e2: 'pawn-white',
		f2: 'pawn-white',
		g2: 'pawn-white',
		h2: 'pawn-white',

		a1: 'rook-white',
		b1: 'knight-white',
		c1: 'bishop-white',
		d1: 'queen-white',
		e1: 'king-white',
		f1: 'bishop-white',
		g1: 'knight-white',
		h1: 'rook-white',
	}
	let cont = 0
	let linePar = true

	let infoClicks = ['', '']
	let isFirstClick = true
	const navigate = useNavigate()
	const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

	setInterval(() => {
		table.map((item) => {
			if (item.contains === 'king') {
			}
		})
	})
	useEffect(() => {
		axios({
			method: 'get',
			url: `${url}/game/${tokenGAME}`,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => {
				console.log('game loaded!')
				console.log(response)
				setTokengame(tokenGAME)
				setTable(response.data.table)
			})
			.catch((error) => {
				console.log(error)
			})
	}, [])
	// useEffect(() => {
	// 	let contador = 0
	// 	for (let line = 8; line >= 1; --line) {
	// 		for (let column = 0; column < columns.length; ++column) {
	// 			const sq = columns[column] + line

	// 			if (initialPositions[sq]) {
	// 				setTable([
	// 					...table,
	// 					table.push({
	// 						position: sq,
	// 						contains: initialPositions[sq].split('-')[0],
	// 						line,
	// 						column: columns[column],
	// 						indexOfColumn: columns.indexOf(columns[column]),
	// 						index: contador,
	// 						color: initialPositions[sq].split('-')[1],
	// 					}),
	// 				])
	// 			} else {
	// 				setTable([
	// 					...table,
	// 					table.push({
	// 						position: sq,
	// 						contains: '',
	// 						line,
	// 						column: columns[column],
	// 						indexOfColumn: columns.indexOf(columns[column]),
	// 						index: contador,
	// 					}),
	// 				])
	// 			}
	// 			contador++
	// 			tableIndex.push(sq)
	// 		}
	// 	}

	// 	console.log(table)
	// }, [])
	useEffect(() => {
		setTable([...table, (table[63] = {})])
	}, [])

	useEffect(() => {
		axios({
			method: 'get',
			url: `${url}/invites`,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => {
				console.log('inviites', response)
				for (const item of response.data) {
					if (item.token !== 'undefined') {
						console.log('TOKENNN', item)
						const tokenGame = item.token
						axios({
							method: 'delete',
							url: `${url}/convites`,
							headers: {
								Authorization: `Bearer ${token}`,
							},
							data: { conviteId: item.id },
						})
							.then((response) => {
								console.log('delete!', response.data)
								if (tokenGame) {
									navigate(`/game/${tokenGame}`)
								}
							})
							.catch((error) => {
								console.log(error)
							})
					}
				}
				setInvites(response.data)
			})
			.catch((error) => {
				console.log('erro nos invites,', error)
			})
	}, [])
	function postMoveOnDB(piece, sqToGo) {
		axios({
			method: 'put',
			url: `${url}/game/${tokenGAME}`,
			data: { piece, sqToGo },
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => {
				console.log('moveu')
				setBoolMove(!boolMove)
				if (response.data.whitePlayer) {
					setWhitePlaying(true)
				}
				console.log(response)
			})
			.catch((error) => {
				console.log(error)
			})
	}
	function movePiece(item) {
		if (!isFirstClick && infoClicks[0].position !== item.position) {
			infoClicks[1] = item
			if (
				(infoClicks[0].contains === 'king' &&
					infoClicks[1].contains === 'rook' &&
					infoClicks[0].position === 'e1' &&
					(infoClicks[1].position === 'a1' ||
						infoClicks[1].position === 'h1') &&
					infoClicks[0].color === 'white' &&
					infoClicks[1].color === 'white') ||
				(infoClicks[0].contains === 'king' &&
					infoClicks[1].contains === 'rook' &&
					infoClicks[0].position === 'e8' &&
					(infoClicks[1].position === 'a8' ||
						infoClicks[1].position === 'h8') &&
					infoClicks[0].color === 'black' &&
					infoClicks[1].color === 'black')
			) {
				makeARook(infoClicks[0], infoClicks[1])
			}
			if (infoClicks[0].contains === 'pawn') {
				pawnMove(infoClicks[0], infoClicks[1])
			}
			if (infoClicks[0].contains === 'bishop') {
				bishopMove(infoClicks[0], infoClicks[1])
			}
			if (infoClicks[0].contains === 'rook') {
				rookMove(infoClicks[0], infoClicks[1])
			}
			if (infoClicks[0].contains === 'knight') {
				knightMove(infoClicks[0], infoClicks[1])
			}
			if (infoClicks[0].contains === 'queen') {
				const distline = Number(infoClicks[1].line - infoClicks[0].line)
				const distColumn = Number(
					infoClicks[1].indexOfColumn - infoClicks[0].indexOfColumn
				)
				const xdistColumn = Number(
					infoClicks[0].indexOfColumn - infoClicks[1].indexOfColumn
				)
				if (
					infoClicks[0].line === infoClicks[0].line ||
					infoClicks[0].indexOfColumn === infoClicks[1].indexOfColumn
				) {
					rookMove(infoClicks[0], infoClicks[1])
				}
				if (distline > 1 || distColumn > 1 || xdistColumn > 1) {
					bishopMove(infoClicks[0], infoClicks[1])
				}
				if (
					Math.pow(infoClicks[0].line - infoClicks[1].line, 2) ===
						1 ||
					Math.pow(
						infoClicks[0].indexOfColumn -
							infoClicks[1].indexOfColumn,
						2
					) === 1
				) {
					bishopMove(infoClicks[0], infoClicks[1])
				}
			}
			if (infoClicks[0].contains === 'king') {
				kingMove(infoClicks[0], infoClicks[1])
			}
			makeANewMove()
		}
		if (whitePlaying && item.color === 'white') {
			if (isFirstClick && item.contains) {
				infoClicks[0] = item
				isFirstClick = false
			}
		}
		if (!whitePlaying && item.color === 'black') {
			if (isFirstClick && item.contains) {
				infoClicks[0] = item
				isFirstClick = false
			}
		}
	}

	function makeANewMove() {
		infoClicks[0] = ''
		infoClicks[1] = ''
		isFirstClick = true
	}
	function movingPiece(piece, goToSQ) {
		const indexPiece = piece.index
		const indexPieceGO = goToSQ.index
		if (goToSQ.contains === 'king') {
			alert('Game finished!')
		}
		setTable([
			...table,
			(((table[indexPieceGO].contains = piece.contains),
			(table[indexPieceGO].color = piece.color)),
			(table[indexPiece].contains = ''),
			(table[indexPiece].color = '')),
		])
		setWhitePlaying(!whitePlaying)
		console.log(table)
		// postMoveOnDB(piece, goToSQ)
		makeANewMove()
	}
	function validateIFhaveAnotherPieceOnTheWay(piece, goToSq) {
		if (piece.contains === 'pawn') {
			if (piece.color === 'white') {
				if (goToSq.line - piece.line > 1) {
					const positionBeteween =
						piece.column + String(piece.line + 1)

					for (const item of table) {
						if (item.position == positionBeteween) {
							if (item.contains !== '') {
								return true
							}
						}
					}
				}
			}
			if (piece.color === 'black') {
				if (piece.line - goToSq.line > 1) {
					const positionBeteween =
						piece.column + String(piece.line - 1)

					for (const item of table) {
						if (item.position == positionBeteween) {
							if (item.contains !== '') {
								return true
							}
						}
					}
				}
			}
		}
		if (piece.contains === 'bishop' || piece.contains === 'queen') {
			let sqs = []

			if (
				piece.line < goToSq.line &&
				piece.indexOfColumn > goToSq.indexOfColumn
			) {
				for (
					let index = 1;
					index <= goToSq.line - piece.line - 1;
					index++
				) {
					const sq =
						String(columns[piece.indexOfColumn - index]) +
						String(piece.line + index)
					sqs.push(sq)
					console.log(sqs)
				}
			}
			if (
				piece.line < goToSq.line &&
				piece.indexOfColumn < goToSq.indexOfColumn
			) {
				for (
					let index = 1;
					index <= goToSq.line - piece.line - 1;
					index++
				) {
					const sq =
						String(columns[piece.indexOfColumn + index]) +
						String(piece.line + index)
					sqs.push(sq)

					console.log(sqs)
				}
			}
			if (
				piece.line > goToSq.line &&
				piece.indexOfColumn < goToSq.indexOfColumn
			) {
				for (
					let index = 1;
					index <= piece.line - goToSq.line - 1;
					index++
				) {
					const sq =
						String(columns[piece.indexOfColumn + index]) +
						String(piece.line - index)
					sqs.push(sq)

					console.log(sqs)
				}
			}
			if (
				piece.line > goToSq.line &&
				piece.indexOfColumn > goToSq.indexOfColumn
			) {
				for (
					let index = 1;
					index <= piece.line - goToSq.line - 1;
					index++
				) {
					const sq =
						String(columns[piece.indexOfColumn - index]) +
						String(piece.line - index)
					sqs.push(sq)

					console.log(sqs)
				}
			}
			for (const item of table) {
				for (const sq of sqs) {
					if (item.position == sq) {
						if (item.contains !== '') {
							return true
						}
					}
				}
			}
		}
		if (piece.contains === 'rook' || piece.contains === 'queen') {
			if (
				piece.line === goToSq.line &&
				goToSq.indexOfColumn > piece.indexOfColumn
			) {
				let sqs = []
				const dist = goToSq.indexOfColumn - piece.indexOfColumn
				console.log(dist)
				for (let index = 1; index <= dist - 1; index++) {
					const sq =
						String(columns[piece.indexOfColumn + index]) +
						String(piece.line)
					sqs.push(sq)
				}

				for (const item of table) {
					for (const sq of sqs) {
						if (item.position === sq) {
							if (item.contains !== '') {
								return true
							}
						}
					}
				}
				console.log(sqs)
			}
			if (
				piece.line === goToSq.line &&
				goToSq.indexOfColumn < piece.indexOfColumn
			) {
				let sqs = []
				const dist = piece.indexOfColumn - goToSq.indexOfColumn
				console.log(dist)
				for (let index = 1; index <= dist - 1; index++) {
					const sq =
						String(columns[piece.indexOfColumn - index]) +
						String(piece.line)
					sqs.push(sq)
				}
				for (const item of table) {
					for (const sq of sqs) {
						if (item.position === sq) {
							if (item.contains !== '') {
								return true
							}
						}
					}
				}
				console.log(sqs)
			}
			if (
				piece.indexOfColumn === goToSq.indexOfColumn &&
				goToSq.line > piece.line
			) {
				let sqs = []
				const dist = goToSq.line - piece.line
				console.log(dist)
				for (let index = 1; index <= dist - 1; index++) {
					const sq =
						String(columns[piece.indexOfColumn]) +
						String(piece.line + index)
					sqs.push(sq)
				}
				for (const item of table) {
					for (const sq of sqs) {
						if (item.position === sq) {
							if (item.contains !== '') {
								return true
							}
						}
					}
				}
				console.log(sqs)
			}
			if (
				piece.indexOfColumn === goToSq.indexOfColumn &&
				goToSq.line < piece.line
			) {
				let sqs = []
				const dist = piece.line - goToSq.line
				console.log(dist)
				for (let index = 1; index <= dist - 1; index++) {
					const sq =
						String(columns[piece.indexOfColumn]) +
						String(piece.line - index)
					sqs.push(sq)
				}
				for (const item of table) {
					for (const sq of sqs) {
						if (item.position === sq) {
							if (item.contains !== '') {
								return true
							}
						}
					}
				}
				console.log(sqs)
			}
		}
	}

	function validateIsFirstMoveOfPawn(piece, goToSQ) {
		if (piece.color === 'white') {
			if (
				((goToSQ.line === piece.line + 2 &&
					goToSQ.column === piece.column) ||
					(goToSQ.line === piece.line + 1 &&
						goToSQ.column === piece.column)) &&
				goToSQ.contains == ''
			) {
				return true
			}
		}
		if (piece.color === 'black') {
			if (
				((goToSQ.line === piece.line - 2 &&
					goToSQ.column === piece.column) ||
					(goToSQ.line === piece.line - 1 &&
						goToSQ.column === piece.column)) &&
				goToSQ.contains == ''
			) {
				return true
			}
		}
	}
	function validateMovePawn(piece, goToSQ) {
		if (piece.color === 'white') {
			if (
				goToSQ.line === piece.line + 1 &&
				goToSQ.column === piece.column &&
				piece.line !== 2 &&
				piece.line !== 2 &&
				goToSQ.contains == ''
			) {
				return true
			}
		}
		if (piece.color === 'black') {
			if (
				goToSQ.line === piece.line - 1 &&
				goToSQ.column === piece.column &&
				piece.line !== 7 &&
				piece.line !== 7 &&
				goToSQ.contains == ''
			) {
				return true
			}
		}
	}
	function validateEatPawn(piece, goToSQ) {
		if (piece.color === goToSQ.color) {
			makeANewMove()
		} else {
			if (piece.color === 'white') {
				if (
					((piece.indexOfColumn === goToSQ.indexOfColumn + 1 &&
						goToSQ.contains !== '') ||
						(piece.indexOfColumn === goToSQ.indexOfColumn - 1 &&
							goToSQ.contains !== '')) &&
					piece.line === goToSQ.line - 1
				) {
					return true
				}
			}
			if (piece.color === 'black') {
				if (
					((piece.indexOfColumn === goToSQ.indexOfColumn + 1 &&
						goToSQ.contains !== '') ||
						(piece.indexOfColumn === goToSQ.indexOfColumn - 1 &&
							goToSQ.contains !== '')) &&
					goToSQ.line === piece.line - 1
				) {
					return true
				}
			}
		}
	}
	function pawnMove(piece, goToSQ) {
		const indexPiece = infoClicks[0].index
		const indexPieceGO = infoClicks[1].index

		if (
			(piece.color === 'white' && goToSQ.color === 'white') ||
			(piece.color === 'black' && goToSQ.color === 'black')
		) {
			makeANewMove()
		}
		if (piece.color === 'white') {
			if (piece.line === 2) {
				if (validateIFhaveAnotherPieceOnTheWay(piece, goToSQ)) {
					makeANewMove()
				} else {
					if (validateIsFirstMoveOfPawn(piece, goToSQ)) {
						movingPiece(piece, goToSQ)
					}
					if (piece.column !== goToSQ.column) {
						if (validateEatPawn(piece, goToSQ)) {
							movingPiece(piece, goToSQ)
						}
					}
				}
			}
			if (piece.line !== 2) {
				if (piece.column === goToSQ.column) {
					if (validateMovePawn(piece, goToSQ)) {
						movingPiece(piece, goToSQ)
					}
				}
				if (piece.column !== goToSQ.column) {
					if (validateEatPawn(piece, goToSQ)) {
						movingPiece(piece, goToSQ)
					}
				}
			}
		}
		if (piece.color === 'black') {
			if (piece.line === 7) {
				if (validateIFhaveAnotherPieceOnTheWay(piece, goToSQ)) {
					makeANewMove()
				} else {
					if (validateIsFirstMoveOfPawn(piece, goToSQ)) {
						movingPiece(piece, goToSQ)
					}
					if (piece.column !== goToSQ.column) {
						if (validateEatPawn(piece, goToSQ)) {
							movingPiece(piece, goToSQ)
						}
					}
				}
			}
			if (piece.line !== 7) {
				if (piece.column === goToSQ.column) {
					if (validateMovePawn(piece, goToSQ)) {
						movingPiece(piece, goToSQ)
					}
				}
				if (piece.column !== goToSQ.column) {
					if (validateEatPawn(piece, goToSQ)) {
						movingPiece(piece, goToSQ)
					}
				}
			}
		} else {
			makeANewMove()
		}
	}

	function bishopMove(piece, goToSq) {
		const distline = Number(goToSq.line - piece.line)
		const distColumn = Number(goToSq.indexOfColumn - piece.indexOfColumn)
		const xdistColumn = Number(piece.indexOfColumn - goToSq.indexOfColumn)

		if (distline > 1 || distColumn > 1 || xdistColumn > 1) {
			if (!validateIFhaveAnotherPieceOnTheWay(piece, goToSq)) {
				if (
					Math.pow(distline, 2) == Math.pow(distColumn, 2) &&
					piece.color !== goToSq.color
				) {
					movingPiece(piece, goToSq)
				}
			}
		} else {
			if (
				Math.pow(distline, 2) == Math.pow(distColumn, 2) &&
				piece.color !== goToSq.color
			) {
				movingPiece(piece, goToSq)
			}
		}
	}
	function rookMove(piece, goToSq) {
		if (
			(piece.line === goToSq.line || piece.column === goToSq.column) &&
			piece.color !== goToSq.color
		) {
			if (!validateIFhaveAnotherPieceOnTheWay(piece, goToSq)) {
				movingPiece(piece, goToSq)
			}
		}
	}
	function knightMove(piece, goToSq) {
		console.log(piece, goToSq)
		if (
			((piece.line + 2 === goToSq.line &&
				piece.indexOfColumn === goToSq.indexOfColumn + 1) ||
				(piece.line + 2 === goToSq.line &&
					piece.indexOfColumn === goToSq.indexOfColumn - 1) ||
				(piece.line + 1 === goToSq.line &&
					piece.indexOfColumn === goToSq.indexOfColumn + 2) ||
				(piece.line + 1 === goToSq.line &&
					piece.indexOfColumn === goToSq.indexOfColumn - 2) ||
				(piece.line - 2 === goToSq.line &&
					piece.indexOfColumn === goToSq.indexOfColumn + 1) ||
				(piece.line - 2 === goToSq.line &&
					piece.indexOfColumn === goToSq.indexOfColumn - 1) ||
				(piece.line - 1 === goToSq.line &&
					piece.indexOfColumn + 2 === goToSq.indexOfColumn) ||
				(piece.line - 1 === goToSq.line &&
					piece.indexOfColumn - 2 === goToSq.indexOfColumn)) &&
			piece.color !== goToSq.color
		) {
			movingPiece(piece, goToSq)
		}
	}
	function kingMove(piece, goToSq) {
		console.log('king')
		console.log(piece, goToSq)
		if (
			((piece.line + 1 === goToSq.line &&
				piece.indexOfColumn === goToSq.indexOfColumn) ||
				(piece.line - 1 === goToSq.line &&
					piece.indexOfColumn === goToSq.indexOfColumn) ||
				(piece.line === goToSq.line &&
					piece.indexOfColumn + 1 === goToSq.indexOfColumn) ||
				(piece.line === goToSq.line &&
					piece.indexOfColumn - 1 === goToSq.indexOfColumn) ||
				(piece.line + 1 === goToSq.line &&
					piece.indexOfColumn + 1 === goToSq.indexOfColumn) ||
				(piece.line + 1 === goToSq.line &&
					piece.indexOfColumn - 1 === goToSq.indexOfColumn) ||
				(piece.line - 1 === goToSq.line &&
					piece.indexOfColumn + 1 === goToSq.indexOfColumn) ||
				(piece.line - 1 === goToSq.line &&
					piece.indexOfColumn - 1 === goToSq.indexOfColumn)) &&
			piece.color !== goToSq.color
		) {
			movingPiece(piece, goToSq)
		}
	}
	function makeARook(king, rook) {
		const dist = Math.sqrt(
			Math.pow(king.indexOfColumn - rook.indexOfColumn, 2)
		)
		let checkRook = true
		const sqs = []
		if (king.color === 'white' && rook.color === 'white') {
			if (rook.indexOfColumn > king.indexOfColumn) {
				for (let index = 1; index < dist; index++) {
					console.log(king.indexOfColumn + index)
					const sq =
						String(columns[king.indexOfColumn + index]) +
						String(king.line)
					sqs.push(sq)
				}
				for (const item of table) {
					for (const sq of sqs) {
						if (item.position === sq) {
							if (item.contains !== '') {
								checkRook = false
							}
						}
					}
				}
				if (checkRook) {
					movingPiece(table[60], table[62])
					movingPiece(table[63], table[61])
				}
			}
			if (king.indexOfColumn > rook.indexOfColumn) {
				for (let index = 1; index < dist; index++) {
					console.log(king.indexOfColumn + index)
					const sq =
						String(columns[king.indexOfColumn - index]) +
						String(king.line)
					sqs.push(sq)
				}
				for (const item of table) {
					for (const sq of sqs) {
						if (item.position === sq) {
							if (item.contains !== '') {
								checkRook = false
							}
						}
					}
				}
				if (checkRook) {
					movingPiece(table[60], table[58])
					movingPiece(table[56], table[59])
				}
			}
		} else {
			if (rook.indexOfColumn > king.indexOfColumn) {
				for (let index = 1; index < dist; index++) {
					console.log(king.indexOfColumn + index)
					const sq =
						String(columns[king.indexOfColumn + index]) +
						String(king.line)
					sqs.push(sq)
				}
				for (const item of table) {
					for (const sq of sqs) {
						if (item.position === sq) {
							if (item.contains !== '') {
								checkRook = false
							}
						}
					}
				}
				if (checkRook) {
					movingPiece(table[4], table[6])
					movingPiece(table[7], table[5])
				}
			}
			if (king.indexOfColumn > rook.indexOfColumn) {
				for (let index = 1; index < dist; index++) {
					console.log(king.indexOfColumn + index)
					const sq =
						String(columns[king.indexOfColumn - index]) +
						String(king.line)
					sqs.push(sq)
				}
				for (const item of table) {
					for (const sq of sqs) {
						if (item.position === sq) {
							if (item.contains !== '') {
								checkRook = false
							}
						}
					}
				}
				if (checkRook) {
					movingPiece(table[4], table[2])
					movingPiece(table[0], table[3])
				}
			}
		}
		console.log(dist)
		console.log(sqs)
	}
	return (
		<s.TableComponent>
			<s.Table>
				{table ? (
					table.map((item, index) => {
						if (cont >= 8) {
							linePar = !linePar
							cont = 0
						}
						cont++
						if (linePar) {
							// TA CRIANDO UM OBJETO A MAIS TODA VEZ Q EDITA
							if (table.length >= 65) {
								table.pop()
							}
							if (index % 2 === 0) {
								return (
									<div
										key={index}
										className={`sq white`}
										id={`${item.position}`}
										onClick={() => {
											movePiece(item)
										}}
									>
										<h1>
											{item.column}
											{item.line}
										</h1>
										{item.contains ? (
											<div
												className={`piece ${item.contains} ${item.color}`}
											></div>
										) : (
											<></>
										)}
									</div>
								)
							} else {
								return (
									<div
										key={index}
										className={`sq black`}
										id={`${item.position}`}
										onClick={() => {
											movePiece(item)
										}}
									>
										<h1>
											{item.column}
											{item.line}
										</h1>
										{item.contains ? (
											<div
												className={`piece ${item.contains} ${item.color}`}
											></div>
										) : (
											<></>
										)}
									</div>
								)
							}
						} else {
							if (index % 2 !== 0) {
								return (
									<div
										key={index}
										className={`sq white`}
										id={`${item.position}`}
										onClick={() => {
											movePiece(item)
										}}
									>
										<h1>
											{item.column}
											{item.line}
										</h1>
										{item.contains ? (
											<div
												className={`piece ${item.contains} ${item.color}`}
											></div>
										) : (
											<></>
										)}
									</div>
								)
							} else {
								return (
									<div
										key={index}
										className={`sq black`}
										id={`${item.position}`}
										onClick={() => {
											movePiece(item)
										}}
									>
										<h1>
											{item.column}
											{item.line}
										</h1>
										{item.contains ? (
											<div
												className={`piece ${item.contains} ${item.color}`}
											></div>
										) : (
											<></>
										)}
									</div>
								)
							}
						}
					})
				) : (
					<h1>Loading</h1>
				)}
			</s.Table>
		</s.TableComponent>
	)
}
