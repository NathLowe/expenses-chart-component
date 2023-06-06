let getMaxAmount = (data) => {
    let max = 0
    let max_day = ''
    for(const element of data){
        if(element.amount > max){
            max = element.amount
            max_day = element.day
        }
    }
    return [max, max_day]
}

// To set the height of each bar and to determine which bar should be blue
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