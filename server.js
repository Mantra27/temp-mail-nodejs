const fetch = require('axios');
const events = require('event');


const getEmailAdd = async () => {
let _rett = fetch('https://www.1secmail.com/api/v1/?action=genRandomMailbox').then((res)=>{
    return JSON.stringify(res.data[0]);
});
return _rett;
}

const getEmailMsg = async (username, domain) => {

    let data = fetch(`https://www.1secmail.com/api/v1/?action=getMessages&login=${username}&domain=${domain}`).then((res)=>{
        return res.data;
    })
    data.then((msg)=>{
        console.log(msg);
        return msg;
    })

}

module.exports = {
    getEmailAdd,getEmailMsg
}
