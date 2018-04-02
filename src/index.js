export default function sampleWhen(sampler) {
  return listenable => (start, sink) => {
    if (start !== 0) return

    let inited = false
    let value
    let listenableTalkback
    let samplerTalkback

    listenable(0, (type, data) => {
      if (type === 0) {
        listenableTalkback = data

        sampler(0, (type, data) => {
          if (type === 0) {
            samplerTalkback = data
            return
          }

          if (type === 1 && inited) {
            sink(1, value)
            return
          }

          if (type === 2) {
            listenableTalkback(2)
            sink(2)
            return
          }
        })

        sink(0, end => {
          if (end !== 2) return

          listenableTalkback(2)
          samplerTalkback(2)
        })
        return
      }

      if (type === 1) {
        inited = true
        value = data
        return
      }

      if (type === 2) {
        samplerTalkback(2)
        sink(2)
        return
      }
    })
  }
}
