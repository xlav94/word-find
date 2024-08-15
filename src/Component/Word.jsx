import React, {useState, useRef} from 'react';
import './Word.css';

function Word({setGuess, correct} ) {
    const [letters, setLetters] = useState(Array(5).fill(''));
    const inputRefs = useRef([]);

    const handleChange = (event, index) => {
        const newLetters = [...letters];
        newLetters[index] = event.target.value.toUpperCase();
        setLetters(newLetters);
        setGuess(newLetters.join(''));

        if (event.target.value && index < letters.length - 1) {
            inputRefs.current[index + 1].focus();
          }
    };

    const handleKeyDown = (event, index) => {
        if (event.key === 'Backspace' && index > 0 && !letters[index]) {
          inputRefs.current[index - 1].focus();
        }
      };

    return (
        <div className='word'>
            {letters.map((letter, index) => (
                <input
                type="text"
                maxLength="1"
                className={`letter ${correct[index]}`}
                key={index}
                value={letter}
                onChange={(event) => handleChange(event, index)}
                onKeyDown={(event) => handleKeyDown(event, index)}
                ref={(el) => (inputRefs.current[index] = el)}
            />
            ))}
        </div>
    )
}

export default Word
