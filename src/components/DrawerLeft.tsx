import { Drawer, Typography } from '@mui/material';
import { useRef, useState } from 'react'
import styles from "./DrawerLeft.module.scss"
import { ArrowLeftCircleIcon } from '@heroicons/react/20/solid';
import { ArrowRightCircleIcon } from '@heroicons/react/24/solid';

type Props = {}

type Anchor = 'left' | 'right' | 'top' | 'bottom';

export default function DrawerLeft({}: Props) {

  const drawerRef = useRef<HTMLDivElement | null>(null);
  const [state, setState] = useState<{ left: boolean; right: boolean; top: boolean; bottom: boolean; }>({
    left: false,
    right: false,
    top: false,
    bottom: false,
  });

  const toggleDrawer = (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setState({ ...state, ...{ [anchor]: open } });
  };

  return (

    <>
    {!state["left"] && //what to write here to hide it when drawer is open?
      <button className={styles.btn__help} onClick={toggleDrawer('left', true)} style={{ background: "none", border: "none" }}>
        <ArrowRightCircleIcon />
      </button>
    }

    <Drawer
      sx={{ top: "60%" }}
      className={styles.MuiDrawer__fabrik}
      anchor={"left"}
      ref={drawerRef}
      open={state["left"]}
      onClose={toggleDrawer("left", false)}>
      <div className={styles.div__slide12Drawer}>
          <Typography variant="h2" >
            Da kann ich nachschauen
          </Typography>
          <Typography variant="h5" >
            Da kann ich nachschauen
          </Typography>
          <button className={styles.btn__help} onClick={toggleDrawer('left', false)}  style={{ background: "none", border: "none" }}>
            <ArrowLeftCircleIcon/>
          </button>
      </div>
    </Drawer>

    </>
  )
}