import * as React from 'react'
import { gql } from 'apollo-boost'
import { DataGrid } from '@mui/x-data-grid'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { Box } from '@mui/material'

const columns = [
  { field: '_id', headerName: 'ID', width: 90 },
  {
    field: 'author',
    headerName: 'Author',
    width: 150,
    editable: true,
  },
  {
    field: 'title',
    headerName: 'Title',
    width: 110,
    editable: true,
  },
  {
    field: 'publisher',
    headerName: 'Publisher',
    width: 150,
    editable: true,
  },
  {
    field: 'year',
    headerName: 'Year Published',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'isbn',
    headerName: 'ISBN',
    type: 'number',
    width: 110,
    editable: true,
  },
]
// Define mutation
const UPDATE_BOOKS = gql`
  # Increments a back-end counter and gets its resulting value
  mutation Update($_id: String!, $author: String!, $publisher: String!, $year: Int!, $isbn: String!, $title: String!) {
    update(_id: $_id, author: $author, publisher: $publisher, year: $year, isbn: $isbn, title: $title) {
      _id
      title
      isbn
      author
      year
    }
  }
`
export default function BookList() {
  const { data, loading, error } = useQuery(gql`
    {
      book {
        _id
        title
        year
        publisher
        author
        isbn
      }
    }
  `)
  const { book: books } = data || { book: null }
  const [onUpdateBooks] = useMutation(UPDATE_BOOKS)

  const onRowProcessUpdate = (newRow, oldRow) => {
    onUpdateBooks({ variables: { ...newRow } })
  }

  if (error) console.log('🚀 ~ file: BookList.jsx ~ line 30 ~ BookList ~ error', error)
  if (books?.length)
    return (
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={books}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          processRowUpdate={onRowProcessUpdate}
          onProcessRowUpdateError={model => console.log(model)}
          experimentalFeatures={{ newEditingApi: true }}
          getRowId={row => row._id}
        />
      </Box>
    )
  else return <div>Loading.....</div>
}
