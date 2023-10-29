import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { visuallyHidden } from '@mui/utils';
import { If } from "../../@core";
import { ReactNode, useEffect } from "react";
import { LinearProgress } from "@mui/material";

export interface Row {
  id: string
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export interface Column<D extends Row> {
  disablePadding?: boolean;
  property?: keyof D;
  label: string;
  sort?: boolean
  numeric?: boolean;
  minWidth?: number;
  custom?: (data: D, property?: any) => ReactNode
}

interface EnhancedTableHeadProps<D extends Row> {
  multiSelect?: boolean
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof D) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  columns: readonly Column<D>[]
}

function EnhancedTableHead<D extends Row>(props: EnhancedTableHeadProps<D>) {
  const { multiSelect, columns, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof D) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <If condition={multiSelect !== undefined}>
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts',
              }}
            />
          </TableCell>
        </If>
        {columns.map((headCell) => (
          <TableCell
            key={String(headCell.property)}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            style={{ minWidth: headCell.minWidth }}
            sortDirection={orderBy === headCell.property ? order : false}
          >
            {!headCell.sort ? (
              <>{headCell.label}</>
              ): (
              <TableSortLabel
                active={orderBy === headCell.property}
                direction={orderBy === headCell.property ? order : 'asc'}
                onClick={headCell.property ? createSortHandler(headCell.property): undefined}
              >
                {headCell.label}
                {orderBy === headCell.property ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            )
            }
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  title?: string
  actions?: ReactNode
  multiActions?: ReactNode
  numSelected: number;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {props.title}
        </Typography>
      )}
      {numSelected > 0 ? (
        <If condition={props.multiActions !== undefined}>
          {props.multiActions}
        </If>
      ) : (
        <If condition={props.actions !== undefined}>
          {props.actions}
        </If>
      )}
    </Toolbar>
  );
}
export interface MainEnhancedTableProps<D extends Row> {
  title?: string
  dense?: boolean
  multiSelect?: boolean
  multiActions?: ReactNode
  actions?: ReactNode
  rowsPerPageOptions?: Array<number | { value: number; label: string }>
  rowsPerPage?: number
  page?: number
  order?: Order
  data?: Array<D> | null
  orderBy?: keyof D
  columns: readonly Column<D>[]
  emptyContent?: ReactNode
  onRowClick?: (data: D) => void
  onChangeSelection?: (ids: readonly string[]) => void
  loading?: boolean
}

export default function EnhancedTable<D extends Row>(props: MainEnhancedTableProps<D>) {
  const data = props.data ?? []
  const [order, setOrder] = React.useState<Order>(props.order ?? 'asc');
  const [orderBy, setOrderBy] = React.useState<keyof D>(props.orderBy ?? "id");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(props.page ?? 0);
  const [dense, setDense] = React.useState(props.dense);
  const [rowsPerPage, setRowsPerPage] = React.useState(props.rowsPerPage ?? 10);
  const showPagination = data.length > (props.rowsPerPage ?? 10)
  useEffect(() => {
    if (props.onChangeSelection) {
      props.onChangeSelection(selected)
    }
  }, [selected]);
  useEffect(() => {
    if(data.length === 0) {
      setSelected([])
    }
  }, [data]);
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof D,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = data.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(data, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage, data],
  );

  return (
    <Box sx={{ width: '100%', my: 5 }}>
    <Paper sx={{ width: '100%', overflow: 'hidden', mb: 2 }}>
        <EnhancedTableToolbar
          multiActions={props.multiActions}
          actions={props.actions}
          numSelected={selected.length}
          title={props.title}/>
        <If condition={props.loading === true}>
          <LinearProgress />
        </If>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table
            stickyHeader={props.dense ? false: data.length > 6}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead<D>
              multiSelect={props.multiSelect}
              columns={props.columns}
              numSelected={selected.length}
              order={order}
              orderBy={String(orderBy)}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              <If condition={data.length > 0}>
                {visibleRows.map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={props.onRowClick ? ((event) => {
                        event.stopPropagation()
                        props.onRowClick!!(row)
                      }): undefined}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={`row-${row.id}`}
                      selected={isItemSelected}
                      sx={{ cursor: props.onRowClick ? 'pointer': undefined }}
                    >
                      <If condition={props.multiSelect !== undefined}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            onClick={(event) => {
                              event.stopPropagation()
                              handleClick(event, row.id)
                            }}
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              'aria-labelledby': labelId,
                            }}
                          />
                        </TableCell>
                      </If>
                      {props.columns.map((e, i) => {
                        if(props.multiSelect !== undefined && i === 0) {
                          return (<TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                            key={`cell-${i}`}
                          >
                            <If condition={e.custom === undefined && e.property !== undefined}>
                              {row[e.property!!]}
                            </If>
                            {e.custom !== undefined && e.property &&
                              (e.custom(row, row[e.property]))
                            }
                            {e.custom !== undefined && e.property === undefined &&
                              (e.custom(row))
                            }
                          </TableCell>)
                        }
                        if(props.multiSelect === undefined && i === 0) {
                          return (<TableCell
                            component="th"
                            scope="row"
                            key={`cell-${i}`}
                          >
                            <If condition={e.custom === undefined && e.property !== undefined}>
                              {row[e.property!!]}
                            </If>
                            {e.custom !== undefined && e.property &&
                              (e.custom(row, row[e.property]))
                            }
                            {e.custom !== undefined && e.property === undefined &&
                              (e.custom(row))
                            }
                          </TableCell>)
                        }
                        return (<TableCell key={`cell-${i}`} align={e.numeric ? 'right' : 'left'}>
                          <If condition={e.custom === undefined && e.property !== undefined}>
                            {row[e.property!!]}
                          </If>
                          {e.custom !== undefined && e.property &&
                            (e.custom(row, row[e.property]))
                          }
                          {e.custom !== undefined && e.property === undefined &&
                            (e.custom(row))
                          }
                        </TableCell>)
                      })}
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </If>
              <If condition={data.length === 0}>
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * 2,
                  }}
                >
                  <TableCell align="center" colSpan={6}>
                    {props.emptyContent ? (props.emptyContent):
                      (<>
                        <Typography variant="body2" color="text.secondary">
                          No records found.
                        </Typography>
                      </>)}
                  </TableCell>
                </TableRow>
              </If>
            </TableBody>
          </Table>
        </TableContainer>
        <If condition={showPagination}>
          <TablePagination
            rowsPerPageOptions={props.rowsPerPageOptions}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </If>
      </Paper>
    </Box>
  );
}