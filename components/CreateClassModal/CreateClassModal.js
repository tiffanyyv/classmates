import {Grid, Typography, FormControl, InputLabel, Input, FormHelperText, TextField } from '@mui/material';





export default function CreateClassModal ()  {


  return (
    <form className="createClassForm">
      <Typography variant="h5">Create a Class:</Typography>
      <FormControl component="fieldset" required>
        <InputLabel>Class Name</InputLabel>
          <Input />
      </FormControl>

    </form>

  )
}

