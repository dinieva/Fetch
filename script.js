//Реализовать получение данных из файла .json через функцию getData 

const requestURL = 'db.json';
const getURL = 'https://jsonplaceholder.typicode.com/posts';

function getData(url) {
    return fetch(url).then(response => {
        //return response.text()
        return response.json()
    })
}

getData(requestURL)
    .then(data => console.log(data))
    .catch(err => console.log(err))

// После получения объекта из файла .json должна произойти отправка данных (которые мы получили из файла .json) на URL через функцию sendData  https://jsonplaceholder.typicode.com/posts
/* let body = {
    user: 'Vlad',
    age: 33,
    role: 'developer'
} */

let body = getData(requestURL);

function sendData(method, url) {
    return fetch(url, {
        method: method,
        //body: JSON.stringify(body),       // тело запроса,который отправляется
        body: body,
        headers: {
            //'Content-type': 'application/json; charset=UTF-8',
            'Content-type': 'multipart/form-data',
        },
    }).then(response => {
        if (response.ok) {
            return response.json()
        }
        return response.json().then(error => {
            const e = new Error('ОШИБКА')
            e.data = error
            throw e
        })
    })
}

sendData('POST', getURL)
    .then(data => console.log(data))
    .catch(err => console.log(err))



