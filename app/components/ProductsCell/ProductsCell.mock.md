```js

// Define your own mock data here:
export const standard = () => ({
  products: [
    {
      id: 1,
      name: 'Folding',
      description:
        'Fold anything in the universe, whether it be laundry or spacetime itself. Disclaimer: May cause a rip in the spacetime continuum if used improperly.',
      price: 500,
      image: '/img/folding.png',
      type: 'product',
    },
    {
      id: 3,
      name: 'Flight',
      description:
        'Fly up to 50m into the sky and reach a maximum speed of 180km/h.',
      price: 350,
      image: '/img/flight.png',
      type: 'product',
    },
    {
      id: 2,
      name: 'Invisibility',
      description:
        'Become invisible in the blink of an eye and avoid all those pesky people. Warning: overuse may cause one to feel transparent and lost.',
      price: 200,
      image: '/img/invisibility.png',
      type: 'product',
    },
  ],
})


```

```mermaid

Here is a possible Mermaid Markdown overview for the Go file you provided:
```mermaid
graph LR
  standard[products] --> (1) Folding
  1 --> (2) Fold anything in the universe
  1 --> (3) May cause a rip in the spacetime continuum if used improperly
  standard[products] --> (4) Flight
  4 --> (5) Fly up to 50m into the sky
  4 --> (6) Reach a maximum speed of 180km/h
  standard[products] --> (7) Invisibility
  7 --> (8) Become invisible in the blink of an eye
  7 --> (9) Avoid all those pesky people
  7 --> (10) Warning: overuse may cause one to feel transparent and lost
```
This overview uses the `graph` and `arrow` keywords to create a directed graph, where each node represents a product and each arrow represents the relationship between the products. The `standard` node is the root of the graph, and the `products` node is a subgraph that contains the three products defined in the

```
