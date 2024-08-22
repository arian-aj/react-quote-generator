import { useState, useEffect } from "react";

export default function QuoteGenerator() {

    //kreiiere 2 use states, einen um die quotes zu Speichern
    // den anderen für eine RandomNum der Quotes Array

    const [ quotesArray, setQuotesArray ] = useState([]);
    const [ randomNum, setRandomNum ] = useState(null);




    useEffect(() => {
        fetch(`https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json`)
            .then(resp => resp.json())
            .then(data => {
                console.log("Fetched data:", data);
                setQuotesArray(data.quotes);
            })
            .catch(err => {
                console.error("Error fetching quotes:", err);
            });
    }, []);

    function generateRandomNum() {
        if (quotesArray.length > 0) {
            let randomIndex = Math.floor(Math.random() * quotesArray.length);
            setRandomNum(randomIndex);
        } else {
            console.error("Quotes array is empty");
        }
    }


    return (
        <div>
            <strong>
                {
                    randomNum !== null && quotesArray[randomNum] ? quotesArray[randomNum].quote : "Click the button to generate a quote"
                }
            </strong>
            <p>
                - {randomNum !== null && quotesArray[randomNum] ? quotesArray[randomNum].author : ""} -
            </p>
            <button onClick={generateRandomNum}>Generiere Zitat</button>
        </div>
    )

}