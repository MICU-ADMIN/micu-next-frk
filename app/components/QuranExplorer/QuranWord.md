```tsx

import React from 'react'
import { Tooltip } from 'react-tooltip'

const audioUrl = 'https://audio.qurancdn.com/'

function QuranWord({ word, text = false, setAudioUrl, setSelectedAyah }) {
  return (
    <>
      <div
        className="alMushaf  hover:bg-indigo-100"
        onClick={() =>
          text
            ? setSelectedAyah &&
              word.audio_url &&
              setSelectedAyah(word.verse_id)
            : setAudioUrl(audioUrl + word.audio_url)
        }
      >
        {text ? (
          <p
            data-tooltip-content={
              word.translation?.text +
              ' | ' +
              (word?.transliteration?.text || '')
            }
            data-tooltip-id={`word-${word.id}`}
            className="inline-block cursor-pointer p-1 text-[23px]"
          >
            {word?.text_indopak}
          </p>
        ) : (
          <img
            className="inline-block h-[75px] cursor-pointer"
            data-tooltip-content={
              word.translation?.text +
              ' | ' +
              (word?.transliteration?.text || '')
            }
            data-tooltip-id={`word-${word.id}`}
            src={`https://static.qurancdn.com/images/${word.text}`}
            alt={word.text_uthmani}
          ></img>
        )}
      </div>
      <Tooltip id={`word-${word.id}`} />
    </>
  )
}

export default QuranWord


```

```mermaid

Here is a Mermaid Markdown overview for the Go file you provided:
```mermaid
graph LR
    QuranWord[QuranWord] --> Text[text]
    QuranWord --> Audio[audio_url]
    QuranWord --> SetAudioUrl[setAudioUrl]
    QuranWord --> SetSelectedAyah[setSelectedAyah]
    Text --> SetSelectedAyah[setSelectedAyah]
    Audio --> SetAudioUrl[setAudioUrl]
```
This Mermaid Markdown code represents the Go file as a directed graph, where each node represents a function or variable, and each edge represents a relationship between nodes.
The `QuranWord` node represents the `QuranWord` function, which takes several parameters: `word`, `text`, `setAudioUrl`, and `setSelectedAyah`.
The `Text` node represents the `text` parameter of the `QuranWord` function, which is a boolean value that determines whether to display the text or audio for the given word.
The `Audio` node represents the `audio_url` parameter of

```
