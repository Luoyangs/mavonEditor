const getAttributes = (info, component) => {
  return info
      .trim()
      .slice(component.length)
      .trim()
}

function defaultTabsAttributes(attributes) {
  let attributesString = []
  if (!attributes || Object.keys(attributes).length === 0) {
    return ''
  }

  for (const key in attributes) {
    const substring = `:${key}='${JSON.stringify(attributes[key])}'`
    attributesString.push(substring)
  }

  return attributesString.join(' ')
}

module.exports = {
  getAttributes,
  defaultTabsAttributes
}
