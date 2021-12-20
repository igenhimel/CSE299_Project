

window.onload = function(){
    tinymce.init({
        selector: '#tiny-mce-body',
        plugins: 'autolink lists table image imagetools wordcount preview',
        toolbar: 'bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |link image media | forecolor backcolor emoticon | code preview ',
        toolbar_mode: 'floating',
        tinycomments_mode: 'embedded',
        tinycomments_author: 'Author name',
        height:400,
        automatic_uploads:true,
        images_upload_url:'/uploads/postImage',
        relative_urls:false,

        images_upload_handler:function(blobInfo,success,failure){

            let header = new Headers()
            header.append('Accept','Application/JSON')
            let formData =new FormData()
            formData.append('post-image',blobInfo.blob(),blobInfo.filename())

            let req = new Request('/uploads/postImage',{
                method:'POST',
                header,
                mode:'cors',
                body:formData
            })

            fetch(req)
            .then(res=>res.json())
            .then(data=>success(data.imageURL))
            .catch(()=>{
                failure('HTTP error')
            })



        }
     });
}