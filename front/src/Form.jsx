import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  TextField,
  RadioGroup,
  Select,
  Radio,
  FormControlLabel,
  Grid,
  Slider,
  Button,
  MenuItem,
  FormLabel,
  FormControl,
} from '@mui/material'
const Form = ({ name, author, year, publisher, isbn, onHandleSubmit }) => {
  const [formValues, setFormValues] = useState({ name, author, year, publisher, isbn })
  const handleInputChange = e => {
    const { name, value } = e.target
    setFormValues({
      ...formValues,
      [name]: value,
    })
  }
  const handleSliderChange = name => (e, value) => {
    setFormValues({
      ...formValues,
      [name]: value,
    })
  }
  const handleSubmit = event => {
    event.preventDefault()
    onHandleSubmit(formValues)
  }
  return (
    <form onSubmit={handleSubmit}>
      <Grid container alignItems="center" justify="center" direction="column">
        <Grid item>
          <TextField
            id="name-input"
            name="name"
            label="Name"
            type="text"
            value={formValues.name}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="age-input"
            name="age"
            label="Age"
            type="number"
            value={formValues.age}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <FormControl>
            <FormLabel>Gender</FormLabel>
            <RadioGroup name="gender" value={formValues.gender} onChange={handleInputChange} row>
              <FormControlLabel key="male" value="male" control={<Radio size="small" />} label="Male" />
              <FormControlLabel key="female" value="female" control={<Radio size="small" />} label="Female" />
              <FormControlLabel key="other" value="other" control={<Radio size="small" />} label="Other" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <Select name="os" value={formValues.os} onChange={handleInputChange}>
              <MenuItem key="mac" value="mac">
                Mac
              </MenuItem>
              <MenuItem key="windows" value="windows">
                Windows
              </MenuItem>
              <MenuItem key="linux " value="linux">
                Linux
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <div style={{ width: '400px' }}>
            Favorite Number
            <Slider
              value={formValues.favoriteNumber}
              onChange={handleSliderChange('favoriteNumber')}
              defaultValue={1}
              step={1}
              min={1}
              max={3}
              marks={[
                {
                  value: 1,
                  label: '1',
                },
                {
                  value: 2,
                  label: '2',
                },
                {
                  value: 3,
                  label: '3',
                },
              ]}
              valueLabelDisplay="off"
            />
          </div>
        </Grid>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Grid>
    </form>
  )
}
Form.propTypes = {
  author: PropTypes.string,
  publisher: PropTypes.number,
  isbn: PropTypes.string,
  title: PropTypes.string,
  year: PropTypes.number,
  onHandleSubmit: PropTypes.func,
}

Form.defaultProps = {
  author: '',
  publisher: '',
  isbn: '',
  title: '',
  year: 2011,
}
export default Form
