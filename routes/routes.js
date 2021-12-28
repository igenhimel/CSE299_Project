const authRoutes = require('../routes/authRoute')
const dashboardRoutes = require('../routes/dashboardRoute')
const uploadRoutes = require('../routes/uploadRouter')
const postRoute = require('../routes/postRoute')
const apiRoute = require('../api/routes/apiRoute')
const exploreRoute = require('../routes/exploreRoute')
const searchRoute = require('../routes/searchRoute')
const authorRoutes = require('../routes/authorRoutes')
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
        path:'/explore',
        controller:exploreRoute
    },
    {
        path:'/search',
        controller:searchRoute
    },
    {
        path:'/author',
        controller:authorRoutes
    },
    {
        path:'/api',
        controller:apiRoute

    },
    {
        path:'/posts',
        controller:postRoute

    },
    {
        path:'/',
        controller:(req,res)=>{

            res.redirect('/explore/homepage')
           
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