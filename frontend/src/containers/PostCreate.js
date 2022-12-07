import React, {useRef, useState } from 'react'
import {Header, Button, Checkbox, Form } from 'semantic-ui-react'
import {Message} from '../components/Message';
import axios from 'axios';
import {history} from '../helpers'

const PostCreate = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState(null);
  const [markdown, setMarkdown] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  const fileInputRef = useRef()

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    // console.log(title)
    // console.log(markdown)
    // console.log(thumbnail)

    const formData = new FormData()
    formData.append("thumbnail", thumbnail)
    formData.append("title", title)
    formData.append("content", markdown)
    console.log(formData);
    axios
      .post('http://127.0.0.1:8000/api/posts/create/', formData, {
      headers:{
        "Content-Type": "multipart/form-data"
      }
    })
    .then(res => {
      console.log(res)
      setLoading(false);
      history.push('./posts')
      //if this is a successfull response we ,redirect back to PostList
    })
    .catch(err => {
      setLoading(false);
      console.log(err)
      setError(err.message || err)

    })
  }
  return (
    <div>
     <h1>Create a post</h1>
     {error && (
      <Message danger message={error}/>
     )}
     {thumbnail && <Message info message={`Selected image: ${thumbnail.name}`} />}
     {thumbnail && <input value={thumbnail.name} disabled/>}
      <Form >
        <Form.Field>
          <label>Title</label>
          <input placeholder='Title of your post'
           value={title} 
           onChange={e => setTitle(e.target.value)} />
        </Form.Field>
        <Form.TextArea
         label='Markdown Content'
         placeholder='This is your post content...'
         value={markdown}
         onChange={e => setMarkdown(e.target.value)} />      
        <Form.Field>
          {/* {thumbnail && <input value={thumbnail.name} disabled/>} */}
          <Button
            type='button'
           fluid
           content="Choose a thumbnail"
           labelPosition='left' 
           icon="file"
           onClick={() => fileInputRef.current.click()}
          />
          <input ref={fileInputRef}
           type="file" 
           hidden
           onChange={e => setThumbnail(e.target.files[0])
           }/>
        </Form.Field>
        <Button loading={loading} disabled={loading} primary fluid type='submit' onClick={handleSubmit}>Submit</Button>
      </Form>
    </div>
    
  )
}

export default PostCreate