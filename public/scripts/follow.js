
    const follow = document.getElementsByClassName('follow')

    ;[...follow].forEach(bookmark=>{
    
        bookmark.style.cursor='pointer'

        bookmark.addEventListener('click',function(e){
            let target = e.target.parentElement

            let headers = new Headers()
            headers.append('Accept','Application/JSON')

            let req = new Request(`/api/follow/${target.dataset.post}`,{
                method:'GET',
                headers,
                mode:'cors'
            })

            fetch(req)
            .then(res=>res.json())
            .then(data=>{
                if(data.follow){
                    
                   
                    target.innerHTML = '<btn class="btn btn-outline-success">Following</btn>'
                }

                else{
                  
                    target.innerHTML = '<btn class="btn btn-light">Follow</btn>'
                }
            })
            .catch(e=>{
                console.error(e.response.data)
                alert(e.response.data.error)

            })
        })

    })



