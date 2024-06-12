'use client'

import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
    Box,
    MenuItem,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    Toolbar,
    Typography,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { ArrowDropDownIcon } from '@mui/x-date-pickers/icons';
import '../../styles/main/employee.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployeesRequest } from '../../redux/actions/employeeActions';

interface Data {
    id: number;
    emp_id: string;
    emp_name: string;
    role: string;
    department: string;
    emp_status: string;
    joining_date: string;
    created_by: string;
    status: string;
    statusDisplay: JSX.Element;
}

function createData(
    id: number,
    emp_id: string,
    emp_name: string,
    role: string,
    department: string,
    emp_status: string,
    joining_date: string,
    created_by: string,
    status: string,
): Data {
    return {
        id,
        emp_id,
        emp_name,
        role,
        department,
        emp_status,
        joining_date,
        created_by,
        status,
        statusDisplay: status === 'Active' ? <span className='status-active'>{status}</span> : <span className='status-Inactive'>{status}</span>,
    };
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

type Order = 'asc' | 'desc';

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

interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
    width?: number;
}

const headCells: readonly HeadCell[] = [
    { id: 'emp_id', numeric: false, disablePadding: true, label: 'EMP ID' },
    { id: 'emp_name', numeric: false, disablePadding: false, label: 'EMP NAME' },
    { id: 'role', numeric: false, disablePadding: false, label: 'ROLE' },
    { id: 'department', numeric: false, disablePadding: false, label: 'DEPARTMENT' },
    { id: 'emp_status', numeric: false, disablePadding: false, label: 'EMP STATUS' },
    { id: 'joining_date', numeric: false, disablePadding: false, label: 'JOINING DATE' },
    { id: 'created_by', numeric: false, disablePadding: false, label: 'CREATED BY' },
    { id: 'status', numeric: false, disablePadding: false, label: 'STATUS' },
];

interface EnhancedTableProps {
    order: Order;
    orderBy: string;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    const headerCellStyle = {
        whiteSpace: 'nowrap', // This prevents word wrapping
    };

    return (
        <TableHead className='p-datatable-list'>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                        sx={headerCellStyle}
                    >
                        <TableSortLabel
                            IconComponent={ArrowDropDownIcon}
                            className="table-header-label"
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default function EnhancedTable() {
    const dispatch = useDispatch();
    const { employees } = useSelector((state: any) => state.employee);
    const tableContainerRef = useRef<HTMLDivElement>(null);
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof Data>('emp_id');
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [employeesData, setEmployeesData] = useState<any[]>([]);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        dispatch(fetchEmployeesRequest());
    }, [dispatch]);

    useEffect(() => {
        console.log("api executed >>>>>>..", employees);
    }, [employees]);

    useEffect(() => {
        if (employees.length > 0) {
            const formattedEmployees = employees.map((emp: any) => createData(
                emp.id,
                emp.emp_id,
                emp.emp_name,
                emp.role,
                emp.department,
                emp.emp_status,
                emp.joining_date,
                emp.created_by,
                emp.status,
            ));
            setEmployeesData((prev) => [...prev, ...formattedEmployees]);
        }
    }, [employees]);

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Data,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleScroll = useCallback(() => {
        if (tableContainerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = tableContainerRef.current;
            if (scrollTop + clientHeight >= scrollHeight - 10 && hasMore) {
                setPage((prevPage) => prevPage + 1);
                dispatch(fetchEmployeesRequest());
            }
        }
    }, [dispatch, hasMore]);

    useEffect(() => {
        const containerRef = tableContainerRef.current;
        if (containerRef) {
            containerRef.addEventListener('scroll', handleScroll);
            return () => containerRef.removeEventListener('scroll', handleScroll);
        }
    }, [handleScroll]);

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <Toolbar
                    sx={{
                        pl: { sm: 2 },
                        pr: { xs: 1, sm: 1 },
                    }}
                >
                    <MenuItem className='menu-candi'>Employee</MenuItem>
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                    </Typography>
                </Toolbar>
                <TableContainer
                    ref={tableContainerRef}
                    sx={{ maxHeight: 500, overflow: 'auto' }}
                    className="custom-table-container"
                >
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                    >
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            {stableSort(employeesData, getComparator(order, orderBy)).map((row, index) => {
                                const labelId = `enhanced-table-checkbox-${index}`;
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row.id}
                                    >
                                        <TableCell component="th" id={labelId} scope="row" padding="none">
                                            {row.emp_id}
                                        </TableCell>
                                        <TableCell align="left">{row.emp_name}</TableCell>
                                        <TableCell align="left">{row.role}</TableCell>
                                        <TableCell align="left">{row.department}</TableCell>
                                        <TableCell align="left">{row.emp_status}</TableCell>
                                        <TableCell align="left">{row.joining_date}</TableCell>
                                        <TableCell align="left">{row.created_by}</TableCell>
                                        <TableCell align="left">{row.statusDisplay}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
}
