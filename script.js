const d=document.querySelector('.d')
const i=document.querySelector('.i')
const b=document.querySelector('.b')

let users=localStorage.getItem('users') 

? JSON.parse(localStorage.getItem('users')) 
: []
const add_user=(user)=>({
    img:user.avatar_url,
    name:user.name,
    link:user.html_url,
    login:user.login,
    _id:user.id,
    location:user.location,
    admin:user.site_admin
})
const rem=()=>{
    const remove_3= document.querySelectorAll('.remove_3')
    for (const i of remove_3) {
        i.addEventListener('click',e=>{
            for (const i1 of users) {
                if(i1._id==e.target.parentElement.children[5].textContent){
                    let index=users.indexOf(i1)
                   users.splice(index,1)
                    
                }
            }
            e.target.parentElement.remove()
            localStorage.setItem('users',JSON.stringify(users))
        })
    
    
    }
}
const draw_all=()=>{
    d.innerHTML=users.map(i=>`
    <div class='user'>
    <img src='${i.img}'>
    <button class="remove_3">
    X
    </button>
    <br>
    <a href='${i.link}'>${i.name?i.name:'user don`t chosse name'}</a>
    <p>${i.login}</p>
    <p>${i._id}</p>
    <p>${i.location?i.location:'user don`t chosse location'}</p>
    <p>${i.admin}</p>
    </div>
    `)
}
draw_all()
rem()

    b.addEventListener('click',e=>{
        if(!i.value.trim()) return

            


        d.innerHTML+='<img class="load" src="loading-icon-transparent-background-12.gif">'
        fetch(`https://api.github.com/users/${i.value.trim()}`)
        
        .then(e=>e.ok? e.json(): Promise.reject(e))
        .then(e=>{
            document.querySelector('.eror').classList.remove('active')
            if(!users.find(i=>i._id==e.id)){
                users.push(add_user(e))
            d.innerHTML+=
            `
            <div class='user'>
            <img src='${e.avatar_url}'>
            <button class="remove_3">
            X
            </button>
            <br>
            <a href='${e.html_url}'>${e.name?e.name:'user don`t chosse name'}</a>
            <p>${e.login}</p>
            <p>${e.id}</p>
            <p>${e.location?e.location:'user don`t chosse location'}</p>
            <p>${e.site_admin}</p>
            </div>
            `
            rem()
            localStorage.setItem('users',JSON.stringify(users))
            i.value=''
            scroll(0,d.scrollHeight)
            }
            else{
                document.querySelector('.allready').classList.add('active')
                document.querySelector('.remove_2').addEventListener('click',()=>{
                    document.querySelector('.allready').classList.remove('active')
                })
                rem()
            }
            
            
        })
        .catch(e=>{
            // if(i.value==''){
                // document.querySelector('.enter').classList.add('active')
                // document.querySelector('.remove_4').addEventListener('click',()=>{
                // document.querySelector('.enter').classList.remove('active')
                // })
            // }
            // else{
                document.querySelector('.eror').classList.add('active')
                document.querySelector('.remove').addEventListener('click',()=>{
                document.querySelector('.eror').classList.remove('active')
                })
            // }
            
            rem()
        })
        .finally(()=>{
            document.querySelector('.load').remove()
        })
        
    })
document.querySelector('.up').addEventListener('click', e=>{

    window.scroll(0,0)

})


