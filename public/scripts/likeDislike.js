
  const likebtns = document.getElementsByClassName('likebtn')
  const dislikebtns = document.getElementsByClassName('dislikebtn')

;[...likebtns].forEach(likebtn=>{
  
  likebtn.addEventListener('click',function(e){
    const postId = likebtn.dataset.post

    reqLikeDislike('likes',postId)
    .then(res=>res.json())
    .then(data=>{

      let likeText = data.liked ? `<i class="fas fa-thumbs-up text-primary"></i> ${data.totalLikes}` : `<i class="fas fa-thumbs-up"></i> ${data.totalLikes}`
      let dislikeText = `<i class="fas fa-thumbs-down"></i> ${data.totalDislikes}`

      likebtn.innerHTML = likeText
      let dislikebtn = document.getElementById(`dislikebtn${postId}`)
      dislikebtn.innerHTML=dislikeText

    })
    .catch(e=>{
        console.log(e)
        alert(e.response.data.error)
    })
})
})

;[...dislikebtns].forEach(dislikebtn=>{
  dislikebtn.addEventListener('click',function(e){
    const postId = dislikebtn.dataset.post

    reqLikeDislike('dislikes',postId)
    .then(res=>res.json())
    .then(data=>{

      let dislikeText = data.disliked ? `<i class="fas fa-thumbs-down text-primary"></i> ${data.totalDislikes}` : `<i class="fas fa-thumbs-down"></i> ${data.totalDislikes}`
      let likeText = `<i class="fas fa-thumbs-up"></i> ${data.totalLikes}`

      
      let likebtn = document.getElementById(`likebtn${postId}`)
      likebtn.innerHTML=likeText
      dislikebtn.innerHTML = dislikeText

    })
    .catch(e=>{
        console.log(e)
        alert(e.response.data.error)
    })
})

})

  function reqLikeDislike(type,postId){

    let headers = new Headers()
    headers.append('Accept','Application/JSON')
    headers.append('Content-Type','Application/JSON')

    let req = new Request(`/api/${type}/${postId}`,{
        method:'GET',
        headers,
        mode:'cors'
    })

    return fetch(req)

  }

