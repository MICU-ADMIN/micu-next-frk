```css

.loader {
  border: 2px solid #f3f3f3; /* Light grey */
  border-top: 2px solid #3b3f41; /* Blue */
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}


```

```mermaid

Here is the Mermaid Markdown overview for the Go file you provided:
```mermaid
graph LR
  *.loader[border:2px solid #f3f3f3; border-top:2px solid #3b3f41; border-radius:50%; width:20px; height:20px; animation:spin 1s linear infinite]
  spin[0%] {
    transform:rotate(0deg)
  }
  spin[100%] {
    transform:rotate(360deg)
  }
```
This will generate a simple graphical representation of the CSS code in your Go file, using the Mermaid Markdown syntax. The graph shows the `.loader` class with a border, rounded corners, and an animation that rotates the element 360 degrees.

```
