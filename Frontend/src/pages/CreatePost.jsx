
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
function CreatePost() {
    const navigate = useNavigate();

    const handleSubmit = (e)=>{
      e.preventDefault();
      const formData = new FormData(e.target);
      axios.post('http://localhost:3000/create-post', formData)
      .then((res)=>{
        navigate('/feed');
      })
    }
  return (

   <section className='create-post-section'>
        <h1>Create Post</h1>
            <form onSubmit={handleSubmit}>
                <input id="img" type="file" name="img" accept='image/*' />
                <input type="text" name="caption" placeholder="Enter caption" />
                <button type="submit">Submit</button>
            </form>
   </section>
  )
}

export default CreatePost