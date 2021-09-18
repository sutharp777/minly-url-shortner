const uri = document.querySelector("input#uri")
const slug = document.querySelector("input#slg")
const btnShortIt = document.querySelector("button#btn-gl")
const output = document.querySelector("#output")


// window.addEventListener('load', (event) => {
//     console.log('loaded');
//   });

  
const slugPattern = RegExp('^[-\\w]*$')

var uriPattern = RegExp('^(https?:\\/\\/)?(www.)?'+ // protocol
'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
'((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
'(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
'(\\#[-a-z\\d_]*)?$','i') // fragment locator


btnShortIt.addEventListener('click', async(e) => {
    e.preventDefault()
    if(!uriPattern.test(uri.value.trim())) {
        uri.classList.add("apply-shake")
        setTimeout(()=>uri.classList.remove("apply-shake"),500)
        uri.focus()
        return
    }else if(!slugPattern.test(slug.value.trim())){
        slug.classList.add("apply-shake")
        setTimeout(()=>slug.classList.remove("apply-shake"),500)
        uri.focus()
        return
    }
    else{
        syncAll()
        const data = slug.value.trim()!==''?{ 
            uri: uri.value,
            slug: slug.value
        }:{
            uri: uri.value
        }

        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        fetch(window.location.origin, options)
        .then(res => res.json())
        .then((result)=>{
            const msg = result.msg
            const slug = result.slug

            if(msg){
                output.innerHTML = '<span>slug is alredy in use! try another</span>'
            }
            else{
                output.innerHTML = `<a href="/${slug}" target="_blank"> /${slug}</a>`
                output.focus()
            }
        }).catch((err)=>{
            output.innerHTML = '<span style="color:red;">Server Error</span>'
        }).then((nor)=>{
            syncAll()
        })
    
    }
})

function syncAll(){
    btnShortIt.disabled = !btnShortIt.disabled
}