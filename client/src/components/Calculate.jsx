import { Box , Typography } from '@mui/material';

export default function Calculate({ value , text }) {
  return (
    <Box width='33%'  mx={1} p={3} >
      <Typography>{text}</Typography>
      <Typography variant='h4'>${value}</Typography>
    </Box>
  )
}
