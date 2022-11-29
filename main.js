moneyLi = [100,200,400,600,800]
let container = document.querySelector(".container")


let gridBuilder = ()=>{
    for(let x=0;x<5;x++){
        container.innerHTML += `
            <div class="row">
            <div class="col"></div>
            <div id="${moneyLi[x]}" class="j-board text-center col-2">$${moneyLi[x]}</div>
            <div id="${moneyLi[x]}" class="j-board text-center col-2">$${moneyLi[x]}</div>
            <div id="${moneyLi[x]}" class="j-board text-center col-2">$${moneyLi[x]}</div>
            <div id="${moneyLi[x]}" class="j-board text-center col-2">$${moneyLi[x]}</div>
            <div id="${moneyLi[x]}" class="j-board text-center col-2">$${moneyLi[x]}</div>
            <div class="col"></div>
            </div>
        `
    }
}
gridBuilder()

let qGetter = async () => {
    let rawData = await fetch('jeopardy.json')
    let data = await rawData.json()
    let randomNum = Math.floor(Math.random() * data.length);
    return data[randomNum]
}

let clickBuilder = ()=>{
    let moneyOptions = document.querySelectorAll('.j-board')
    moneyOptions.forEach((ele)=>{
        ele.addEventListener('click', async ()=>{
            ele.style.backgroundColor = "black"
            ele.classList.remove('j-board')
            ele.style.pointerEvents = "none"
            let question = await qGetter()
            console.log(question)
            container.innerHTML += `
                <div class="answer-section">
                    <div class="text-center">
                        <p class="mt-3" style="color:black;">${question.question}</p>
                    </div>
                    <div class="text-center">
                        <form action="" id="answer">
                            <label>Your Answer: </label>
                            <input id="userAnswer" type="text">
                            <input class="btn btn-dark" type="submit" value="Submit">
                        </form>
                    </div>
                </div>
            `
            document.querySelector('#answer').addEventListener('submit', (e)=>{
                e.preventDefault()
                let answer = document.querySelector('#userAnswer').value
                if(answer.toLowerCase() === question.answer.toLowerCase()){
                    changeScore(Number(score.innerHTML) + Number(ele.id))
                }
                qAnswered()
            })
        })
    })
}

let qAnswered = ()=>{
    let answerSection = document.querySelector('.answer-section')
    answerSection.innerHTML = ''
    answerSection.remove()
    clickBuilder()
}

let changeScore = (num)=>{
    let score = document.querySelector('#score')
    score.innerHTML = num
}

clickBuilder()
