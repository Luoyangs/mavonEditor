const position = {
  false: 'push',
  true: 'unshift'
}

const renderPermalink = (slug, opts, state, idx) => {
  const space = () => Object.assign(new state.Token('text', '', 0), { content: ' ' })

  const linkTokens = [
    Object.assign(new state.Token('br_open', 'a', 1), {
      attrs: [
        ['class', 'shopee-br'],
      ]
    }),
    new state.Token('br_close', 'a', -1)
  ]

  // `push` or `unshift` according to position option.
  // Space is at the opposite side.
  linkTokens[position[!opts.permalinkBefore]](space())
  state.tokens[idx + 1].children[position[opts.permalinkBefore]](...linkTokens)
}

const br = (md, opts) => {
  opts = Object.assign({}, opts)

  md.core.ruler.push('br', state => {
    const tokens = state.tokens

    tokens
      .forEach(token => {
        renderPermalink(slug, opts, state, tokens.indexOf(token))
      })
  })
}

module.exports = anchor