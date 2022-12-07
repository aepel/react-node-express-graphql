import React, { useEffect, useState } from 'react'
import { gql } from 'apollo-boost'
import { DataGrid, GridActionsCellItem, GridAddIcon, GridRowModes, GridToolbarContainer } from '@mui/x-data-grid'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { Box, Button } from '@mui/material'
import omit from 'lodash/omit'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Close'

// Define mutation
const QUERY_BOOKS = gql`
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
`
const UPDATE_BOOKS = gql`
  # Increments a back-end counter and gets its resulting value
  mutation Update($_id: String!, $author: String!, $publisher: String!, $year: Int!, $isbn: String!, $title: String!) {
    update(_id: $_id, author: $author, publisher: $publisher, year: $year, isbn: $isbn, title: $title) {
      _id
      title
      isbn
      publisher
      author
      year
    }
  }
`
const CREATE_BOOK = gql`
  # Increments a back-end counter and gets its resulting value
  mutation Create($author: String!, $publisher: String!, $year: Int!, $isbn: String!, $title: String!) {
    create(author: $author, publisher: $publisher, year: $year, isbn: $isbn, title: $title) {
      _id
      title
      isbn
      publisher
      author
      year
    }
  }
`
const EditToolbar = props => {
  const { setRows, setRowModesModel } = props

  const handleClick = () => {
    const id = -1
    setRows(oldRows => [...oldRows, { _id: -1, title: '', isbn: '', publisher: '', author: '', year: 0 }])
    setRowModesModel(oldModel => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }))
  }

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<GridAddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  )
}
export default function BookList() {
  const { data, loading, error } = useQuery(QUERY_BOOKS)
  const [rowModesModel, setRowModesModel] = useState({})
  const [rows, setRows] = useState([])
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
      width: 110,
      editable: true,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              // onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              // onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ]
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            // onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            // onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ]
      },
    },
  ]
  const [onUpdateBooks] = useMutation(UPDATE_BOOKS)
  const [onCreateBook] = useMutation(CREATE_BOOK)

  const onRowProcessUpdate = (newRow, oldRow) => {
    if (newRow._id === -1) onCreateBook({ variables: { ...omit(newRow, '_id') } })
    else onUpdateBooks({ variables: { ...newRow } })
  }
  useEffect(() => {
    if (!loading) {
      const { book: books } = data || { book: null }
      setRows(books)
    }
  }, [data, loading])
  if (error) console.log('🚀 ~ file: BookList.jsx ~ line 30 ~ BookList ~ error', error)
  if (rows?.length)
    return (
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 50]}
          checkboxSelection
          editMode="row"
          disableSelectionOnClick
          processRowUpdate={onRowProcessUpdate}
          onProcessRowUpdateError={model => console.log(model)}
          experimentalFeatures={{ newEditingApi: true }}
          getRowId={row => row._id}
          componentsProps={{
            toolbar: { setRows, setRowModesModel },
          }}
          components={{
            Toolbar: EditToolbar,
          }}
        />
      </Box>
    )
  else return <div>Loading.....</div>
}
