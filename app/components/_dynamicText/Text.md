```jsx

import React, { useState, useEffect } from "react";
import "./DynamicText.css"; // Import the CSS file with your styles

const DynamicText = ({ sentence, words, wordsStyle, sentenceStyle }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const dynamicText = ` ${words[currentWordIndex]}.`;

  return (
    <div className="">
      <h1 className={sentenceStyle}>{sentence}</h1>
      <h1 className={`${wordsStyle} dynamic-text`}>{dynamicText}</h1>
    </div>
  );
};

export default DynamicText;


```

```mermaid

Here is the Mermaid Markdown overview for the given Go file:
```mermaid
graph LR
  + DynamicText[Go]
    + Import React, useState, useEffect from "react"
    + Import "./DynamicText.css" for CSS styles
    + Define const sentence, words, wordsStyle, sentenceStyle
    + Use useState to store currentWordIndex
    + Use useEffect to setInterval to update currentWordIndex every 3500 milliseconds
    + Return JSX element with dynamicText
    + dynamicText = ` ${words[currentWordIndex]}.`
    + Return JSX element with h1 tags for sentence and dynamicText
```
Note: The above Mermaid Markdown code is just an approximation of the Go file, and may not be exactly the same due to limitations of the Markdown syntax.

```
