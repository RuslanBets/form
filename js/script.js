const btnAdd = document.getElementById('btn-add')
const btnSortName = document.getElementById('btn-sort-name')
const btnSortValue = document.getElementById('btn-sort-value')
const btnDelete = document.getElementById('btn-delete')
const btnShowXML = document.getElementById('btn-show-xml')
const input = document.getElementsByTagName('input')[0]
const select = document.getElementById('select')
const options = select.options




btnAdd.addEventListener('click', (e) => {
  e.preventDefault()
  if (!isValid(input.value)) {
    return
  }
  let keys = input.value.trim().split(/ *= */)
  createOption(keys[0], keys[1])
  input.value = ''
})

btnSortName.addEventListener('click', (e) => {
  e.preventDefault()
  select.append(...Array.from(select.options).sort((a, b) => a.innerText.split('=')[0] > b.innerText.split('=')[0] ? 1 : -1))
})

btnSortValue.addEventListener('click', (e) => {
  e.preventDefault()
  select.append(...Array.from(select.options).sort((a, b) => a.value.split('=')[1] > b.value.split('=')[1] ? 1 : -1))
})

btnDelete.addEventListener('click', (e) => {
  e.preventDefault()
  deleteActiveOptions(select)
})

btnShowXML.addEventListener('click', (e) => {
  e.preventDefault()

  const div = document.createElement('div')
  const a = document.createElement('a')
  const pre = document.createElement('pre')
  const dictionary = parseOptions(options)
  pre.innerText = stringifyToXML(dictionary)


  document.body.className = 'popup-black'
  a.className = 'popup-close'
  a.innerText = 'CLOSE'
  div.className = 'format-XML'
  div.style.fontSize = 30 + 'px'
  div.append(a, pre)
  document.body.append(div)


  a.addEventListener('click', () => {
    div.remove()
    document.body.classList.remove('popup-black')
  })
})

function createOption(name, value) {
  const option = document.createElement('option')
  option.innerText = `${name}=${value}`
  select.append(option)
}

function deleteActiveOptions(select) {
  [...select.options].filter(option => option.selected).forEach(option => option.remove())
}

function parseOptions(options) {
  let obj = {}
  let arr = [...options]
  for (let i = 0; i < arr.length; i++) {
    obj[arr[i].innerText.split('=')[0]] = arr[i].innerText.split('=')[1]
  }
  return obj
}

function stringifyToXML(obj) {
  let xml = ''
  for (let key in obj) {
    xml += `<${key}>${obj[key]}</${key}>
`
  }
  return xml
}

function isValid(value) {
  let regex = /^\s*\w+=\w+\s*$/
  return regex.test(value)
}