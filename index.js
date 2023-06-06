let getMaxAmount = (data) => {
    let max = 0
    let max_day = ''
    for(let i = 0; i < data.length; i++){
        if(data[i].amount > max){
            max = data[i].amount
            max_day = data[i].day
        }
    }
    return [max, max_day]
}

let createGraph = (data) => {
    let bars = document.querySelectorAll('.chart .day .bar')
    let max = getMaxAmount(data)[0]
    let max_day = getMaxAmount(data)[1]
    if(bars && bars.length === data.length){
        for(let i = 0; i < bars.length; i++){
            let bar = bars[i]
            let day = data[i].day
            if(bar.classList.contains(day)){
                bar.style.height = `${(data[i].amount/max)*90}%`
                bar.classList.remove('hide')
                bar.querySelector('.value').innerHTML = '$'+data[i].amount
                if(data[i].day === max_day) bar.classList.add('max')
            }
        }
    }
}

fetch('./assets/data.json')
    .then((response) => response.json())
    .then((json) => {
        setTimeout(()=>createGraph(json),500)
    })
    .catch((error) => console.log(error));