import React, { Component } from 'react';
import { Dialog, Slide, DialogActions, Button, DialogContent, DialogContentText, Link, Grid } from '@material-ui/core';
import { closeSupport } from '../actions';

const Transition = (props) => (
  <Slide direction='up' {...props} />
)

export const Support = ({ open, dispatch }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      onClose={() => dispatch( closeSupport() )}
    >
      <DialogContent>
        <DialogContentText>
          Hi there,
          <br /><br />
          I'm Shawn (22), a Computer Science student at the National University of Singapore.
          <br /><br />
          I'm an avid believer in working smart and I enjoy working on tools like this that help us do so.
          <br /><br />
          In my national service, I automated my job in the hope of buying time to explore my interests (during working hours, of course :D), 
          only to be discovered when they noticed I finished my work <i>too quickly</i>.
          <br /><br />
          I ended up automating several admin processes throughout the Army's 27 camps, achieving 50% manpower savings,
          50% process time savings and 10% reduced error rates.
          <br />
          I also had the incredible fortune of co-founding a Programming Taskforce to give my many extremely talented fellow
          servicemen an opportunity to contribute in a <i>more meaningful way</i>.
          <br /><br />
          If you'd like to talk about anything, hit me up via telegram or email.
          Alternatively, if you'd like to meet up in person, I've a standing offer to buy anyone a coffee who wants to
          have a chat - message me with some dates and times that you'll be around NUS and we can take it from there.
          <Grid item container direction='column' justify='flex-start' alignItems='flex-start'>
            <Grid item>
              <Link href='https://t.me/shawnkohzq' target='_blank' rel='noopener noreferrer'>
                Telegram - @shawnkohzq
              </Link>
            </Grid>
            <Grid item>
              <Link href='mailto:shawnkoh@me.com'>
                Email
              </Link>
            </Grid>
          </Grid>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color='primary' onClick={() => dispatch( closeSupport() )}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}
