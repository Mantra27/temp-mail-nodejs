const fetch = require('axios');

const getEmailAdd = async () => {
let _rett = fetch('https://www.1secmail.com/api/v1/?action=genRandomMailbox').then((res)=>{
    return JSON.stringify(res.data[0]).replace('"', "").trim();
});

return _rett;
}

const getEmailMsg = async (username, domain) => {

  console.log(username, domain)
    try{
        let data = await fetch(`https://www.1secmail.com/api/v1/?action=getMessages&login=${username}&domain=${domain}`).then((res)=>{

        if(res.data.length == 0) {
            return 0;
        }

        else{
            let id = res.data[0].id;
            let mails = fetch(`https://www.1secmail.com/api/v1/?action=readMessage&login=${username}&domain=${domain}&id=${id}`).then((mail)=>{
                return mail.data;
            })
            return mails;
        }
    });
    return data;
    }
    catch(e){
       throw console.error(e);
    }


}

module.exports = {
    getEmailAdd,getEmailMsg
}
