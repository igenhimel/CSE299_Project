const authRoutes = require('../routes/authRoute')
const dashboardRoutes = require('../routes/dashboardRoute')
const uploadRoutes = require('../routes/uploadRouter')
const postRoute = require('../routes/postRoute')

const route = [

    {
        path:'/auth',
        controller:authRoutes
    },
    {
        path:'/dashboard',
        controller:dashboardRoutes

    },
    {
        path:'/uploads',
        controller:uploadRoutes

    },
    {
        path:'/posts',
        controller:postRoute

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