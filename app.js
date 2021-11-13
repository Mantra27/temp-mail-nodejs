const fetch = require('axios');
const event = require('events');
let gotNew = new event();

//main func.
const email = async () => {
let _rett = fetch('https://www.1secmail.com/api/v1/?action=genRandomMailbox').then((res)=>{
    //res.data isnt in json format so;
    return JSON.stringify(res.data[0]);
});

let username, domain;

//number of emails in initial emailBox
let initial = fetch(`https://www.1secmail.com/api/v1/?action=getMessages&login=${username}&domain=${domain}`).then((e)=>{
    return e.data.length;
})

    //receive latest email from interval.
    gotNew.on('new', (e)=>{
        console.log(e)
    })

        _rett.then((resolve)=>{
            console.log(`email: ${resolve}`);
            //resolve variable will get extra " mark since its getting returned by the API(1 sec email api), only thing we can do it replacing single qoutation mark using .replace()
            username = resolve.split("@")[0].replace(`"`, "").trim();
            domain = resolve.split("@")[1].replace(`"`, "").trim();

            console.log('Listening to the emails')

            //listening to randomly give emailbox for new incoming emails
            setInterval(()=>{
                fetch(`https://www.1secmail.com/api/v1/?action=getMessages&login=${username}&domain=${domain}`).then(async (res)=>{
                    if(res.data.length !== initial){
                        initial = res.data.length;
                        if(res.data.length !==0){
                            await fetch(`https://www.1secmail.com/api/v1/?action=readMessage&login=${username}&domain=${domain}&id=${res.data[0].id}`).then((msg)=>{
                            gotNew.emit('new', msg.data);
                            //emit latest email data to the event handler.
                        })
                        }
                    }
                })
            }, 300)
        })

}


//export modules(only email func)
module.exports = {
    email,
}
