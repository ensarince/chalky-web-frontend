import { Grid } from '@mui/material'
import React from 'react'

type Props = {
    children: React.ReactNode;
    align: string;
}

export default function Split({children, align}: Props) {
    
    const childrenArray = React.Children.toArray(children);

  return (
    <>
    <Grid container columns={36} alignItems={align} justifyContent='center'>
                    <Grid item xs={2} />
                    <Grid item md={11} xs={32} >
                        {childrenArray[0]}
                    </Grid>
                    <Grid item xs={2} md={1}  />
                    <Grid item xs={2} md={1} />
                    <Grid item md={19} xs={32} >
                        {childrenArray[1]}
                    </Grid>
                    <Grid item xs={2}  />
                </Grid>
            
</>
  )
}