import type { FC } from 'react'
import { useCallback } from 'react'
import PropTypes from 'prop-types'
import { format } from 'date-fns'
import Globe01Icon from '@untitled-ui/icons-react/build/esm/Globe03'
import Star01Icon from '@untitled-ui/icons-react/build/esm/Star01'
import DotsVerticalIcon from '@untitled-ui/icons-react/build/esm/DotsVertical'
import {
  Avatar,
  AvatarGroup,
  Box,
  IconButton,
  Stack,
  SvgIcon,
  TableCell,
  tableCellClasses,
  TableRow,
  Tooltip,
  Typography
} from '@mui/material'

import { usePopover } from '~/src/hooks/use-popover'
import type { Item } from '~/src/types/file-manager'
import { bytesToSize } from '~/src/utils/bytes-to-size'

import { ItemIcon } from './item-icon'
import { ItemMenu } from './item-menu'

interface ItemListRowProps {
  item: Item
  onDelete?: (itemId: string) => void
  onFavorite?: (itemId: string, value: boolean) => void
  onOpen?: (itemId: string) => void
}

export const ItemListRow: FC<ItemListRowProps> = (props) => {
  const { item, onDelete, onFavorite, onOpen } = props
  const popover = usePopover<HTMLButtonElement>()

  const handleDelete = useCallback(
    (): void => {
      popover.handleClose();
      onDelete?.(item.id);
    },
    [item, popover, onDelete]
  );

  let size = bytesToSize(item.size);

  if (item.type === 'folder') {
    size += `• ${item.itemsCount} items`;
  }

  const createdAt = item.createdAt && format(item.createdAt, 'MMM dd, yyyy');
  const showShared = !item.isPublic && (item.shared || []).length > 0;

  return (
    <>
      <TableRow
        key={item.id}
        sx={{
          backgroundColor: 'transparent',
          borderRadius: 1.5,
          boxShadow: 0,
          transition: (theme) => theme.transitions.create(
            ['background-color', 'box-shadow'],
            {
              easing: theme.transitions.easing.easeInOut,
              duration: 200
            }
          ),
          '&:hover': {
            backgroundColor: 'background.paper',
            boxShadow: 16
          },
          [`& .${tableCellClasses.root}`]: {
            borderBottomWidth: 1,
            borderBottomColor: 'divider',
            borderBottomStyle: 'solid',
            borderTopWidth: 1,
            borderTopColor: 'divider',
            borderTopStyle: 'solid',
            '&:first-of-type': {
              borderTopLeftRadius: (theme) => theme.shape.borderRadius * 1.5,
              borderBottomLeftRadius: (theme) => theme.shape.borderRadius * 1.5,
              borderLeftWidth: 1,
              borderLeftColor: 'divider',
              borderLeftStyle: 'solid'
            },
            '&:last-of-type': {
              borderTopRightRadius: (theme) => theme.shape.borderRadius * 1.5,
              borderBottomRightRadius: (theme) => theme.shape.borderRadius * 1.5,
              borderRightWidth: 1,
              borderRightColor: 'divider',
              borderRightStyle: 'solid'
            }
          }
        }}
      >
        <TableCell>
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
          >
            <Box
              onClick={() => onOpen?.(item.id)}
              sx={{ cursor: 'pointer' }}
            >
              <ItemIcon
                type={item.type}
                extension={item.extension}
              />
            </Box>
            <div>
              <Typography
                noWrap
                onClick={() => onOpen?.(item.id)}
                sx={{ cursor: 'pointer' }}
                variant="subtitle2"
              >
                {item.name}
              </Typography>
              <Typography
                color="text.secondary"
                noWrap
                variant="body2"
              >
                {size}
              </Typography>
            </div>
          </Stack>
        </TableCell>
        <TableCell>
          <Typography
            noWrap
            variant="subtitle2"
          >
            Created at
          </Typography>
          <Typography
            color="text.secondary"
            noWrap
            variant="body2"
          >
            {createdAt}
          </Typography>
        </TableCell>
        <TableCell>
          <Box sx={{ display: 'flex' }}>
            {item.isPublic && (
              <Tooltip title="Public">
                <Avatar
                  sx={{
                    height: 32,
                    width: 32
                  }}
                >
                  <SvgIcon fontSize="small">
                    <Globe01Icon />
                  </SvgIcon>
                </Avatar>
              </Tooltip>
            )}
            {showShared && (
              <AvatarGroup max={3}>
                {item.shared?.map((person) => (
                  <Avatar
                    key={person.name}
                    src={person.avatar}
                    sx={{
                      height: 32,
                      width: 32
                    }}
                  />
                ))}
              </AvatarGroup>
            )}
          </Box>
        </TableCell>
        <TableCell align="right">
          <IconButton onClick={() => onFavorite?.(item.id, !item.isFavorite)}>
            <SvgIcon
              fontSize="small"
              sx={{ color: item.isFavorite ? 'warning.main' : 'action.active' }}
            >
              <Star01Icon />
            </SvgIcon>
          </IconButton>
        </TableCell>
        <TableCell align="right">
          <IconButton
            onClick={popover.handleOpen}
            ref={popover.anchorRef}
          >
            <SvgIcon fontSize="small">
              <DotsVerticalIcon />
            </SvgIcon>
          </IconButton>
        </TableCell>
      </TableRow>
      <ItemMenu
        anchorEl={popover.anchorRef.current}
        onClose={popover.handleClose}
        onDelete={handleDelete}
        open={popover.open}
      />
    </>
  )
}

ItemListRow.propTypes = {
  // @ts-ignore
  item: PropTypes.object.isRequired,
  onDelete: PropTypes.func,
  onFavorite: PropTypes.func,
  onOpen: PropTypes.func
}
