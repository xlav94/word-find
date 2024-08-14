import React, {useState, useEffect} from 'react';

import { generate} from "random-words";
import Word from './Word';

import './Main.css';

function Main() {

    const [word, setWord] = useState('');
    const [inputs, setInputs] = useState([{ value: '', correct: Array(5).fill('') }]);
    const [nbGuesses, setNbGuesses] = useState(1);
    const [win, setWin] = useState('');

    useEffect(() => {
        const generatedWord = generate({ minLength: 5, maxLength: 5 }).toUpperCase();
        setWord(generatedWord);
        console.log(generatedWord);
    }, []);


    const handleClick = () => {
        nbGuesses === 5 && setWin('You loose! The word was ' + word);

        const newInputs = [...inputs];
        const guess = newInputs[newInputs.length - 1].value;

        let otherGuesses = false;

        if (guess.length === 5) {
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
                if (otherGuesses && nbGuesses < 5) {
                    newInputs.push({ value: '', correct: Array(5).fill('') });
                    console.log(nbGuesses);
                    
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
            <button className='button' onClick={handleClick}>Check</button> : null}
        </div>
        <div className='win'>
            <h1>{win}</h1>
        </div>
        <div>
            {win !== '' ? 
            <button className='button' onClick={() => window.location.reload()}>Play again</button> : null}
        </div>
    </div>
  )
}

export default Main
