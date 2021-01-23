
const devurl = "http://localhost:5000"
const produrl =  "https://git.heroku.com/delivery-pool-backend.git"

const api = process.env.NODE_ENV=== "development" ? devurl : produrl;
export default api