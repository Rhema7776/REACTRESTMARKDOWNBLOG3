import React from 'react'
import { Message } from 'semantic-ui-react'

export default ({ message, info, positive, warning, negative }) => (
  <Message  info positive warning negative>
    {message}
  </Message>
)

// import Alert from 'react-bootstrap/Alert';

// function LinksExample() {
//   return (
//     <>
//       {[
//         'primary',
//         'secondary',
//         'success',
//         'danger',
//         'warning',
//         'info',
//         'light',
//         'dark',
//       ].map((variant) => (
//         <Alert key={variant} variant={variant}>
//           This is a {variant} alert with{' '}
//           <Alert.Link href="#">an example link</Alert.Link>. Give it a click if
//           you like.
//         </Alert>
//       ))}
//     </>
//   );
// }

// export default LinksExample;

