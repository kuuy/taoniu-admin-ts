import {FC, useCallback, useState} from 'react'
import PropTypes from 'prop-types'
import XIcon from '@untitled-ui/icons-react/build/esm/X'
import {Box, Drawer, IconButton, Stack, SvgIcon, Theme, Typography, useMediaQuery} from '@mui/material'
import { TradingDetails } from './trading-details'
import { TradingEdit } from './trading-edit'
import type { Trading } from '~/src/types/trading'

interface TradingDrawerProps {
  container?: HTMLDivElement | null;
  open?: boolean;
  onClose?: () => void;
  trading?: Trading;
}

export const TradingDrawer: FC<TradingDrawerProps> = (props) => {
  const { container, onClose, open, trading } = props;
  const [isEditing, setIsEditing] = useState(false);
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));

  const handleEditOpen = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleEditCancel = useCallback(() => {
    setIsEditing(false);
  }, []);

  let content = null;

  if (trading) {
    content = (
      <div>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          sx={{
            px: 3,
            py: 2
          }}
        >
          <Typography
            color="inherit"
            variant="h6"
          >
            {trading.number}
          </Typography>
          <IconButton
            color="inherit"
            onClick={onClose}
          >
            <SvgIcon>
              <XIcon />
            </SvgIcon>
          </IconButton>
        </Stack>
        <Box
          sx={{
            px: 3,
            py: 4
          }}
        >
          {!isEditing
            ? (
              <TradingDetails
                onApprove={onClose}
                onEdit={handleEditOpen}
                onReject={onClose}
                trading={trading}
              />
            )
            : (
              <TradingEdit
                onCancel={handleEditCancel}
                onSave={handleEditCancel}
                trading={trading}
              />
            )}
        </Box>
      </div>
    );
  }

  if (lgUp) {
    return (
      <Drawer
        anchor="right"
        open={open}
        PaperProps={{
          sx: {
            position: 'relative',
            width: 500
          }
        }}
        SlideProps={{ container }}
        variant="persistent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      hideBackdrop
      ModalProps={{
        container,
        sx: {
          pointerEvents: 'none',
          position: 'absolute'
        }
      }}
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          maxWidth: '100%',
          width: 400,
          pointerEvents: 'auto',
          position: 'absolute'
        }
      }}
      SlideProps={{ container }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

TradingDrawer.propTypes = {
  container: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  // @ts-ignore
  trading: PropTypes.object
};
