import React,{ useState } from 'react';
import {Button, Container, Divider,  Header, Image, Icon, Modal } from 'semantic-ui-react';
import axios from "axios";
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useParams } from 'react-router-dom';
import {api} from "../api"
import {useFetch, history} from "../helpers";

function DeleteModal({title, postSlug, thumbnail}) {
  const [open, setOpen] = React.useState(false)
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleSubmit() {
    setLoading(true);
    axios
      .delete(api.posts.delete(postSlug),{
      headers:{
        "Content-Type": "multipart/form-data",
        "Authorization": "Token fc43694f50a28b70c8ad672d5a1d5fe830485c67"
      }
    })
    .then(res => {
      setLoading(false);
      history.push('/')
      //if this is a successfull response we ,redirect back to PostList
    })
    .catch(err => {
      setLoading(false);
      setError(err.message || err)
    })
  }
  return (
    <Modal
      basic
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size='small'
      trigger={<Button secondary floated='right' onClick={() => setOpen(true)}>Delete post</Button>}
    >
      <Modal.Header>Delete a post</Modal.Header>
      <Modal.Content image>
        <Image size='medium' src={thumbnail} wrapped />
        <Modal.Description>
          <Header>{title}</Header>
          {error && <Message negative message={error}/>}
          <p>
            Are you sure you want to delete this post?
          </p>
         
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color='red' inverted onClick={() => setOpen(false)}>
          <Icon name='remove' /> No
        </Button>
        <Button color='green'
         inverted onClick={handleSubmit}
         loading={loading}
         disabled={loading}
         >
          <Icon name='checkmark' /> Confirm delete
        </Button>
      </Modal.Actions>
    </Modal>
  )
}



const PostDetail = () => {
  const { postSlug } = useParams()
  const {data, loading, error} = useFetch(api.posts.retrieve(postSlug))

  return (
    <Container>
        {error && <Message negative message={error}/>}
        {loading && <Loader/>}
        { data && [
          <div>   
            <Image src={data.thumbnail} />
            <h1>{data && data.title}</h1>
            <Header as='h4'>Last updated: {`${new Date(data.last_updated).toLocaleDateString()}`}</Header>
            <p>
             {data.content}
            </p>
            <Divider />
            <DeleteModal postSlug={postSlug} title={data.title} thumbnail={data.thumbnail} />
           
            
          </div>
        ]}
        
    </Container>
    
  )
}

export default PostDetail