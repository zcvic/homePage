function getHitokoto() {
    return new Promise((resolve, reject) => {
        fetch('https://v1.hitokoto.cn')
            .then(response => response.json())
            .then(data => {
                resolve(data)
            })
    });
}
const render = () => {
    getHitokoto().then(res => {
        let text = ""
        let index = 0
        const renderNextWordOnce = async () => {
            if (index < res.hitokoto.length) {
                text += res.hitokoto[index];
                index++;
                if (index > 4) {
                    document.querySelector(".hitokoto-author").innerHTML = `——「${res.from}」`
                }
                document.querySelector(".hitokoto-text span").innerHTML = text
                await new Promise(resolve => setTimeout(resolve, 200))
                void renderNextWordOnce()
            }
        }
        renderNextWordOnce()
    })
}

setTimeout(render, 1000)