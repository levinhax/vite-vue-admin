export async function readBuffer(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = loadEvent => {
      if (loadEvent.target) {
        resolve(loadEvent.target.result)
      }
    }
    reader.onerror = e => reject(e)
    reader.readAsArrayBuffer(file)
  })
}
