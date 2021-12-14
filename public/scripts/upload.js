
window.onload = function(){
 
    let baseCropping = $('#cropped-image').croppie({
        enableExif: true,
        viewport:{
            width:200,
            height:200
        },
        boundary:{
            width:300,
            height:300
        },
        showZoomer:true
    })

    function readbleFile(file){
        let reader = new FileReader()
        reader.onload =function(event){
            baseCropping.croppie('bind',{
                url:event.target.result
            }).then(()=>{
                $('.cr-slider').attr({
                    'min':0.5000,
                    'max':1.5000
                })
            })
        }

        reader.readAsDataURL(file)
    }

    $('#upload_pp').on('change',function(e){
        if(this.files[0]){
            readbleFile(this.files[0])
            $('#crop-modal').modal({
                backdrop:'static',
                keyboard:false
            })
        }
    })

    $('#cancel-crop').on('click',function(e){
        $('#crop-modal').modal('hide')
        $('#upload_pp').val('')
    })

    $('#close-crop').on('click',function(e){
      $('#upload_pp').val('')
    })

    $('#upload-image').on('click',function(e){
             
              baseCropping.croppie('result','blob')
              .then(blob=>{
                let formData = new FormData()
                let file = document.getElementById('upload_pp').files[0]
                let name = generateFilename(file.name)
        
                formData.append('upload_pp',blob,name)
                let headers = new Headers()
                headers.append('Accept','Application/JSON')
        
                let req = new Request('/uploads/ProfilePic',{
                  method:'POST',
                  headers,
                  mode:'cors',
                  body:formData
                })
        
                return fetch(req)
        
              })
              .then(res=>res.json())
              .then(data=>{
                document.getElementById('removeProfilePic').classList.remove("d-none")
                document.getElementById('removeProfilePic').classList.add("d-block")
                document.getElementById('profilepic').src = data.profilePic
                document.getElementById('uploadProfilepic').reset()
        
                $('#crop-modal').modal('hide')
        
              })
        
              .catch(e=>{
                console.log(e)
              })
        
             })  
             

             $('#removeProfilePic').on('click',function(e){

                         let req = new Request('/uploads/ProfilePic',{
                          method:'DELETE',
                          mode:'cors'
                        })
                  
                      fetch(req)
                      .then(res=>res.json())
                      .then(data=>{
                        document.getElementById('removeProfilePic').classList.remove("d-block")
                        document.getElementById('removeProfilePic').classList.add("d-none")
                        document.getElementById('profilepic').src = data.profilePic
                        document.getElementById('uploadProfilepic').reset()
                  
                       })
                       .catch(e=>{
                         console.log(e)
                         alert('Server error')
                       })
                  
                      })
             
                     
}

function generateFilename(name){

  let types = /(.jpg|.jpeg|.png|.gif)/
  return name.replace(types,'.png')
}