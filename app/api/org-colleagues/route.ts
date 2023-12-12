export async function GET() {
  // return dummy data of org colleagues

  const data = [
    {
      id: 1,
      name: "Leslie Alexander",
      phone: "1-493-747-9031",
      email: "lesliealexander@example.com",
      role: "Co-Founder / CEO",
      url: "https://example.com",
      profileUrl: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    // More people...
    {
      id: 2,
      name: "John Doe",
      phone: "1-123-456-7890",
      email: "johndoe@example.com",
      role: "Co-Founder / CTO",
      url: "https://example.com",
      profileUrl: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      id: 3,
      name: "Jane Doe",
      phone: "1-098-765-4321",
      email: "janedoe@example.com",
      role: "Co-Founder / CFO",
      url: "https://example.com",
      profileUrl: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      id: 4,
      name: "Jane Doe",
      phone: "1-098-765-4321",
      email: "janedoe@example.com",
      role: "Co-Founder / CFO",
      url: "https://example.com",
      profileUrl: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      id: 5,
      name: "Jane Doe",
      phone: "1-098-765-4321",
      email: "janedoe@example.com",
      role: "Co-Founder / CFO",
      url: "https://example.com",
      profileUrl: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      id: 6,
      name: "Jane Doe",
      phone: "1-098-765-4321",
      email: "janedoe@example.com",
      role: "Co-Founder / CFO",
      url: "https://example.com",
      profileUrl: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      id: 7,
      name: "Jane Doe",
      phone: "1-098-765-4321",
      email: "janedoe@example.com",
      role: "Co-Founder / CFO",
      url: "https://example.com",
      profileUrl: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      id: 8,
      name: "Jane Doe",
      phone: "1-098-765-4321",
      email: "janedoe@example.com",
      role: "Co-Founder / CFO",
      url: "https://example.com",
      profileUrl: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      id: 9,
      name: "Jane Doe",
      phone: "1-098-765-4321",
      email: "janedoe@example.com",
      role: "Co-Founder / CFO",
      url: "https://example.com",
      profileUrl: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      id: 10,
      name: "Jane Doe",
      phone: "1-098-765-4321",
      email: "janedoe@example.com",
      role: "Co-Founder / CFO",
      url: "https://example.com",
      profileUrl: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  ];

  //   using Response.json on GET requests should cache this value for our user
  return Response.json(data);
}
