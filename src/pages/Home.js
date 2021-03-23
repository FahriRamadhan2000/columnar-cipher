import React, { useState } from 'react'
import { InputGroup, Button, FormControl, Col } from 'react-bootstrap'
export const Home = () => {
    const [state, setState] = useState({
        plainText: '',
        cipherText: '',
        encryptText: '',
    })
    const handlePlainText = (event) => setState({ ...state, plainText: event.target.value })
    const handleCipherText = (event) => setState({ ...state, cipherText: event.target.value })
    const handleEncryptText = (event) => setState({ ...state, encryptText: event.target.value })
    const matrixTranspose = (matrix) => matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]))
    const sortFunction = (a, b) => (a[0] === b[0]) ? 0 : ((a[0] < b[0]) ? -1 : 1)
    const buildArray = () => {
        let i = 0
        const array = [[...state.cipherText]]
        const plainText = [...state.plainText].filter(value => value !== ' ')
        const cipherText = [...state.cipherText]
        plainText.forEach((char, index) => {
            if (index % cipherText.length === 0) {
                i++
                array[i] = []
            }
            array[i].push(char)
        })
        return matrixTranspose(array).sort(sortFunction)
    }
    const encrypt = () => {
        const array = buildArray()
        const result = []
        const cipherText = [...state.cipherText]
        cipherText.forEach((_, row) => {
            for (let index = 1; index < array[0].length; index++)
                array[row][index] ? result.push(array[row][index])
                    : result.push('.')
        })
        setState({
            ...state,
            encryptText: result.join('')
        })
    }
    const buildReverseArray = () => {
        let i = -1
        const array = []
        const cipherText = [...state.cipherText]
        const SortCipherText = [...state.cipherText].sort()
        const encryptText = [...state.encryptText]
        SortCipherText.forEach((char, index) => {
            array[index] = []
            array[index].push(char)
        })
        encryptText.forEach((char, index) => {
            if (index % (encryptText.length / cipherText.length) === 0) {
                i++
            }
            array[i].push(char)
        })
        cipherText.forEach((char, row) => {
            cipherText.forEach((_, currentRow) => {
                if (char === array[currentRow][0]) {
                    let temp = array[row]
                    array[row] = array[currentRow]
                    array[currentRow] = temp
                }
            })
        })
        return array
    }
    const decrypt = () => {
        const array = buildReverseArray()
        const result = []
        const cipherText = [...state.cipherText]

        for (let i = 1; i < array[0].length; i++) {
            cipherText.forEach((_, row) => {
                result.push(array[row][i])
            })
        }
        setState({
            ...state,
            plainText: result.filter(value => value !== '.').join('')
        })
    }
    return (
        <Col xs={11} xl={7} className='p-5 b-rad'>
            <h2 className='text-center mb-2'>Encrypt and Decrypt</h2>
            <h4 className='text-center mb-3'>Columnar Cipher</h4>
            <label className='mt-3 mb-0' htmlFor="plain-text"><h5>Plain Text</h5></label>
            <InputGroup>
                <FormControl id='plain-text' value={state.plainText} onChange={handlePlainText} autoComplete='off' />
                <InputGroup.Append>
                    {state.cipherText !== '' && state.plainText !== '' &&
                        (<Button className='b-button bold' onClick={encrypt}>Encrypt</Button>)}
                </InputGroup.Append>
            </InputGroup>
            <label className='mt-3 mb-0' htmlFor="cipher-text"><h5>Key</h5></label>
            <InputGroup>
                <FormControl id='cipher-text' value={state.cipherText} onChange={handleCipherText} autoComplete='off' />
            </InputGroup>
            <label className='mt-3 mb-0' htmlFor="encrypt-text"><h5>Encrypt Text</h5></label>
            <InputGroup>
                <FormControl id='encrypt-text' value={state.encryptText} onChange={handleEncryptText} autoComplete='off' />
                <InputGroup.Append>
                    {state.cipherText !== '' && state.encryptText !== '' &&
                        (<Button className='b-button bold' onClick={decrypt} >Decrypt</Button>)}
                </InputGroup.Append>
            </InputGroup>
        </Col>
    )
}