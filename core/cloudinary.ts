
const  cloudinary  =  require('cloudinary')

if(!process.env.CLOUDINARY_NAME){
throw new Error('Отсутсвует конфигурации для Cloudinary')
}

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

export default cloudinary