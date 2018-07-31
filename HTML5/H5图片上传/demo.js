

let formData = new FormData()

formData.append('name','King')
formData.append('age',12)
formData.append('name','hong')

console.log(formData.get('name'))
console.log(formData.getAll('name'))
