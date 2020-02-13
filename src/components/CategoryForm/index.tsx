import React, { useEffect, FunctionComponent } from "react";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";

import CustomTextField from "../FormElements/CustomTextField";
import { useStore } from "../../store";

const useStyles = makeStyles(theme => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative"
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -9,
    marginLeft: -9
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  select: {
    padding: '10px 0px 10px 0px',
    width: ' 100%',
    backgroundColor: 'transparent',
    border: 0,
    borderBottom: '1px solid grey',
    fontSize: '16px'
  }
}));

type FormData = {
  description: string;
};

type CategoryFormProps = {
  id: number;
};

const CategoryForm: FunctionComponent<CategoryFormProps> = ({ id }) => {
  const classes = useStyles();
  const {
    handleSubmit,
    register,
    errors,
    reset,
    setValue
  } = useForm<FormData>();
  const { get, update, create, loading } = useStore('useCategoryStore');
  const { snackBarUpdate } = useStore('useSnackBarStore');
  const { updateModal } = useStore('useModalStore');

  useEffect(() => {
    async function fetch(){
      if (id) {
        const { description } = await get(id);
        setValue("description", description);
      }
    }
    fetch();
  }, [id]);

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  const handleForm = (form: object) => {
    if (id) {
      update({ id, ...form }).then(() => {
        snackBarUpdate({
          payload: {
            message: "Category Updated!",
            status: true,
            type: "success"
          }
        })
        updateModal({
          payload: {
            status: false,
            element: null
          }
        })
      });
    } else {
      create(form).then(() => {
        snackBarUpdate({
          payload: {
            message: "Category Created!",
            status: true,
            type: "success"
          }
        })
        updateModal({
          payload: {
            status: false,
            element: null
          }
        })
      });
    }
  }

  return (
    <Container component="main">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Category
        </Typography>
        <form
          className={classes.form}
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <CustomTextField
            placeholder="Description"
            field="description"
            required
            register={register}
            errorsField={errors.description}
            errorsMessageField={
              errors.description && errors.description.message
            }
            isEmail={false}
          />

          <div className={classes.wrapper}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading}
              className={classes.submit}
            >
              {id ? "Update" : "Create"}
            </Button>
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
        </form>
      </div>
    </Container>
  );
}

export default CategoryForm;
