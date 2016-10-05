let fs = require('fs')
let url = require('url')
let multiparty = require('multiparty')

let tasksCounter = 0
let allTasks = []

module.exports = function (req, res) {
  req.pathname = req.pathname || url.parse(req.url).pathname

  if (req.pathname === '/create') {
    if (req.method === 'GET') {
      fs.readFile('./create-list.html', (err, data) => {
          // TODO: manage the err as proper res
        if (err) console.log(err)
        res.writeHead(200, {
          'Content-Type': 'text/html'
        })
        res.write(data)
        res.end()
      })
    } else if (req.method === 'POST') {
      let form = new multiparty.Form()
      form.parse(req)

      form.on('part', part => {
        if (part.filename) {
          let body = ''

          part.on('data', data => { body += data })
          part.on('end', () => {
            fs.writeFile('./todo-list-tasks/' + tasksCounter + part.filename, body, err => {
              if (err) throw err
            })
          })
        } else {
          let body = ''
          let dict = []
          let partName = '' + part.name

          part.on('data', data => { body += data })
          part.on('end', () => {
            dict[partName] = body

            allTasks.push({
              key: tasksCounter,
              value: dict
            })

            console.log('dict')
            console.log(dict)

            console.log('allTasks')
            console.log(allTasks)
          })
        }
      })

      res.writeHead(200)
      res.write('Finished parsing the form')
      res.end()

      tasksCounter++
    }
  } else {
    return true
  }
}
