import { useState, useCallback } from 'react';

export function App(props) {
    const [age, setAge] = useState(0)
    const handleClick = useCallback(() => {
        setAge(age + 1);
    }, [age]);
    return (<>
        <h2>Hello {props.name}</h2>
        <button onClick={handleClick}>
            click=={age}
        </button>
    </>)
}