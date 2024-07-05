const worker = new Worker('worker.js');
const sumButton = document.getElementById('sumButton');
const bgButton = document.getElementById('bgButton');

sumButton.addEventListener('click', (event) => {

    // let sum = 0;
    // for (let i = 0; i <= 10000000000; i++) {
    //     sum += i;
    // }
    // alert('Sum is: ' + sum);

    // new Promise((resolve, reject) => {
    //       let sum = 0;
    // for (let i = 0; i <= 10000000000; i++) {
    //     sum += i;
    // }  
    // resolve(sum);
    // }).then((sum) => {
    //     alert('Sum is: ' + sum);
    // });


    worker.postMessage('Hello from main script');

});

worker.onmessage = function (message) {
    console.log('Message from worker: ' + message.data);
    alert('Message from worker: ' + message.data);
}

bgButton.addEventListener('click', (event) => {
    if (document.body.style.backgroundColor !== 'green') {
        document.body.style.backgroundColor = 'green';
    } else {
        document.body.style.backgroundColor = 'blue';
    }
});