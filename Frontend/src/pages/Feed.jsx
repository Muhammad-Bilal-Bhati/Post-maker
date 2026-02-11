import React from 'react'
import { useState,useEffect} from 'react'
import axios from 'axios'
function Feed() {
    const [posts, setPosts] = useState([
        {
            id: 1,
            img : "/munir.png",
            caption : "One of the Best person that i have ever met in my life",
        }
    ])
    useEffect(() => {
        axios.get('http://localhost:3000/posts')
        .then((res)=>{
            setPosts(res.data.posts);
        })
    }, []);

  const deletePost = (id)=>{
    axios.delete(`http://localhost:3000/posts/${id}`)
    .then((res)=>{
        setPosts(posts.filter(post => post._id !== id));
    })
  }

  const editPost = (id)=>{
    const newCaption = prompt("Enter new caption");
    if(newCaption){
        axios.patch(`http://localhost:3000/posts/${id}`,{caption: newCaption})
        .then((res)=>{
            const updatedPost = res.data.post;
            setPosts(posts.map(post => post._id === id ? updatedPost : post));
        })
    }
  }

  return (
    <div id='feed'>
        <h1>Feed</h1>
        {posts.length > 0 ?(
            posts.map(post =>(
                <div key={post._id} id='postCard'>
                    <img src={post.img} alt="Post Image" />
                    <p>{post.caption}</p>
                    <div className="btns">
                        <button onClick={() => deletePost(post._id)} className='dlt'>Delete</button>
                        <button onClick={()=>editPost(post._id)} className='edit'>Edit</button>
                    </div>
                </div>

            ))
        ):(
            <p>No posts available</p>
        )}
    </div>
  )
}

export default Feed