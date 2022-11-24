import * as React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import ImageIcon from '@mui/icons-material/Image'
import { gql } from 'apollo-boost'

import { useQuery } from '@apollo/react-hooks'

export default function BookList() {
  const {
    data: { book: books },
    loading,
    error,
  } = useQuery(gql`
    {
      book {
        title
        year
        publisher
        author
        isbn
      }
    }
  `)
  console.log('🚀 ~ file: BookList.jsx ~ line 18 ~ BookList ~ books', books)

  if (error) console.log('🚀 ~ file: BookList.jsx ~ line 30 ~ BookList ~ error', error)
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {books &&
        books.map(book => (
          <ListItem key={book._id}>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Title" secondary={book.title} />
            <ListItemText primary="Author" secondary={book.author} />
          </ListItem>
        ))}
    </List>
  )
}
