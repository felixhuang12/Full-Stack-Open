const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
      return sum + item.likes
    }
  
    return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    let maxLikes = 0
    let fav = {}
    blogs.forEach(blog => {
        if (blog.likes > maxLikes){
            maxLikes = blog.likes
            fav = blog
        }
    })
    return {title: fav.title, author: fav.author, likes: maxLikes}
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}