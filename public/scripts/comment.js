
let comment = document.getElementById('comment')
let commentHolder = document.getElementById('comment-holder')

comment.addEventListener('keypress',function(e){


     if(e.key=='Enter'){
         if(e.target.value){

            let data = {
                body:e.target.value
            }

            let postId = comment.dataset.post

            generateReq('comment',postId,data)
            .then(res=>res.json())
            .then(data=>{
                let commentElement = createComment(data)
                commentHolder.insertBefore(commentElement,commentHolder.children[0])
                e.target.value= ''
                let nocom = document.getElementById('no-comment')
                nocom.innerHTML=''
            })
            .catch(e=>{
                console.log(e.response.data)
                alert(e.response.data.error)
            })

         }
     }


})

commentHolder.addEventListener('keypress',function(e){
    if(commentHolder.hasChildNodes(e.target)){
        if(e.key=='Enter'){
            let commentId = e.target.dataset.comment
            let value = e.target.value

            if(value){
                let data = {
                    body:value
                }

                generateReq('comment/replies',commentId,data)
                .then(res=>res.json())
                .then(data=>{

                    let replyElement = createReply(data)
                    let parent = e.target.parentElement
                    parent.previousElementSibling.appendChild(replyElement)
                    e.target.value =''

                })
                .catch(e=>{
                    console.log(e)
                    alert(e.message)
                })
            }
            else{
                alert('please provide a valid reply')
            }
        }
    }
})

function generateReq(type,postId,body){

    let headers = new Headers()
    headers.append('Accept','Application/JSON')
    headers.append('Content-Type','Application/JSON')

    let req = new Request(`/api/${type}/${postId}`,{
        method:'POST',
        headers,
        body:JSON.stringify(body),
        mode:'cors'
    })

    return fetch(req)


}

function createComment(comment){
    let innerHtml = `     <img src="${comment.user.profilePic}" alt=""
    class="img-fluid img-thumbnail rounded-circle mx-3 mt-2" width="60px">
  <span class="comment-user text-muted mt-2">
    ${comment.user.profile.name} | just now
  </span>
    <div class="media-body">
    <p class="comment-body">${comment.body}</p>
    <div class="my-3">
    <textarea name="reply" id="reply" class="form-control w-50" placeholder="Replies..."data-comment="${comment._id}" cols="30" rows="1"></textarea>
  </div>
  </div>
    `
    let div = document.createElement('div')
    div.className = "media border-bottom"
    div.innerHTML = innerHtml
    return div
}

function createReply(reply){
    let innerHTML = `   <img src="${reply.profilePic} " alt="" class="img-fluid img-thumbnail rounded-circle align-self-start mr-3"
    width="60px">
    <span class="reply-user text-muted mt-2">
     ${reply.name}
    </span> 
  <div class="media-body">
    <p class="comment-body">${reply.body}</p>

  </div>`

  let div = document.createElement('div')
  div.className = "media mt-3"
  div.innerHTML = innerHTML
  return div

}