const body = {
    model: 'llama3',
    messages: 'Hello '
  }
  
  const response = await fetch("http://localhost:11434/api/chat", {
    method: "POST",
    body: JSON.stringify(body)
  })

export { }
