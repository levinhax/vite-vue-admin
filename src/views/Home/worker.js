onmessage = e => {
  console.log(`Worker: Received message - ${e.data}`)
  postMessage('Home Worker')
}
