import React, {useState, useEffect} from 'react';

import { generate} from "random-words";
import Word from './Word';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faRotateRight } from '@fortawesome/free-solid-svg-icons';


import './Main.css';

function Main() {

    const [word, setWord] = useState('');
    const [inputs, setInputs] = useState([{ value: '', correct: Array(5).fill('') }]);
    const [nbGuesses, setNbGuesses] = useState(1);
    const [win, setWin] = useState('');
    const [wordValid, setWordValid] = useState(true);

    const wordExists = require('word-exists');

    
    useEffect(() => {
        const generatedWord = generate({ minLength: 5, maxLength: 5 }).toUpperCase();
        setWord(generatedWord);
        console.log(generatedWord);
    }, []);


    const handleClick = () => {
        nbGuesses === 6 && setWin('You loose! The word was ' + word);
        
        const newInputs = [...inputs];
        const guess = newInputs[newInputs.length - 1].value;

        let otherGuesses = false;

        if (guess.length === 5) {
            if(!wordExists(guess)){
                setWordValid(false);
                return;
            }
            else{
                setWordValid(true);
            }

            const corrects = [];
            const guessWord = word.split('');
            for (let i = 0; i < word.length; i++) {
                if (word[i] === guess[i]) {
                    corrects[i] = 'correct';
                    guessWord.splice(guessWord.indexOf(word[i]), 1);
                } else if (guessWord.includes(guess[i])) {
                    corrects[i] = 'mal-place';
                    guessWord.splice(guessWord.indexOf(guess[i]), 1);
                    otherGuesses = true;
                } else {
                    corrects[i] = 'incorrect';
                    otherGuesses = true;
                }
            }

            newInputs[newInputs.length - 1].correct = corrects;

            if (guess === word){
                setWin('You found the word!');
            }
            else{
                if (otherGuesses && nbGuesses < 6) {
                    newInputs.push({ value: '', correct: Array(5).fill('') });
                }
            }
            setInputs(newInputs);
            setNbGuesses(prev => prev + 1);
        }
    };

    const handleInputChange = (index, event) => {
        const newInputs = [...inputs];
        newInputs[index].value = event.target.value;
        setInputs(newInputs);
    };

    const setGuess = (index, value) => {
        handleInputChange(index, { target: { value } });
    };



  return (
    <div className='container'>
        <h1>Find the word!</h1>
        {inputs.map((input, index) => (
            <Word word={word} setGuess={(value) => setGuess(index, value)} correct={input.correct}/>
        ))}
        <div >
            {win === '' ? 
            <button className='button' onClick={handleClick}>
                <FontAwesomeIcon icon={faCheck} />
            </button> : null}
        </div>
        <div className='win'>
            <h1>{win}</h1>
        </div>
        <div className='valid'>
            {wordValid ? null : <h1>Word does not exist.</h1>}
        </div>
        <div>
            {win !== '' ? 
            <button className='button' onClick={() => window.location.reload()}>
               <FontAwesomeIcon icon={faRotateRight} spin /> 
            </button> : null}
        </div>
    </div>
  )
}

export default Main
