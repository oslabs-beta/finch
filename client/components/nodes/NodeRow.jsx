/* eslint-disable react/prop-types */
/* eslint-disable no-restricted-syntax */
import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import tableTemplate from '../../constants/tableInfoTemplate';
import { Link } from 'react-router-dom';
import EditButton from '../Buttons/CoolButton.jsx';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
const useStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function NodeRow({ node }) {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const cells = tableTemplate.nodes.columns.map((column, i) => {
    let property = { ...node };
    const splitArray = column.split('.');
    while (splitArray.length) {
      property = property[splitArray[0]];
      splitArray.shift();
    }
    return (
      <StyledTableCell align="left" key={`nodeColumn${i}`}>
        {property}
      </StyledTableCell>
    );
  });
  return (
    <>
      <StyledTableRow className={classes.table}>
        <StyledTableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">
          {node.metadata.name}
        </StyledTableCell>
        {cells}
        <StyledTableCell>
          <Link to={`/nodes/${node.metadata.name}`}>
            <EditButton />
          </Link>
        </StyledTableCell>
      </StyledTableRow>
      <TableRow>
        <StyledTableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Node Status:
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontWeight: 'bold' }}>Status</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>
                      Condition
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {node.status.conditions.map((condition, i) => (
                    <StyledTableRow key={`nodeCondition${i}`}>
                      <StyledTableCell component="th" scope="row">
                        {condition.type.split(/(?=[A-Z])/g).join(' ')}
                      </StyledTableCell>
                      <StyledTableCell>{condition.message}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </StyledTableCell>
      </TableRow>
      <TableRow />
    </>
  );
}

export default NodeRow;
