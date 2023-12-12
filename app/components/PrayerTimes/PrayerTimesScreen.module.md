```css

.leftView {
  width: 60%;
}

.rightView {
  width: 40%;
}
.fullView {
  width: 100%;
}

.wrapper {
  flex-wrap: nowrap;
}

@media screen and (max-width: 1000px) {
  .leftView {
    width: 100%;
  }

  .rightView {
    width: 100%;
    overflow-x: scroll;
  }

  .wrapper {
    flex-wrap: wrap;
  }
}


```

```mermaid

Here is the Mermaid Markdown overview for the Go file you provided:
```mermaid
graph LR
  *.leftView[width: 60%;]
  *.rightView[width: 40%;]
  *.fullView[width: 100%;]
  *.wrapper[flex-wrap: nowrap;]
  @media screen and (max-width: 1000px)
    *.leftView[width: 100%;]
    *.rightView[width: 100%; overflow-x: scroll;]
    *.wrapper[flex-wrap: wrap;]
```
This overview uses the `graph` and `media` directives to create a simple graphical representation of the CSS layout rules in the Go file.
The `graph` directive is used to define the overall structure of the graph, which in this case consists of three nodes: `.leftView`, `.rightView`, and `.wrapper`.
The `LR` direction is used to specify that the graph should be laid out horizontally, with the `.leftView` and `.rightView` nodes located on the left and right sides

```
