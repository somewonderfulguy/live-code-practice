const createObserver = <TMessage>() => {
  type Callback = (msg: TMessage) => void
  const callbacks = new Set<Callback>()

  return {
    subscribe: (cb: Callback) => {
      callbacks.add(cb)
      return () => callbacks.delete(cb)
    },
    publish: (msg: TMessage) => {
      callbacks.forEach((cb) => cb(msg))
    }
  }
}

/** With topics */
const createPubSub = <TMessage>() => {
  type Callback = (msg: TMessage) => void
  const topics = new Map<string, Set<Callback>>()

  return {
    subscribe: (topic: string, cb: Callback) => {
      const callbacks = topics.get(topic) ?? new Set<Callback>()
      callbacks.add(cb)
      topics.set(topic, callbacks)

      return () => {
        callbacks.delete(cb)
        if (callbacks.size === 0) topics.delete('topic')
      }
    },
    publish: (topic: string, msg: TMessage) => {
      topics.get(topic)?.forEach((cb) => cb(msg))
    }
  }
}
