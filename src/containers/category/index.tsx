import React, { useEffect, FunctionComponent } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import './index.sass';
import { useStore } from "../../store";
import CategoryForm from "../../components/CategoryForm";

interface Column {
  id: "id" | "description";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "id", label: "Id", minWidth: 170 },
  {
    id: "description",
    label: "Description",
    minWidth: 170,
    align: "right"
  },
];

interface Data {
  id: number;
  description: string;
}

const useStyles = makeStyles({
  root: {
    width: "100%"
  },
  container: {
    maxHeight: 440
  }
});

interface DataTableProps {
  data: any;
  handleEdit: any;
}

const DataTable: FunctionComponent<DataTableProps> = ({
  data,
  handleEdit,
}) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 &&
              data.map((row: Data) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map(column => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                    <TableCell>
                      <Button variant="contained" color="primary" onClick={() => handleEdit(row.id)}>
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default function Category() {
  const { getAll, categories } = useStore("useCategoryStore");
  const { updateModal } = useStore("useModalStore");

  useEffect(() => {
      getAll();
  }, []);

  const handleEdit = (id: number) => {
    updateModal({
      payload: {
        status: true,
        element: <CategoryForm id={id} />
      }
    })
  };

  const handleCreate = () => {
    updateModal({
      payload: {
        status: true,
        element: <CategoryForm id={0} />
      }
    })
  };
  return (
    <div className="category-container">
      <div className="category-container__header">
      <div className="category-container__title">Categories</div>
      <div className="category-container__button" onClick={() => handleCreate()}>
          <Fab size="small" color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </div>
      </div>
      <div>
        <DataTable data={categories} handleEdit={handleEdit} />
      </div>
    </div>
  );
}
