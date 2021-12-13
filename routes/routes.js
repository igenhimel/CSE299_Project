const authRoutes = require('../routes/authRoute')
const route = [

    {
        path:'/auth',
        controller:authRoutes
    },

    {
        path:'/',
        controller:(req,res)=>{

            res.redirect('/explore')
           
        }
    }


]

module.exports = (app)=>{
    route.forEach((r)=>{
       if(r.path=='/'){
           app.get(r.path,r.controller)
       }
       else{
        app.use(r.path,r.controller)
       }
    })
}