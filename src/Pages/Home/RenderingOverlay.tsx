import { Box, CircularProgress, Modal } from "@mui/material";

interface IRenderingOverlay {
  isHidden: boolean;
}

export function RenderingOverlay({ isHidden }: IRenderingOverlay) {
  return (
    <Modal open={!isHidden} sx={{
      width: '100vw',
      height: '100vh',
    }}>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(211,209,209,.5)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <CircularProgress
          color={"secondary"}
          size={100}
          thickness={5} />
      </Box>
    </Modal>
  );
}
