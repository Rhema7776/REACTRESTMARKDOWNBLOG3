import React, { useEffect, useState } from 'react'
import {Container, Header, Image} from 'semantic-ui-react'
import axios from 'axios'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useParams } from 'react-router-dom'

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { postSlug } = useParams()
  useEffect(() => {
    async function fetchData(){
      setLoading(true);
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/posts/${postSlug}`);
        console.log(res.data);

        setPost(res.data)
        setLoading(false)
      } catch (error) {
        setError(error.message)
        setLoading(false) 
      }
    }
    fetchData();
  }, [])
  return (
    <Container>
        {error && <Message negative message={error}/>}
        {loading && <Loader/>}
        { post && [
          <div>   
            <Image src={post.thumbnail} />
            <h1>{post && post.title}</h1>
            <Header as='h4'>Last updated: {`${new Date(post.last_updated).toLocaleDateString()}`}</Header>
            <p>
             {post.content}
            </p>
            
          </div>
        ]}
        
    </Container>
    
  )
}

export default PostDetail